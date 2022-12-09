import { assert, expect } from "chai"
import { deployments, network, ethers, getNamedAccounts } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { MockV3Aggregator, PredictionContract, Token } from "../../typechain"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("PredictionContract Unit Tests", async function () {
          let predictionContract: PredictionContract
          let mockV3Aggregator: MockV3Aggregator
          let Token: Token
          const chainId = network.config.chainId
          let entranceFee: any
          let deployer: any
          let accounts: Array<any>
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              accounts = await ethers.getSigners()
              await deployments.fixture(["all"])
              predictionContract = await ethers.getContract("PredictionContract", deployer)
              mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
              Token = await ethers.getContract("Token", deployer)
              entranceFee = ethers.utils.parseEther("1")
          })
          describe("predict", async () => {
              beforeEach(async () => {
                  await Token.mint()
                  await Token.approve(predictionContract.address, entranceFee)
                  Token.allowance(predictionContract.address, accounts[0].address)
                  await predictionContract.predict(1, 1999)
              })
              it("should add details correctly", async () => {
                  const predictions = await predictionContract.getPredictions(1)
                  assert.equal(predictions[0]["predictedValue"].toString(), "1999")
                  assert.equal(predictions[0]["user"], deployer)
                  assert.equal(predictions[0]["difference"].toString(), "0")
                  assert.equal(predictions[0]["amount"].toString(), entranceFee)
              })
          })

          describe("setDifference", async () => {
              describe("set difference, if players less than 2", async () => {
                  beforeEach(async () => {
                      for (let i = 1; i < 2; i++) {
                          await Token.connect(accounts[i]).mint()
                          await Token.connect(accounts[i]).approve(
                              predictionContract.address,
                              entranceFee
                          )
                          await Token.allowance(predictionContract.address, accounts[i].address)
                          await predictionContract.connect(accounts[i]).predict(1, 1998 + i)
                      }
                  })
                  it("should not work if players is less than 2", async () => {
                      const Contractbalance = await Token.balanceOf(predictionContract.address)
                      const transactionResponse = await predictionContract.setDifference(1)
                      await transactionResponse.wait(1)
                      const updatedBalance = await Token.balanceOf(predictionContract.address)
                      const predictions = await predictionContract.getPredictions(1)
                      assert.equal(
                          Contractbalance.toString(),
                          (predictions.length * entranceFee).toString()
                      )
                      assert.equal(updatedBalance.toString(), "0")
                  })
                  it("should refund tokens to players successfully", async () => {
                      const balance = await Token.balanceOf(accounts[1].address)
                      const transactionResponse = await predictionContract.setDifference(1)
                      await transactionResponse.wait(1)
                      const finalBalance = await Token.balanceOf(accounts[1].address)
                      assert.equal(finalBalance.toString(), balance.add(entranceFee).toString())
                  })
                  it("should emit event ContestCancelled", async () => {
                      await expect(predictionContract.setDifference(1)).to.emit(
                          predictionContract,
                          "ContestCancelled"
                      )
                  })
              })
              describe("should work exactly if there are required players", async () => {
                  beforeEach(async () => {
                      for (let i = 1; i < accounts.length; i++) {
                          await Token.connect(accounts[i]).mint()
                          await Token.connect(accounts[i]).approve(
                              predictionContract.address,
                              entranceFee
                          )
                          await Token.allowance(predictionContract.address, accounts[i].address)
                          await predictionContract.connect(accounts[i]).predict(1, 1990 + i)
                      }
                  })

                  it("should set the reward array correctly", async () => {
                      await predictionContract.setDifference(1)
                      const predictions = await predictionContract.getPredictions(1)
                      const rewardArray = await predictionContract.getRewardArray(1)
                      assert.equal(rewardArray.length, predictions.length)
                      for (let i = 0; i < rewardArray.length; i++) {
                          if (i !== rewardArray.length - 1) {
                              parseInt(rewardArray[i].toString()) >
                                  parseInt(rewardArray[i + 1].toString())
                          }
                      }
                  })
                  it("should update the difference", async () => {
                      await predictionContract.setDifference(1)
                      const predictions = await predictionContract.getPredictions(1)
                      predictions.map(({ difference }) => {
                          assert(parseInt(difference.toString()) >= 0)
                      })
                  })
                  it("check", async () => {
                      await predictionContract.setDifference(1)
                      const tx = await predictionContract.getResult(1)
                      await tx.wait(1)
                      const winners = await predictionContract.getWinners(1)
                      const rewards = await predictionContract.getRewardArray(1)
                      console.log("Rewards")
                      rewards.map((item) => console.log(item.toString()))
                      console.log("-------------------------------------------------")
                      console.log("Winners")
                      winners.map((item) => console.log(item.toString()))
                      console.log("=================================================")
                      console.log("Players")
                      accounts.map((item, i) => {
                          if (winners.includes(item["address"])) {
                              console.log(
                                  `${winners.indexOf(item["address"]) + 1} .  ${item["address"]}`
                              )
                          }
                      })
                  })
              })
          })
      })

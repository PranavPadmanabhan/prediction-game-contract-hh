import { assert, expect } from "chai"
import { deployments, network, ethers, getNamedAccounts } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { MockV3Aggregator, PredictionContract } from "../../typechain"

!developmentChains.includes(network.name)
    ? describe.skip
    : describe("PredictionContract Unit Tests", async function () {
          let predictionContract: PredictionContract
          let mockV3Aggregator: MockV3Aggregator
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
              entranceFee = ethers.utils.parseEther("1")
          })
          describe("predict", async () => {
              beforeEach(async () => {
                  await predictionContract.predict(1, 1999, { value: entranceFee })
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
              describe("set difference if players less than 2", async () => {
                  beforeEach(async () => {
                      for (let i = 1; i < 2; i++) {
                          const accountConnected = await predictionContract.connect(accounts[i])
                          await accountConnected.predict(1, 1998 + i, { value: entranceFee })
                      }
                  })
                  it("should sent money to players if players is less than 2", async () => {
                      const Contractbalance = await ethers.provider.getBalance(
                          predictionContract.address
                      )
                      const tx = await predictionContract.setDifference(1)
                      const receipt = await tx.wait(1)
                      const { gasUsed, effectiveGasPrice } = receipt
                      const updatedBalance = await ethers.provider.getBalance(
                          predictionContract.address
                      )
                      const predictions = await predictionContract.getPredictions(1)
                      const gasCost = gasUsed.mul(effectiveGasPrice)
                      console.log(`current balance : ${Contractbalance.toString()}`)
                      console.log(`updated balance : ${updatedBalance.toString()}`)
                      console.log(predictions.length)
                      assert.equal(
                          Contractbalance.toString(),
                          (predictions.length * entranceFee).toString()
                      )
                      assert.equal(updatedBalance.toString(), "0")
                  })
                  it("should emit event", async () => {
                      await expect(predictionContract.setDifference(1)).to.emit(
                          predictionContract,
                          "ContestCancelled"
                      )
                  })
              })
              describe.only("should work exactly if there are required players", async () => {
                  beforeEach(async () => {
                      for (let i = 0; i < accounts.length; i++) {
                          const accountConnected = await predictionContract.connect(accounts[i])
                          await accountConnected.predict(1, 1995 + i, { value: entranceFee })
                          const bal = await accounts[i].getBalance()
                          console.log(`balance of ${i} ${ethers.utils.formatEther(bal.toString())}`)
                      }
                  })

                  it("should set the reward array correctly", async () => {
                      const predictions = await predictionContract.getPredictions(1)
                      const amount = await ethers.provider.getBalance(predictionContract.address)
                      await predictionContract.setDifference(1)
                      const rewardArray = await predictionContract.getRewardArray(1)
                      let sum = 0
                      //   rewardArray.map((item) => {
                      //       console.log(item.toString())
                      //       sum += parseInt(item.toString())
                      //   })
                      const tx = await predictionContract.getResult(1)
                      await tx.wait(1)

                      const distamount = await predictionContract.getDistributionAmount(1)

                      //   const bal = await ethers.provider.getBalance(predictionContract.address)
                      //   console.log(`total amount : ${ethers.utils.formatEther(amount.toString())}`)
                      //   const remaining = amount.sub(distamount)
                      //   console.log(`remaining : ${ethers.utils.formatEther(remaining.toString())}`)

                      //   console.log(`balance : ${ethers.utils.formatEther(bal.toString())}`)
                      console.log("--------------------------------------------------------------")
                      for (let index = 0; index < accounts.length; index++) {
                          const bal = await accounts[index].getBalance()
                          console.log(
                              `balance of ${index} ${ethers.utils.formatEther(bal.toString())}`
                          )
                      }
                  })
              })
          })
      })

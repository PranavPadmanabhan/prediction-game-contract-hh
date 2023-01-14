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
          let interval: any
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              accounts = await ethers.getSigners()
              await deployments.fixture(["all"])
              predictionContract = await ethers.getContract("PredictionContract", deployer)
              mockV3Aggregator = await ethers.getContract("MockV3Aggregator", deployer)
              Token = await ethers.getContract("Token", deployer)
              entranceFee = ethers.utils.parseEther("0.0005")
              interval = await predictionContract.getInterval()
          })
          describe("predict", async () => {
              beforeEach(async () => {
                  await predictionContract
                      .connect(accounts[1])
                      .addFunds({ value: ethers.utils.parseEther("100") })
                  const tx = await predictionContract
                      .connect(accounts[1])
                      .predict(1, 1999, { value: entranceFee })
                  const rec = await tx.wait(1)
                  const { gasUsed, effectiveGasPrice } = rec

                  console.log(
                      `price : ${ethers.utils
                          .formatEther(gasUsed.mul(effectiveGasPrice).toString())
                          .toString()}`
                  )
              })
              it("should add details correctly", async () => {
                  const predictions = await predictionContract.getPredictions(1)
                  assert.equal(predictions[0]["predictedValue"].toString(), `1999`)
                  assert.equal(predictions[0]["user"], accounts[1].address)
                  assert.equal(predictions[0]["difference"].toString(), "0")
                  assert.equal(predictions[0]["amount"].toString(), entranceFee.toString())
                  console.log(predictions[0]["predictedValue"].toString())
                  //   console.log(entranceFee.toString())
              })
          })

          describe("setDifference", async () => {
              describe("set difference, if players less than 2", async () => {
                  beforeEach(async () => {
                      for (let i = 1; i < 2; i++) {
                          await predictionContract
                              .connect(accounts[1])
                              .addFunds({ value: ethers.utils.parseEther("100") })
                          await predictionContract
                              .connect(accounts[i])
                              .predict(1, 1998 + i, { value: entranceFee })
                      }
                  })
                  it("should not work if players is less than 2", async () => {
                      //   const Contractbalance = await Token.balanceOf(predictionContract.address)
                      const Contractbalance = await predictionContract.provider.getBalance(
                          predictionContract.address
                      )
                      await network.provider.send("evm_increaseTime", [interval.toNumber() + 3])
                      await network.provider.send("evm_mine", [])
                      const tx = await predictionContract.performUpkeep([])
                      await tx.wait(1)
                      //   const updatedBalance = await Token.balanceOf(predictionContract.address)
                      const updatedBalance = await predictionContract.provider.getBalance(
                          predictionContract.address
                      )
                      const predictions = await predictionContract.getPredictions(1)
                      assert.equal(updatedBalance.toString(), "0")
                      //   console.log(Contractbalance.toString())
                  })
                  it("should refund tokens to players successfully", async () => {
                      //   const balance = await Token.balanceOf(accounts[1].address)
                      const balance = await accounts[1].getBalance()
                      await network.provider.send("evm_increaseTime", [interval.toNumber() + 3])
                      await network.provider.send("evm_mine", [])
                      const tx = await predictionContract.performUpkeep([])
                      await tx.wait(1)
                      //   const finalBalance = await Token.balanceOf(accounts[1].address)
                      const finalBalance = await accounts[1].getBalance()
                      assert.equal(finalBalance.toString(), balance.add(entranceFee).toString())
                  })
                  it("should emit event ContestCancelled", async () => {
                      await network.provider.send("evm_increaseTime", [interval.toNumber() + 3])
                      await network.provider.send("evm_mine", [])
                      await expect(predictionContract.performUpkeep([])).to.emit(
                          predictionContract,
                          "ContestCancelled"
                      )
                  })
              })
              describe("should work exactly if there are required players", async () => {
                  beforeEach(async () => {
                      await predictionContract
                          .connect(accounts[1])
                          .addFunds({ value: ethers.utils.parseEther("1000") })
                      for (let i = 1; i < 501; i++) {
                          //   for (let j = 0; j < accounts.length; j++) {
                          await predictionContract.connect(accounts[1]).predict(1, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(2, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(3, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(4, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(5, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(6, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(7, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(8, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(9, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(10, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(11, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(12, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(13, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(14, 1990 + i)
                          //   await predictionContract.connect(accounts[1]).predict(15, 1990 + i)
                      }
                      //   await predictionContract
                      //       .connect(accounts[2])
                      //       .predict(2, 1990 + i)
                      //   await predictionContract
                      //       .connect(accounts[3])
                      //       .predict(3, 1990 + i)
                      //   }
                  })

                  it("should update the difference", async () => {
                      await network.provider.send("evm_increaseTime", [interval.toNumber() + 3])
                      await network.provider.send("evm_mine", [])

                      const tx = await predictionContract.getResult(1)
                      await tx.wait(1)
                      const predictions = await predictionContract.getPredictions(1)
                      console.log(predictions.length)
                      const winners = await predictionContract.getWinners(1)
                      console.log(winners.length)
                      predictions.map(({ difference, user }) => {
                          if (winners.includes(user)) {
                              console.log(
                                  `${winners.indexOf(user) + 1} -- ${difference.toString()}`
                              )
                          }
                          assert(parseInt(difference.toString()) >= 0)
                      })
                  })
                  it.only("check ", async () => {
                      let array = []

                      for (let i = 0; i < 501; i++) {
                          array.push(ethers.utils.parseEther("0.005"))
                      }
                      const predictions = await predictionContract.getPredictions(1)
                      let addresses = predictions.map((item) => item.user.toString())

                      //   predictions.map((i) => console.log(i["predictedValue"].toString()))
                      await network.provider.send("evm_increaseTime", [interval.toNumber() + 6])
                      await network.provider.send("evm_mine", [])
                      const predictions1 = await predictionContract.getPredictions(1)
                      console.log(predictions1.length)
                      const tx = await predictionContract.setReward(addresses, array) // 247857
                      //   const tx = await predictionContract.Refund(addresses) // 191923
                      const receipt = await tx.wait(1)
                      const { gasUsed, effectiveGasPrice } = receipt
                      //   console.log(tx.toString())

                      console.log(`gas Used :  ${gasUsed.toString()}`)
                      console.log(
                          `price : ${ethers.utils
                              .formatEther(gasUsed.mul(effectiveGasPrice).toString())
                              .toString()}`
                      )
                      const winners = await predictionContract.getWinners(1)
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
                  it("test", async () => {
                      const predictions1 = await predictionContract.getPredictions(1)
                      console.log(predictions1.toString())
                      const array = await predictionContract.updateDifference(1)
                      await network.provider.send("evm_increaseTime", [interval.toNumber() + 6])
                      await network.provider.send("evm_mine", [])
                      const data = await predictionContract.getResult(1)
                      console.log(data.toString())
                      //   array.map((item: any) => console.log(item["user"].toString()))
                  })
              })
          })
      })

// 4.23

//   for (uint256 i = 0; i < s_contests.length; i++) {
//     if ((block.timestamp - s_lastTimeStamp) > (i_interval * (i + 1) * 5)) {
//         getResult(i + 1);
//     }
// }

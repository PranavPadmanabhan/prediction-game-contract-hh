import { assert, expect } from "chai"
import { deployments, network, ethers, getNamedAccounts } from "hardhat"
import { developmentChains } from "../../helper-hardhat-config"
import { MockV3Aggregator, PredictionContract, Token } from "../../typechain"

developmentChains.includes(network.name)
    ? describe.skip
    : describe("PredictionContract Unit Tests", async function () {
          let predictionContract: PredictionContract
          let Token: Token
          const chainId = network.config.chainId
          let entranceFee: any
          let deployer: any
          let accounts: Array<any>
          let interval: any
          beforeEach(async () => {
              deployer = (await getNamedAccounts()).deployer
              await deployments.fixture(["all"])
              predictionContract = await ethers.getContract("PredictionContract", deployer)
              Token = await ethers.getContract("Token", deployer)
              entranceFee = ethers.utils.parseEther("0.05")
              interval = await predictionContract.getInterval()
          })
          describe("predict", async () => {
              beforeEach(async () => {
                  //   await Token.mint()
                  //   await Token.approve(predictionContract.address, entranceFee)
                  //   Token.allowance(predictionContract.address, accounts[0].address)
                  await predictionContract.predict(1, 1999, { value: entranceFee })
              })
              it("should add details correctly", async () => {
                  const predictions = await predictionContract.getPredictions(1)
                  assert.equal(predictions[0]["predictedValue"].toString(), "1999")
                  assert.equal(predictions[0]["user"], deployer)
                  assert.equal(predictions[0]["difference"].toString(), "0")
                  assert.equal(predictions[0]["amount"].toString(), entranceFee.toString())
                  //   console.log(predictions[0]["amount"].toString())
                  //   console.log(entranceFee.toString())
                  predictions.map((item) => item.toString())
              })
          })
      })

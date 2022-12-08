/* eslint-disable no-process-exit */
// yarn hardhat node
// yarn hardhat run scripts/readPrice.ts --network localhost
import { deployments, ethers, getNamedAccounts } from "hardhat"
import { PredictionContract } from "../typechain"

async function readPrice(): Promise<void> {
    const { deployer } = await getNamedAccounts()
    await deployments.fixture(["all"])
    const prediction: PredictionContract = await ethers.getContract("PredictionContract", deployer)
    const contests = await prediction.getNumOfContests()
    console.log(contests.toString())
}

readPrice()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

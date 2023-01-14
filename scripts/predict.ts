/* eslint-disable no-process-exit */
// yarn hardhat node
// yarn hardhat run scripts/readPrice.ts --network localhost
import { deployments, ethers, getNamedAccounts } from "hardhat"
import { PredictionContract } from "../typechain"

async function readPrice(): Promise<void> {
    const provider = new ethers.providers.WebSocketProvider(
        "https://eth-goerli.g.alchemy.com/v2/k8P1hD80FRytUA1pAPhSansQ1VbC2nVI"
    )
    const wallet = new ethers.Wallet(
        "dbd8a8fc924b68632b8513ca6e11989d8bb839ac21e62861cb60a7f47a1ea41d",
        provider
    )
    const { deployer } = await getNamedAccounts()
    await deployments.fixture(["all"])
    const prediction: PredictionContract = await ethers.getContract("PredictionContract", deployer)
    const contests = await prediction.getNumOfContests()
    const num = parseInt(contests.toString())
    for (let j = 0; j < 100; j++) {
        console.log("starting transaction")
        const tx = await prediction.connect(wallet).predict(1, 1111 + j)
        console.log("transaction completed")
        await tx.wait(5)
    }
}

readPrice()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error)
        process.exit(1)
    })

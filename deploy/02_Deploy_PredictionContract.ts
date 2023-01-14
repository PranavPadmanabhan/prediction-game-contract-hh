import { DeployFunction } from "hardhat-deploy/types"
import { ethers, network } from "hardhat"
import {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
    rewardArray2,
    rewardArray3,
    array,
} from "../helper-hardhat-config"
import { updateABI, updateContractAddresses, verify } from "../helper-functions"

const fee = ethers.utils.parseEther("0.0005")
const interval = 1800
let rewardList1: any[] = []

function setReward() {
    // for (let i = 0; i < 100; i++) {
    //     // rewardList1.push(ethers.utils.parseEther(rewardArray1[i].toString()))
    //     if (i < 3) {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray2[i].toString()))
    //     } else if (i >= 3 && i < 6) {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray2[3].toString()))
    //     } else if (i >= 7 && i < 10) {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray2[4].toString()))
    //     } else if (i >= 10 && i < 15) {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray2[5].toString()))
    //     } else if (i >= 16 && i < 25) {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray2[6].toString()))
    //     } else if (i >= 26 && i < 50) {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray2[7].toString()))
    //     } else {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray2[8].toString()))
    //     }
    // }
    // for (let i = 0; i < 25; i++) {
    //     // rewardList1.push(ethers.utils.parseEther(rewardArray1[i].toString()))
    //     if (i < 3) {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray3[i].toString()))
    //     } else if (i >= 3 && i < 6) {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray3[3].toString()))
    //     } else if (i >= 7 && i < 10) {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray3[4].toString()))
    //     } else {
    //         rewardList1.push(ethers.utils.parseEther(rewardArray3[5].toString()))
    //     }
    // }

    for (let i = 0; i < 100; i++) {
        // rewardList1.push(ethers.utils.parseEther(rewardArray1[i].toString()))
        if (i < 3) {
            rewardList1.push(ethers.utils.parseEther(array[i].toString()))
        } else if (i >= 3 && i < 6) {
            rewardList1.push(ethers.utils.parseEther(array[3].toString()))
        } else if (i >= 7 && i < 10) {
            rewardList1.push(ethers.utils.parseEther(array[4].toString()))
        } else if (i >= 10 && i < 15) {
            rewardList1.push(ethers.utils.parseEther(array[5].toString()))
        } else if (i >= 16 && i < 25) {
            rewardList1.push(ethers.utils.parseEther(array[6].toString()))
        } else if (i >= 26 && i < 50) {
            rewardList1.push(ethers.utils.parseEther(array[7].toString()))
        } else {
            rewardList1.push(ethers.utils.parseEther(array[8].toString()))
        }
    }
}

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments
    setReward()
    const { deployer } = await getNamedAccounts()
    const chainId: number | undefined = network.config.chainId
    if (!chainId) return

    let ethUsdPriceFeedAddresses: string[] | undefined

    if (chainId === 31337) {
        const EthUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddresses = [
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
            EthUsdAggregator.address,
        ]
    } else {
        ethUsdPriceFeedAddresses = networkConfig[chainId].ethUsdPriceFeed
    }

    // Price Feed Address, values can be obtained at https://docs.chain.link/docs/reference-contracts
    // Default one below is ETH/USD contract on Goerli
    const waitBlockConfirmations: number = developmentChains.includes(network.name)
        ? 1
        : VERIFICATION_BLOCK_CONFIRMATIONS
    log(`----------------------------------------------------`)

    const args = [ethUsdPriceFeedAddresses, fee, interval]

    const predictionContract = await deploy("PredictionContract", {
        from: deployer,
        args: args,
        log: true,
        waitConfirmations: waitBlockConfirmations,
    })
    updateABI(predictionContract.abi)
    updateContractAddresses(predictionContract)

    // Verify the deployment
    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        // log("Verifying...")
        // await verify(predictionContract.address, args)
        updateABI(predictionContract.abi)
        updateContractAddresses(predictionContract)
    }
}

export default deployFunction
deployFunction.tags = [`all`, `main`]

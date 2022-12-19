import { DeployFunction } from "hardhat-deploy/types"
import { ethers, network } from "hardhat"
import {
    networkConfig,
    developmentChains,
    VERIFICATION_BLOCK_CONFIRMATIONS,
} from "../helper-hardhat-config"
import { updateABI, updateContractAddresses, verify } from "../helper-functions"

const fee = ethers.utils.parseEther("1")
const interval = 600

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deploy, log } = deployments

    const { deployer } = await getNamedAccounts()
    const chainId: number | undefined = network.config.chainId
    if (!chainId) return

    let ethUsdPriceFeedAddresses: string[] | undefined
    const Token = await deployments.get("Token")

    if (chainId === 31337) {
        const EthUsdAggregator = await deployments.get("MockV3Aggregator")
        ethUsdPriceFeedAddresses = [EthUsdAggregator.address]
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
        log("Verifying...")
        await verify(predictionContract.address, args)
        updateABI(predictionContract.abi)
        updateContractAddresses(predictionContract)
    }
}

export default deployFunction
deployFunction.tags = [`all`, `main`]

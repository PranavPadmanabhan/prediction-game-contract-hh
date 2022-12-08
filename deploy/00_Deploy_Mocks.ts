import { DeployFunction } from "hardhat-deploy/types"
import { getNamedAccounts, deployments, network } from "hardhat"

const deployFunction: DeployFunction = async () => {
    const DECIMALS: string = `18`
    const INITIAL_PRICE: string = `2000000000000000000000`

    const { deploy, log } = deployments
    const { deployer } = await getNamedAccounts()
    const chainId: number | undefined = network.config.chainId

    // If we are on a local development network, we need to deploy mocks!
    if (chainId === 31337) {
        log(`Local network detected! Deploying mocks...`)

        await deploy(`MockV3Aggregator`, {
            contract: `MockV3Aggregator`,
            from: deployer,
            log: true,
            args: [DECIMALS, INITIAL_PRICE],
        })

        log(`Mocks Deployed!`)
        log(`----------------------------------------------------`)
    }
}

export default deployFunction
deployFunction.tags = [`all`, `mocks`, `main`]

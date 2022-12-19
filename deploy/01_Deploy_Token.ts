import { network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { updateTokenABI, updateTokenAddresses, verify } from "../helper-functions"
import { developmentChains } from "../helper-hardhat-config"

const deployFunction: DeployFunction = async ({ getNamedAccounts, deployments }) => {
    const { deployer } = await getNamedAccounts()
    const { deploy, log } = deployments

    const args = [100000000]

    const token = await deploy("Token", {
        contract: "Token",
        from: deployer,
        log: true,
        args: args,
    })

    log(" deployed Token successfully")
    log("-------------------------------")
    updateTokenABI(token.abi)
    updateTokenAddresses(token)

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(token.address, args)
        updateTokenABI(token.abi)
        updateTokenAddresses(token)
    }
}

export default deployFunction
deployFunction.tags = [`all`, `token`]

import { network } from "hardhat"
import { DeployFunction } from "hardhat-deploy/types"
import { verify } from "../helper-functions"
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

    if (!developmentChains.includes(network.name) && process.env.ETHERSCAN_API_KEY) {
        log("Verifying...")
        await verify(token.address, args)
    }
}

export default deployFunction
deployFunction.tags = [`all`, `token`]

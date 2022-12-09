// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/token/ERC20/extensions/ERC20Capped.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

error Token__Withdraw_Error(address owner);

contract Token is ERC20Capped, Ownable {
    event Minted(address miner);

    constructor(uint256 cap) ERC20("TOKEN", "TKN") ERC20Capped(cap * (10**decimals())) {}

    function mint() public payable {
        _mint(msg.sender, 10 ether);
        emit Minted(msg.sender);
    }

    function withdraw() public onlyOwner {
        address _owner = owner();
        (bool success, ) = _owner.call{value: address(this).balance}("");
        if (!success) {
            revert Token__Withdraw_Error(_owner);
        }
    }
}

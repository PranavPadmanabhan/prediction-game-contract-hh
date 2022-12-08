// SPDX-License-Identifier: MIT

pragma solidity ^0.8.7;
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";

library PriceFeed {
    function getUSDPrice(AggregatorV3Interface priceFeed) internal view returns (int256, uint8) {
        (
            ,
            /*uint80 roundID*/
            int256 price, /*uint startedAt*/ /*uint timeStamp*/ /*uint80 answeredInRound*/
            ,
            ,

        ) = priceFeed.latestRoundData();
        uint8 decimal = priceFeed.decimals();
        return (price, decimal);
    }

    // function getConversionRate(uint256 amount) internal pure returns (int256) {
    //     int256 ethPrice = getUSDPrice();
    //     int256 totalAmount = (ethPrice * int256(amount)) / 1e18;
    //     return totalAmount;
    // }
}

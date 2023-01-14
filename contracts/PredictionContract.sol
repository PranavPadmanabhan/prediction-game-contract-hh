// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PriceFeed.sol";

error Prediction__Limit_Exceeded();
error Prediction__Not_Enough_Amount();
error Prediction__TopUp_error();
error Withdraw__Failed();
error Prediction_Not_Available();
error Admin_Withdraw_Failed();

contract PredictionContract is AutomationCompatibleInterface {
    // STRUCTS

    struct Contest {
        uint256 id;
        address priceFeedAddress;
    }

    struct Prediction {
        int256 predictedValue;
        uint256 predictedAt;
        uint256 difference;
        address user;
        uint256 amount;
    }

    // STATE VARIABLES

    address payable private immutable i_owner;
    Contest[] private s_contests;
    uint256 private s_lastTimeStamp;
    address[] private s_priceFeedAddresses;
    uint256 private immutable i_entranceFee;
    uint256 private immutable i_interval;
    mapping(uint256 => Prediction[]) private s_PredictionsOf;
    mapping(uint256 => address[]) private s_WinnersOf;
    mapping(address => uint256) private s_walletOf;
    uint256 private s_max_players = 100;
    mapping(uint256 => uint256) private s_playersOf;

    // EVENTS

    event NewPrediction(
        int256 predictedValue,
        uint256 predictedAt,
        uint256 difference,
        address user,
        uint256 contestId
    );
    event ContestCompleted(uint256 contestId);
    event ContestCancelled(uint256 contestId);
    event TopUpSuccessfull(uint256 amount, address user);
    event WithdrawSuccessfull(uint256 amount, address user);
    event ResultAnnounced();

    // FUNCTIONS

    constructor(
        address[] memory addresses,
        uint256 entranceFee,
        uint256 interval
    ) {
        s_lastTimeStamp = block.timestamp;
        i_entranceFee = entranceFee;
        s_priceFeedAddresses = addresses;
        i_interval = interval;
        i_owner = payable(msg.sender);
        createContest();
    }

    function createContest() internal {
        for (uint256 i = 0; i < s_priceFeedAddresses.length; i++) {
            s_contests.push(Contest(i + 1, s_priceFeedAddresses[i]));
        }
    }

    function predict(uint256 contestId, int256 _predictedValue) public {
        if (s_PredictionsOf[contestId - 1].length >= (s_max_players + s_playersOf[contestId - 1])) {
            revert Prediction__Limit_Exceeded();
        }
        if (s_walletOf[msg.sender] < i_entranceFee) {
            revert Prediction__Not_Enough_Amount();
        }

        s_PredictionsOf[contestId - 1].push(
            Prediction(_predictedValue, block.timestamp, 0, msg.sender, i_entranceFee)
        );
        s_walletOf[msg.sender] -= i_entranceFee;
        emit NewPrediction(_predictedValue, block.timestamp, 0, msg.sender, contestId);
    }

    function addFunds() public payable {
        if (msg.value < i_entranceFee) {
            revert Prediction__TopUp_error();
        }
        s_walletOf[msg.sender] += msg.value;
        emit TopUpSuccessfull(msg.value, msg.sender);
    }

    function withdraw(uint256 amount) public payable {
        if (amount < i_entranceFee && amount > s_walletOf[msg.sender]) {
            revert Withdraw__Failed();
        }
        (bool success, ) = payable(msg.sender).call{value: amount}("");
        if (!success) {
            revert Withdraw__Failed();
        }
        s_walletOf[msg.sender] -= amount;
        emit WithdrawSuccessfull(amount, msg.sender);
    }

    function setReward(address[] memory addresses, uint256[] memory rewards) public {
        for (uint256 i = 0; i < addresses.length; i++) {
            s_walletOf[addresses[i]] += rewards[i];
        }
    }

    function Refund(address[] memory addresses) public {
        for (uint256 i = 0; i < addresses.length; i++) {
            s_walletOf[addresses[i]] += i_entranceFee;
        }
    }

    function declareCompletetion(uint256 contestId) public {
        s_playersOf[contestId - 1] = s_PredictionsOf[contestId - 1].length;
        emit ContestCompleted(contestId);
    }

    function checkUpkeep(
        bytes memory /* checkData */
    )
        public
        view
        override
        returns (
            bool upkeepNeeded,
            bytes memory /* performData */
        )
    {
        upkeepNeeded = ((block.timestamp - s_lastTimeStamp) >= i_interval);
    }

    function performUpkeep(
        bytes memory /* performData */
    ) external override {
        if ((block.timestamp - s_lastTimeStamp) >= i_interval) {
            s_lastTimeStamp = block.timestamp;
            emit ResultAnnounced();
        }
    }

    function getContest(uint256 contestId) public view returns (Contest memory) {
        return s_contests[contestId - 1];
    }

    function getNumOfContests() public view returns (uint256) {
        return s_contests.length;
    }

    function getContests() public view returns (Contest[] memory) {
        return s_contests;
    }

    function getPredictions(uint256 contestId) public view returns (Prediction[] memory) {
        return s_PredictionsOf[contestId - 1];
    }

    function getLatestTimeStamp() public view returns (uint256) {
        return s_lastTimeStamp;
    }

    function getInterval() public view returns (uint256) {
        return i_interval;
    }

    function getEntranceFee() public view returns (uint256) {
        return i_entranceFee;
    }

    function getTotalBalance() public view returns (uint256) {
        return address(this).balance;
    }

    function getLatestPrice(uint256 contestId) public view returns (int256, uint8) {
        (int256 price, uint8 decimal) = PriceFeed.getUSDPrice(
            AggregatorV3Interface(s_contests[contestId - 1].priceFeedAddress)
        );
        return (price, decimal);
    }

    function getWinners(uint256 contestId) public view returns (address[] memory) {
        return s_WinnersOf[contestId - 1];
    }

    function getNumOfMaxPlayers() public view returns (uint256) {
        return s_max_players;
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function balanceOf(address _address) public view returns (uint256) {
        return s_walletOf[_address];
    }

    function getContestPlayers(uint256 contestId) public view returns (uint256) {
        return s_playersOf[contestId - 1];
    }
}

// use inheritance to hide contract

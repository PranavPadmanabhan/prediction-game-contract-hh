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

contract PredictionContract is AutomationCompatibleInterface {
    // create all the contest - done
    // add predict function for each contest - done
    // set difference from predicted value - done
    // set results for each contests

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
    mapping(address => uint256) private s_rewardsOf;
    mapping(address => uint256) private s_refundOf;
    mapping(address => uint256) private s_walletOf;
    uint256 private s_max_players = 25;
    Prediction private temp;
    uint256[] private s_rewards;

    // EVENTS

    event NewPrediction(
        int256 predictedValue,
        uint256 predictedAt,
        uint256 difference,
        address user
    );
    event ContestCompleted(uint256 contestId);
    event ContestCancelled(uint256 contestId);
    event TopUpSuccessfull(uint256 amount, address user);
    event WithdrawSuccessfull(uint256 amount, address user);

    // FUNCTIONS

    constructor(
        address[] memory addresses,
        uint256 entranceFee,
        uint256 interval,
        uint256[] memory rewards
    ) {
        s_lastTimeStamp = block.timestamp;
        i_entranceFee = entranceFee;
        s_priceFeedAddresses = addresses;
        i_interval = interval;
        s_rewards = rewards;
        i_owner = payable(msg.sender);
        createContest();
    }

    function createContest() internal {
        for (uint256 i = 0; i < s_priceFeedAddresses.length; i++) {
            s_contests.push(Contest(i + 1, s_priceFeedAddresses[i]));
        }
    }

    function predict(uint256 contestId, int256 _predictedValue) public payable {
        if (s_PredictionsOf[contestId - 1].length > s_max_players) {
            revert Prediction__Limit_Exceeded();
        }
        if (s_walletOf[msg.sender] < i_entranceFee) {
            revert Prediction__Not_Enough_Amount();
        }
        s_PredictionsOf[contestId - 1].push(
            Prediction(_predictedValue, block.timestamp, 0, msg.sender, i_entranceFee)
        );
        s_walletOf[msg.sender] -= i_entranceFee;
        emit NewPrediction(_predictedValue, block.timestamp, 0, msg.sender);
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

    function refundScheme(uint256 contestId, uint256 length) public {
        if (length < s_max_players) {
            for (uint256 i = 0; i < length; i++) {
                s_walletOf[s_PredictionsOf[contestId - 1][i].user] += i_entranceFee;
            }
            delete s_PredictionsOf[contestId - 1];
            emit ContestCancelled(contestId);
            delete s_WinnersOf[contestId - 1];
        }
    }

    function getResult(uint256 contestId) public returns (Prediction[] memory) {
        refundScheme(contestId, s_PredictionsOf[contestId - 1].length);
        Prediction[] memory predictions = sort(contestId);
        for (uint256 i = 0; i < s_rewards.length; i++) {
            s_WinnersOf[contestId - 1].push(predictions[i].user);
            s_walletOf[predictions[i].user] += s_rewards[i];
        }
        delete s_PredictionsOf[contestId - 1];
        emit ContestCompleted(contestId);
        return predictions;
    }

    function updateDifference(uint256 contestId) public view returns (Prediction[] memory) {
        (int256 price, ) = PriceFeed.getUSDPrice(
            AggregatorV3Interface(s_contests[contestId - 1].priceFeedAddress)
        );
        Prediction[] memory predictions = s_PredictionsOf[contestId - 1];
        for (uint256 i = 0; i < predictions.length; i++) {
            int256 value = predictions[i].predictedValue;
            value < price
                ? predictions[i].difference = uint256(price - value)
                : predictions[i].difference = uint256(value - price);
        }
        return predictions;
    }

    function sort(uint256 contestId) public view returns (Prediction[] memory) {
        Prediction memory tdata;
        Prediction[] memory predictions = updateDifference(contestId);
        for (uint256 i = 0; i < predictions.length; i++) {
            for (uint256 j = 0; j < predictions.length - i - 1; j++) {
                if (
                    predictions[j].difference > predictions[j + 1].difference ||
                    (predictions[j].difference == predictions[j + 1].difference &&
                        predictions[j].predictedAt > predictions[j + 1].predictedAt)
                ) {
                    tdata = predictions[j];
                    predictions[j] = predictions[j + 1];
                    predictions[j + 1] = tdata;
                }
            }
        }
        return predictions;
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
        upkeepNeeded = ((block.timestamp - s_lastTimeStamp) > i_interval);
    }

    function performUpkeep(
        bytes memory /* performData */
    ) external override {
        (bool upkeepNeeded, ) = checkUpkeep("");
        if (upkeepNeeded) {
            for (uint256 i = 0; i < s_contests.length; i++) {
                getResult(i + 1);
            }
        }
        s_lastTimeStamp = block.timestamp;
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

    function getTotalBalance(uint256 contestId) public view returns (uint256) {
        return s_PredictionsOf[contestId - 1].length * i_entranceFee;
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

    function getRewardOf(address _address) public view returns (uint256) {
        return s_rewardsOf[_address];
    }

    function getRefundOf(address _address) public view returns (uint256) {
        return s_refundOf[_address];
    }

    function getOwner() public view returns (address) {
        return i_owner;
    }

    function getSortedArray(uint256 contestId) public view returns (Prediction[] memory) {
        return sort(contestId);
    }

    function balanceOf(address _address) public view returns (uint256) {
        return s_walletOf[_address];
    }
}

// use inheritance to hide contract

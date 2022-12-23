// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PriceFeed.sol";

error Prediction__Limit_Exceeded();
error Prediction__Not_Enough_Amount();
error Prediction__Refund_Error();
error Prediction__Reward_Failed();

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

    Contest[] private s_contests;
    uint256 private s_lastTimeStamp;
    address[] private s_priceFeedAddresses;
    uint256 private immutable i_entranceFee;
    uint256 private immutable i_interval;
    mapping(uint256 => Prediction[]) private s_PredictionsOf;
    mapping(uint256 => address[]) private s_WinnersOf;
    uint256 private s_max_players = 100;
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
        createContest();
    }

    function createContest() internal {
        for (uint256 i = 0; i < s_priceFeedAddresses.length; i++) {
            s_contests.push(Contest(i + 1, s_priceFeedAddresses[i]));
        }
    }

    function predict(uint256 contestId, int256 _predictedValue) public payable {
        (, uint8 decimal) = PriceFeed.getUSDPrice(
            AggregatorV3Interface(s_contests[contestId - 1].priceFeedAddress)
        );
        if (s_PredictionsOf[contestId - 1].length > s_max_players) {
            revert Prediction__Limit_Exceeded();
        }

        if (msg.value != i_entranceFee) {
            revert Prediction__Not_Enough_Amount();
        }
        int256 predictedValue = _predictedValue * int256(10**decimal);
        s_PredictionsOf[contestId - 1].push(
            Prediction(predictedValue, block.timestamp, 0, msg.sender, i_entranceFee)
        );
        emit NewPrediction(_predictedValue, block.timestamp, 0, msg.sender);
    }

    function refund(uint256 contestId, uint256 length) public payable {
        for (uint256 i = 0; i < length; i++) {
            if (length < 5) {
                (bool success, ) = payable(s_PredictionsOf[contestId - 1][i].user).call{
                    value: i_entranceFee
                }("");
                if (!success) {
                    revert Prediction__Refund_Error();
                }
            }
        }
        delete s_PredictionsOf[contestId - 1];
        emit ContestCancelled(contestId);
        delete s_WinnersOf[contestId - 1];
    }

    function getResult(uint256 contestId) public payable returns (Prediction[] memory) {
        refund(contestId, s_PredictionsOf[contestId - 1].length);
        Prediction[] memory predictions = sort(
            updateDifference(
                s_PredictionsOf[contestId - 1],
                s_contests[contestId - 1].priceFeedAddress
            )
        );
        for (uint256 i = 0; i < s_rewards.length; i++) {
            s_WinnersOf[contestId - 1].push(predictions[i].user);
            (bool success, ) = payable(predictions[i].user).call{value: s_rewards[i]}("");
            if (!success) {
                revert Prediction__Reward_Failed();
            }
        }
        delete s_PredictionsOf[contestId - 1];
        emit ContestCompleted(contestId);
        return predictions;
    }

    function updateDifference(Prediction[] memory predictions, address priceFeed)
        public
        view
        returns (Prediction[] memory)
    {
        (int256 price, ) = PriceFeed.getUSDPrice(AggregatorV3Interface(priceFeed));
        for (uint256 i = 0; i < predictions.length; i++) {
            int256 value = predictions[i].predictedValue;
            value < price
                ? predictions[i].difference = uint256(price - value)
                : predictions[i].difference = uint256(value - price);
        }
        return predictions;
    }

    function sort(Prediction[] memory predictions) public pure returns (Prediction[] memory) {
        Prediction memory tdata;
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
            s_lastTimeStamp = block.timestamp;
            for (uint256 i = 0; i < s_contests.length; i++) {
                getResult(i + 1);
            }
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
}

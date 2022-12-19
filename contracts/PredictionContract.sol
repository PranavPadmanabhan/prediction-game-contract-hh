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
    mapping(uint256 => uint256[]) private s_RewardArrayOf;
    mapping(uint256 => address[]) private s_WinnersOf;
    // IERC20 Token;
    // address private s_tokenAddress;
    uint256 private s_max_players = 100;
    // uint256 private s_entrance_fee = 4 ether;

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
        uint256 interval // address _s_tokenAddress
    ) {
        s_lastTimeStamp = block.timestamp;
        i_entranceFee = entranceFee;
        s_priceFeedAddresses = addresses;
        i_interval = interval;
        // Token = IERC20(_s_tokenAddress);
        // s_tokenAddress = _s_tokenAddress;
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
        // if (Token.balanceOf(msg.sender) < 1) {
        //     revert Prediction__Not_Enough_Amount();
        // }
        if (msg.value != i_entranceFee) {
            revert Prediction__Not_Enough_Amount();
        }
        // Token.transferFrom(msg.sender, address(this), 4 ether);
        s_PredictionsOf[contestId - 1].push(
            Prediction(_predictedValue, block.timestamp, 0, msg.sender, i_entranceFee)
        );
        emit NewPrediction(_predictedValue, block.timestamp, 0, msg.sender);
    }

    function setRewardArray(uint256 contestId) public {
        uint256 amountForDistribution = (address(this).balance * 8) / 10;
        for (uint256 i = 0; i < s_PredictionsOf[contestId - 1].length; i++) {
            if (i == 0) {
                s_RewardArrayOf[contestId - 1].push((amountForDistribution * 5) / 10);
            } else {
                s_RewardArrayOf[contestId - 1].push(
                    (s_RewardArrayOf[contestId - 1][i - 1] * 5) / 10
                );
            }
        }
    }

    function setDifference(uint256 contestId) public payable {
        if (s_PredictionsOf[contestId - 1].length < 5) {
            for (uint256 i = 0; i < s_PredictionsOf[contestId - 1].length; i++) {
                // Token.transfer(s_PredictionsOf[contestId - 1][i].user, 4 ether);
                (bool success, ) = payable(s_PredictionsOf[contestId - 1][i].user).call{
                    value: i_entranceFee
                }("");
                if (!success) {
                    revert Prediction__Refund_Error();
                }
            }
            delete s_PredictionsOf[contestId - 1];
            delete s_RewardArrayOf[contestId - 1];
            emit ContestCancelled(contestId);
        }
        (int256 price, uint8 decimal) = PriceFeed.getUSDPrice(
            AggregatorV3Interface(s_contests[contestId - 1].priceFeedAddress)
        ); /*AggregatorV3Interface(s_contests[contestId - 1].priceFeedAddress)*/
        setRewardArray(contestId);
        delete s_WinnersOf[contestId - 1];
        for (uint256 i = 0; i < s_PredictionsOf[contestId - 1].length; i++) {
            int256 value = int256(s_PredictionsOf[contestId - 1][i].predictedValue) *
                int256(10**decimal);
            if (value < price) {
                s_PredictionsOf[contestId - 1][i].difference = uint256(price - value);
            } else {
                s_PredictionsOf[contestId - 1][i].difference = uint256(value - price);
            }
        }
    }

    function getResult(uint256 contestId) public payable {
        setDifference(contestId);
        Prediction memory data;
        for (uint256 i = 0; i < s_PredictionsOf[contestId - 1].length; i++) {
            for (uint256 j = 0; j < s_PredictionsOf[contestId - 1].length - i - 1; j++) {
                if (
                    s_PredictionsOf[contestId - 1][j].difference >
                    s_PredictionsOf[contestId - 1][j + 1].difference ||
                    (s_PredictionsOf[contestId - 1][j].difference ==
                        s_PredictionsOf[contestId - 1][j + 1].difference &&
                        s_PredictionsOf[contestId - 1][j].predictedAt >
                        s_PredictionsOf[contestId - 1][j + 1].predictedAt)
                ) {
                    data = s_PredictionsOf[contestId - 1][j];
                    s_PredictionsOf[contestId - 1][j] = s_PredictionsOf[contestId - 1][j + 1];
                    s_PredictionsOf[contestId - 1][j + 1] = data;
                }
            }
        }
        for (uint256 i = 0; i < s_PredictionsOf[contestId - 1].length; i++) {
            s_WinnersOf[contestId - 1].push(s_PredictionsOf[contestId - 1][i].user);
            // Token.transfer(
            //     s_PredictionsOf[contestId - 1][i].user,
            //     s_RewardArrayOf[contestId - 1][i]
            // );
            (bool success, ) = payable(s_PredictionsOf[contestId - 1][i].user).call{
                value: s_RewardArrayOf[contestId - 1][i]
            }("");
            if (!success) {
                revert Prediction__Reward_Failed();
            }
        }
        delete s_PredictionsOf[contestId - 1];
        delete s_RewardArrayOf[contestId - 1];
        emit ContestCompleted(contestId);
    }

    function automateResult() private {
        s_lastTimeStamp = block.timestamp;
        for (uint256 i = 0; i < s_contests.length; i++) {
            getResult(i + 1);
        }
        // if (s_entrance_fee == 4 ether) {
        //     s_entrance_fee = 50 ether;
        // } else {
        //     s_entrance_fee = 4 ether;
        // }
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
        if (((block.timestamp - s_lastTimeStamp) > i_interval) && upkeepNeeded) {
            automateResult();
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

    function getRewardArray(uint256 contestId) public view returns (uint256[] memory) {
        return s_RewardArrayOf[contestId - 1];
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

// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PriceFeed.sol";

error Prediction__Limit_Exceeded();
error Prediction__Not_Enough_Amount();
error Prediction__Refund_Error();

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
    address[] private priceFeedAddresses;
    uint256 private immutable i_entranceFee;
    uint256 private immutable i_interval;
    mapping(uint256 => mapping(address => uint256)) private AmountOf;
    mapping(uint256 => Prediction[]) private PredictionsOf;
    mapping(uint256 => uint256[]) private rewardArrayOf;
    IERC20 Token;
    address private tokenAddress;

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
        address _tokenAddress
    ) {
        s_lastTimeStamp = block.timestamp;
        i_entranceFee = entranceFee;
        priceFeedAddresses = addresses;
        i_interval = interval;
        Token = IERC20(_tokenAddress);
        tokenAddress = _tokenAddress;
        createContest();
    }

    function createContest() internal {
        for (uint256 i = 0; i < priceFeedAddresses.length; i++) {
            s_contests.push(Contest(i + 1, priceFeedAddresses[i]));
        }
    }

    function predict(uint256 contestId, int256 _predictedValue) public payable {
        if (PredictionsOf[contestId - 1].length > 100) {
            revert Prediction__Limit_Exceeded();
        }
        if (Token.balanceOf(msg.sender) < 1) {
            revert Prediction__Not_Enough_Amount();
        }
        Token.transferFrom(msg.sender, address(this), 1 ether);
        PredictionsOf[contestId - 1].push(
            Prediction(_predictedValue, block.timestamp, 0, msg.sender, i_entranceFee)
        );
        AmountOf[contestId - 1][msg.sender] = i_entranceFee;
        emit NewPrediction(_predictedValue, block.timestamp, 0, msg.sender);
    }

    function setRewardArray(uint256 contestId) public {
        uint256 amountForDistribution = (PredictionsOf[contestId - 1].length * i_entranceFee * 8) /
            10;
        for (uint256 i = 0; i < PredictionsOf[contestId - 1].length; i++) {
            // rewardArrayOf[contestId - 1].push(
            //     ((amountForDistribution * (i + 1)) /
            //         (PredictionsOf[contestId - 1].length *
            //             ((PredictionsOf[contestId - 1].length + 10) / 2)))
            // );
            if (i == 0) {
                rewardArrayOf[contestId - 1].push((amountForDistribution * 5) / 10);
            } else {
                rewardArrayOf[contestId - 1].push((rewardArrayOf[contestId - 1][i - 1] * 5) / 10);
            }
        }
    }

    function setDifference(uint256 contestId) public payable {
        if (PredictionsOf[contestId - 1].length < 2) {
            for (uint256 i = 0; i < PredictionsOf[contestId - 1].length; i++) {
                Token.transfer(PredictionsOf[contestId - 1][i].user, 1 ether);
            }
            emit ContestCancelled(contestId);
        }
        (int256 price, uint8 decimal) = PriceFeed.getUSDPrice(
            AggregatorV3Interface(s_contests[contestId - 1].priceFeedAddress)
        ); /*AggregatorV3Interface(s_contests[contestId - 1].priceFeedAddress)*/
        setRewardArray(contestId);
        for (uint256 i = 0; i < PredictionsOf[contestId - 1].length; i++) {
            int256 value = int256(PredictionsOf[contestId - 1][i].predictedValue) *
                int256(10**decimal);
            if (value < price) {
                PredictionsOf[contestId - 1][i].difference = uint256(price - value);
            } else {
                PredictionsOf[contestId - 1][i].difference = uint256(value - price);
            }
        }
    }

    function getResult(uint256 contestId) public payable {
        setDifference(contestId);
        Prediction memory data;
        for (uint256 i = 0; i < PredictionsOf[contestId - 1].length; i++) {
            for (uint256 j = 0; j < PredictionsOf[contestId - 1].length - i - 1; j++) {
                if (
                    PredictionsOf[contestId - 1][j].difference >
                    PredictionsOf[contestId - 1][j + 1].difference ||
                    (PredictionsOf[contestId - 1][j].difference ==
                        PredictionsOf[contestId - 1][j + 1].difference &&
                        PredictionsOf[contestId - 1][j].predictedAt >
                        PredictionsOf[contestId - 1][j + 1].predictedAt)
                ) {
                    data = PredictionsOf[contestId - 1][j];
                    PredictionsOf[contestId - 1][j] = PredictionsOf[contestId - 1][j + 1];
                    PredictionsOf[contestId - 1][j + 1] = data;
                }
            }
        }
        for (uint256 i = 0; i < PredictionsOf[contestId - 1].length; i++) {
            Token.transfer(PredictionsOf[contestId - 1][i].user, rewardArrayOf[contestId - 1][i]);
        }
        delete PredictionsOf[contestId - 1];
        delete rewardArrayOf[contestId - 1];
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
        upkeepNeeded = ((block.timestamp - s_lastTimeStamp) > i_interval);
    }

    function performUpkeep(
        bytes memory /* performData */
    ) external override {
        if ((block.timestamp - s_lastTimeStamp) > i_interval) {
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

    function getPredictions(uint256 contestId) public view returns (Prediction[] memory) {
        return PredictionsOf[contestId - 1];
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
        return rewardArrayOf[contestId - 1];
    }

    // function getDiffereces(uint contestId,uint index) public view returns(uint){
    //     for(uint i = 0; i< PredictionsOf[contestId - 1].length; i++){
    //         return PredictionsOf[contestId - 1][index].difference;
    //     }
    // }

    function getTotalBalance(uint256 contestId) public view returns (uint256) {
        return PredictionsOf[contestId - 1].length * i_entranceFee;
    }

    function getLatestPrice(uint256 contestId) public view returns (int256, uint8) {
        (int256 price, uint8 decimal) = PriceFeed.getUSDPrice(
            AggregatorV3Interface(s_contests[contestId - 1].priceFeedAddress)
        );
        return (price, decimal);
    }

    function getDistributionAmount(uint256 contestId) public view returns (uint256) {
        return (PredictionsOf[contestId - 1].length * i_entranceFee * 8) / 10;
    }
}

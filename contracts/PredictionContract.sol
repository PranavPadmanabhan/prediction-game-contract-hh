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
        uint256 resultTime;
    }

    // STATE VARIABLES

    address payable private immutable i_owner;
    uint256 private s_lastTimeStamp;
    uint256 private immutable i_entranceFee;
    uint256 private immutable i_interval;
    uint256 private s_max_players = 500;

    address[] private s_priceFeedAddresses;
    Contest[] private s_contests;

    mapping(uint256 => Prediction[]) private s_PredictionsOf;
    mapping(uint256 => address[]) private s_WinnersOf;
    mapping(address => uint256) private s_walletOf;
    mapping(uint256 => uint256) private s_playersOf;
    mapping(address => Prediction[]) private s_predictionsOfUser;

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

    // MODIFIERS

    modifier onlyAdmin() {
        require(msg.sender == i_owner, "user is not admin");
        _;
    }

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

    /**
     *
     * @notice function will create all contests when this contract is deployed
     *
     * @dev function for initializing all contests
     *
     */

    function createContest() internal {
        for (uint256 i = 0; i < s_priceFeedAddresses.length; i++) {
            s_contests.push(Contest(i + 1, s_priceFeedAddresses[i]));
        }
    }

    /**
     * @notice function that allow all users to participate and predict values on each contest
     *
     * @dev this function checks if number of players is less than max players and also the msg.sender has sufficent balance in the wallet
     *      then add prediction details to blockchain and update the wallet of msg.sender
     *
     * @param contestId - id of the specific contest
     * @param _predictedValue - the value predicted by msg.sender
     *
     */

    function predict(uint256 contestId, int256 _predictedValue) public {
        if (s_PredictionsOf[contestId - 1].length >= (s_max_players + s_playersOf[contestId - 1])) {
            revert Prediction__Limit_Exceeded();
        }
        if (s_walletOf[msg.sender] < i_entranceFee) {
            revert Prediction__Not_Enough_Amount();
        }

        s_PredictionsOf[contestId - 1].push(
            Prediction(
                _predictedValue,
                block.timestamp,
                0,
                msg.sender,
                i_entranceFee,
                s_lastTimeStamp + i_interval
            )
        );
        s_predictionsOfUser[msg.sender].push(
            Prediction(
                _predictedValue,
                block.timestamp,
                0,
                msg.sender,
                i_entranceFee,
                s_lastTimeStamp + i_interval
            )
        );
        s_walletOf[msg.sender] -= i_entranceFee;
        emit NewPrediction(_predictedValue, block.timestamp, 0, msg.sender, contestId);
    }

    /**
     * @notice function which allows users to deposit funds to the wallet of the game
     *
     * @dev first it checks whether the amount is greater than or equal to the entranceFee if yes then add the amount to
     *      wallet of the user
     */

    function addFunds() public payable {
        if (msg.value < i_entranceFee) {
            revert Prediction__TopUp_error();
        }
        s_walletOf[msg.sender] += msg.value;
        emit TopUpSuccessfull(msg.value, msg.sender);
    }

    /**
     * @notice function which allows users to withdraw funds from their wallets
     *
     * @dev first it checks the amount is greater than or equal to fee and also the if the amount is in the wallet then
     *      the amount will be transferred to the account of msg.sender
     *
     * @param amount - the amount user wants to withdraw from their wallet
     */

    function withdrawFunds(uint256 amount) public payable {
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

    /**
     * @notice function that distribute rewards to winners
     *
     * @dev admin only function that update the wallet of user with the reward value
     *
     * @param addresses - addresses of winners
     * @param rewards - include rewards for winners
     */

    function setReward(address[] memory addresses, uint256[] memory rewards) external onlyAdmin {
        for (uint256 i = 0; i < addresses.length; i++) {
            s_walletOf[addresses[i]] += rewards[i];
        }
    }

    /**
     * @notice function that will refund fee to players
     *
     * @dev admin only function that will add refund amount to wallet of all players if there are insufficient amount of players in a contest
     *
     * @param addresses - addresses of all players
     */

    function Refund(address[] memory addresses) external onlyAdmin {
        for (uint256 i = 0; i < addresses.length; i++) {
            s_walletOf[addresses[i]] += i_entranceFee;
        }
    }

    /**
     * @notice function that update last contest winners
     *
     * @dev admin only function that update winners array with winners
     *
     * @param contestId - id of contest which is completed
     * @param addresses - list of winners addresses
     */

    function updateWinnerList(address[] memory addresses, uint256 contestId) external onlyAdmin {
        s_WinnersOf[contestId - 1] = addresses;
    }

    /**
     * @notice function that declare the contest is completed
     *
     * @dev admin only function that update count of last round players and emit contest completed event
     *
     * @param contestId - id of contest which is completed
     */

    function declareCompletetion(uint256 contestId) external onlyAdmin {
        s_playersOf[contestId - 1] = s_PredictionsOf[contestId - 1].length;
        emit ContestCompleted(contestId);
    }

    /**
     * @notice function which allows admin to withdraw contract funds
     *
     * @dev owner can withdraw the balance of the contract
     *
     * @param amount - the amount admin wants to withdraw
     */

    function withdraw(uint256 amount) external onlyAdmin {
        (bool success, ) = payable(i_owner).call{value: amount}("");
        if (!success) {
            revert Admin_Withdraw_Failed();
        }
    }

    /**
     * @notice function which checks the contest time
     *
     * @dev  perform upkeep triggering function return upkeepneeded true when the time passed
     *
     */

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

    /**
     *
     * @dev  it updates the last contest timestamp
     *
     */

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

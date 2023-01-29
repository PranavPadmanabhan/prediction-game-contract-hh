// SPDX-License-Identifier: MIT
pragma solidity ^0.8.7;

import "@chainlink/contracts/src/v0.8/AutomationCompatible.sol";
import "@chainlink/contracts/src/v0.8/interfaces/AggregatorV3Interface.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "./PriceFeed.sol";

error Prediction__Limit_Exceeded();
error Prediction__Not_Available();
error Prediction__TopUp_error();
error Withdraw__Failed();
error Prediction_Not_Available();
error Admin_Withdraw_Failed();

contract PredictionContract is AutomationCompatibleInterface {
    // STRUCTS

    struct Contest {
        uint256 id;
        address priceFeedAddress;
        uint256 entranceFee;
        uint256 maxPlayers;
        uint256 numOfPredictions;
    }

    struct Prediction {
        uint256 contestId;
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
    uint256[] private s_entranceFeeList;
    uint256 private immutable i_interval;
    uint256 private s_max_players;

    address[] private s_priceFeedAddresses;
    Contest[] private s_contests;

    mapping(uint256 => Prediction[]) private s_PredictionsOf;
    mapping(uint256 => address[]) private s_WinnersOf;
    mapping(address => uint256) private s_walletOf;
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

    // MODIFIERS

    modifier onlyAdmin() {
        require(msg.sender == i_owner, "user is not admin");
        _;
    }

    // FUNCTIONS

    constructor(
        address[] memory addresses,
        uint256[] memory entranceFeeList,
        uint256 interval,
        uint256 numOfPlayers
    ) {
        s_lastTimeStamp = block.timestamp;
        s_entranceFeeList = entranceFeeList;
        s_priceFeedAddresses = addresses;
        i_interval = interval;
        i_owner = payable(msg.sender);
        s_max_players = numOfPlayers;
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
            for (uint256 j = 0; j < s_entranceFeeList.length; j++) {
                s_contests.push(
                    Contest(
                        s_contests.length + 1,
                        s_priceFeedAddresses[i],
                        s_entranceFeeList[j],
                        s_max_players,
                        0
                    )
                );
            }
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
        uint256 fee = s_contests[contestId - 1].entranceFee;
        if (
            s_PredictionsOf[contestId - 1].length >= (s_max_players + s_playersOf[contestId - 1]) ||
            (s_walletOf[msg.sender] < fee) ||
            ((block.timestamp - s_lastTimeStamp) >= (i_interval - 800))
        ) {
            revert Prediction__Not_Available();
        }
        s_PredictionsOf[contestId - 1].push(
            Prediction(
                contestId,
                _predictedValue,
                block.timestamp,
                0,
                msg.sender,
                fee,
                s_lastTimeStamp + i_interval
            )
        );
        s_contests[contestId - 1].numOfPredictions =
            s_PredictionsOf[contestId - 1].length -
            s_playersOf[contestId - 1];
        s_walletOf[msg.sender] -= fee;
        emit NewPrediction(_predictedValue, block.timestamp, 0, msg.sender, contestId);
    }

    /**
     * @notice function which allows users to deposit funds to the wallet of the game
     *
     * @dev first it checks whether the amount is greater than or equal to the entranceFee if yes then add the amount to
     *      wallet of the user
     */

    function addFunds() public payable {
        if (msg.value < s_entranceFeeList[0]) {
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
        if (amount < s_entranceFeeList[0] && amount > s_walletOf[msg.sender]) {
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
     * @param contestId - id  of a specific contest
     * @param addresses - addresses of all players
     */

    function Refund(uint256 contestId, address[] memory addresses) external onlyAdmin {
        uint256 fee = s_contests[contestId - 1].entranceFee;
        for (uint256 i = 0; i < addresses.length; i++) {
            s_walletOf[addresses[i]] += fee;
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
        for (uint256 i = 0; i < addresses.length; i++) {
            s_WinnersOf[contestId - 1].push(addresses[i]);
        }
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
     *
     * @dev function which updates the contest time - admin only
     *
     */

    function updateTimeStamp() external onlyAdmin {
        s_lastTimeStamp = block.timestamp;
        emit ResultAnnounced();
    }

    /**
     *
     * @dev function which updates the maximum number of player - admin only
     *
     * @param length - number to be replaced with current max players
     *
     */

    function updateNumoFPlayers(uint256 length) external onlyAdmin {
        s_max_players = length;
    }

    /**
     *
     * @dev function which add new contest to s_contests array - admin only
     *
     * @param priceFeed - priceFeed address of new contest
     * @param entranceFee - fee for the contest
     *
     */

    function addContest(address priceFeed, uint256 entranceFee) external onlyAdmin {
        s_contests.push(Contest(s_contests.length + 1, priceFeed, entranceFee, s_max_players, 0));
    }

    /**
     * @notice function which checks the contest execution time
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

    function getEntranceFee(uint256 contestId) public view returns (uint256) {
        return s_contests[contestId - 1].entranceFee;
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

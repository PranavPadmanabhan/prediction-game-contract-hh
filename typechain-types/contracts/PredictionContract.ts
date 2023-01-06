/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type {
  BaseContract,
  BigNumber,
  BigNumberish,
  BytesLike,
  CallOverrides,
  ContractTransaction,
  Overrides,
  PayableOverrides,
  PopulatedTransaction,
  Signer,
  utils,
} from "ethers";
import type {
  FunctionFragment,
  Result,
  EventFragment,
} from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export declare namespace PredictionContract {
  export type ContestStruct = {
    id: PromiseOrValue<BigNumberish>;
    priceFeedAddress: PromiseOrValue<string>;
  };

  export type ContestStructOutput = [BigNumber, string] & {
    id: BigNumber;
    priceFeedAddress: string;
  };

  export type PredictionStruct = {
    predictedValue: PromiseOrValue<BigNumberish>;
    predictedAt: PromiseOrValue<BigNumberish>;
    difference: PromiseOrValue<BigNumberish>;
    user: PromiseOrValue<string>;
    amount: PromiseOrValue<BigNumberish>;
  };

  export type PredictionStructOutput = [
    BigNumber,
    BigNumber,
    BigNumber,
    string,
    BigNumber
  ] & {
    predictedValue: BigNumber;
    predictedAt: BigNumber;
    difference: BigNumber;
    user: string;
    amount: BigNumber;
  };
}

export interface PredictionContractInterface extends utils.Interface {
  functions: {
    "addFunds()": FunctionFragment;
    "automateResult(address[],uint256[],uint256)": FunctionFragment;
    "balanceOf(address)": FunctionFragment;
    "checkUpkeep(bytes)": FunctionFragment;
    "getContest(uint256)": FunctionFragment;
    "getContestPlayers(uint256)": FunctionFragment;
    "getContests()": FunctionFragment;
    "getEntranceFee()": FunctionFragment;
    "getInterval()": FunctionFragment;
    "getLatestPrice(uint256)": FunctionFragment;
    "getLatestTimeStamp()": FunctionFragment;
    "getNumOfContests()": FunctionFragment;
    "getNumOfMaxPlayers()": FunctionFragment;
    "getOwner()": FunctionFragment;
    "getPredictions(uint256)": FunctionFragment;
    "getTotalBalance(uint256)": FunctionFragment;
    "getWinners(uint256)": FunctionFragment;
    "performUpkeep(bytes)": FunctionFragment;
    "predict(uint256,int256)": FunctionFragment;
    "withdraw(uint256)": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic:
      | "addFunds"
      | "automateResult"
      | "balanceOf"
      | "checkUpkeep"
      | "getContest"
      | "getContestPlayers"
      | "getContests"
      | "getEntranceFee"
      | "getInterval"
      | "getLatestPrice"
      | "getLatestTimeStamp"
      | "getNumOfContests"
      | "getNumOfMaxPlayers"
      | "getOwner"
      | "getPredictions"
      | "getTotalBalance"
      | "getWinners"
      | "performUpkeep"
      | "predict"
      | "withdraw"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "addFunds", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "automateResult",
    values: [
      PromiseOrValue<string>[],
      PromiseOrValue<BigNumberish>[],
      PromiseOrValue<BigNumberish>
    ]
  ): string;
  encodeFunctionData(
    functionFragment: "balanceOf",
    values: [PromiseOrValue<string>]
  ): string;
  encodeFunctionData(
    functionFragment: "checkUpkeep",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "getContest",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getContestPlayers",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getContests",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getEntranceFee",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getInterval",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getLatestPrice",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getLatestTimeStamp",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumOfContests",
    values?: undefined
  ): string;
  encodeFunctionData(
    functionFragment: "getNumOfMaxPlayers",
    values?: undefined
  ): string;
  encodeFunctionData(functionFragment: "getOwner", values?: undefined): string;
  encodeFunctionData(
    functionFragment: "getPredictions",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getTotalBalance",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "getWinners",
    values: [PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "performUpkeep",
    values: [PromiseOrValue<BytesLike>]
  ): string;
  encodeFunctionData(
    functionFragment: "predict",
    values: [PromiseOrValue<BigNumberish>, PromiseOrValue<BigNumberish>]
  ): string;
  encodeFunctionData(
    functionFragment: "withdraw",
    values: [PromiseOrValue<BigNumberish>]
  ): string;

  decodeFunctionResult(functionFragment: "addFunds", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "automateResult",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "balanceOf", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "checkUpkeep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getContest", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getContestPlayers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getContests",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getEntranceFee",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getInterval",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLatestPrice",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getLatestTimeStamp",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumOfContests",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getNumOfMaxPlayers",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getOwner", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "getPredictions",
    data: BytesLike
  ): Result;
  decodeFunctionResult(
    functionFragment: "getTotalBalance",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "getWinners", data: BytesLike): Result;
  decodeFunctionResult(
    functionFragment: "performUpkeep",
    data: BytesLike
  ): Result;
  decodeFunctionResult(functionFragment: "predict", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "withdraw", data: BytesLike): Result;

  events: {
    "ContestCancelled(uint256)": EventFragment;
    "ContestCompleted(uint256)": EventFragment;
    "NewPrediction(int256,uint256,uint256,address,uint256)": EventFragment;
    "ResultAnnounced()": EventFragment;
    "TopUpSuccessfull(uint256,address)": EventFragment;
    "WithdrawSuccessfull(uint256,address)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "ContestCancelled"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ContestCompleted"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "NewPrediction"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "ResultAnnounced"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "TopUpSuccessfull"): EventFragment;
  getEvent(nameOrSignatureOrTopic: "WithdrawSuccessfull"): EventFragment;
}

export interface ContestCancelledEventObject {
  contestId: BigNumber;
}
export type ContestCancelledEvent = TypedEvent<
  [BigNumber],
  ContestCancelledEventObject
>;

export type ContestCancelledEventFilter =
  TypedEventFilter<ContestCancelledEvent>;

export interface ContestCompletedEventObject {
  contestId: BigNumber;
}
export type ContestCompletedEvent = TypedEvent<
  [BigNumber],
  ContestCompletedEventObject
>;

export type ContestCompletedEventFilter =
  TypedEventFilter<ContestCompletedEvent>;

export interface NewPredictionEventObject {
  predictedValue: BigNumber;
  predictedAt: BigNumber;
  difference: BigNumber;
  user: string;
  contestId: BigNumber;
}
export type NewPredictionEvent = TypedEvent<
  [BigNumber, BigNumber, BigNumber, string, BigNumber],
  NewPredictionEventObject
>;

export type NewPredictionEventFilter = TypedEventFilter<NewPredictionEvent>;

export interface ResultAnnouncedEventObject {}
export type ResultAnnouncedEvent = TypedEvent<[], ResultAnnouncedEventObject>;

export type ResultAnnouncedEventFilter = TypedEventFilter<ResultAnnouncedEvent>;

export interface TopUpSuccessfullEventObject {
  amount: BigNumber;
  user: string;
}
export type TopUpSuccessfullEvent = TypedEvent<
  [BigNumber, string],
  TopUpSuccessfullEventObject
>;

export type TopUpSuccessfullEventFilter =
  TypedEventFilter<TopUpSuccessfullEvent>;

export interface WithdrawSuccessfullEventObject {
  amount: BigNumber;
  user: string;
}
export type WithdrawSuccessfullEvent = TypedEvent<
  [BigNumber, string],
  WithdrawSuccessfullEventObject
>;

export type WithdrawSuccessfullEventFilter =
  TypedEventFilter<WithdrawSuccessfullEvent>;

export interface PredictionContract extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PredictionContractInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(
    eventFilter?: TypedEventFilter<TEvent>
  ): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(
    eventFilter: TypedEventFilter<TEvent>
  ): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    addFunds(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    automateResult(
      addresses: PromiseOrValue<string>[],
      rewards: PromiseOrValue<BigNumberish>[],
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    balanceOf(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { upkeepNeeded: boolean }>;

    getContest(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[PredictionContract.ContestStructOutput]>;

    getContestPlayers(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getContests(
      overrides?: CallOverrides
    ): Promise<[PredictionContract.ContestStructOutput[]]>;

    getEntranceFee(overrides?: CallOverrides): Promise<[BigNumber]>;

    getInterval(overrides?: CallOverrides): Promise<[BigNumber]>;

    getLatestPrice(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, number]>;

    getLatestTimeStamp(overrides?: CallOverrides): Promise<[BigNumber]>;

    getNumOfContests(overrides?: CallOverrides): Promise<[BigNumber]>;

    getNumOfMaxPlayers(overrides?: CallOverrides): Promise<[BigNumber]>;

    getOwner(overrides?: CallOverrides): Promise<[string]>;

    getPredictions(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[PredictionContract.PredictionStructOutput[]]>;

    getTotalBalance(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber]>;

    getWinners(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[PredictionContract.PredictionStructOutput[]]>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    predict(
      contestId: PromiseOrValue<BigNumberish>,
      _predictedValue: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<ContractTransaction>;
  };

  addFunds(
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  automateResult(
    addresses: PromiseOrValue<string>[],
    rewards: PromiseOrValue<BigNumberish>[],
    contestId: PromiseOrValue<BigNumberish>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  balanceOf(
    _address: PromiseOrValue<string>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  checkUpkeep(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: CallOverrides
  ): Promise<[boolean, string] & { upkeepNeeded: boolean }>;

  getContest(
    contestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<PredictionContract.ContestStructOutput>;

  getContestPlayers(
    contestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getContests(
    overrides?: CallOverrides
  ): Promise<PredictionContract.ContestStructOutput[]>;

  getEntranceFee(overrides?: CallOverrides): Promise<BigNumber>;

  getInterval(overrides?: CallOverrides): Promise<BigNumber>;

  getLatestPrice(
    contestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<[BigNumber, number]>;

  getLatestTimeStamp(overrides?: CallOverrides): Promise<BigNumber>;

  getNumOfContests(overrides?: CallOverrides): Promise<BigNumber>;

  getNumOfMaxPlayers(overrides?: CallOverrides): Promise<BigNumber>;

  getOwner(overrides?: CallOverrides): Promise<string>;

  getPredictions(
    contestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<PredictionContract.PredictionStructOutput[]>;

  getTotalBalance(
    contestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<BigNumber>;

  getWinners(
    contestId: PromiseOrValue<BigNumberish>,
    overrides?: CallOverrides
  ): Promise<PredictionContract.PredictionStructOutput[]>;

  performUpkeep(
    arg0: PromiseOrValue<BytesLike>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  predict(
    contestId: PromiseOrValue<BigNumberish>,
    _predictedValue: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  withdraw(
    amount: PromiseOrValue<BigNumberish>,
    overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
  ): Promise<ContractTransaction>;

  callStatic: {
    addFunds(overrides?: CallOverrides): Promise<void>;

    automateResult(
      addresses: PromiseOrValue<string>[],
      rewards: PromiseOrValue<BigNumberish>[],
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    balanceOf(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<[boolean, string] & { upkeepNeeded: boolean }>;

    getContest(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PredictionContract.ContestStructOutput>;

    getContestPlayers(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getContests(
      overrides?: CallOverrides
    ): Promise<PredictionContract.ContestStructOutput[]>;

    getEntranceFee(overrides?: CallOverrides): Promise<BigNumber>;

    getInterval(overrides?: CallOverrides): Promise<BigNumber>;

    getLatestPrice(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<[BigNumber, number]>;

    getLatestTimeStamp(overrides?: CallOverrides): Promise<BigNumber>;

    getNumOfContests(overrides?: CallOverrides): Promise<BigNumber>;

    getNumOfMaxPlayers(overrides?: CallOverrides): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<string>;

    getPredictions(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PredictionContract.PredictionStructOutput[]>;

    getTotalBalance(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWinners(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PredictionContract.PredictionStructOutput[]>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<void>;

    predict(
      contestId: PromiseOrValue<BigNumberish>,
      _predictedValue: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<void>;
  };

  filters: {
    "ContestCancelled(uint256)"(contestId?: null): ContestCancelledEventFilter;
    ContestCancelled(contestId?: null): ContestCancelledEventFilter;

    "ContestCompleted(uint256)"(contestId?: null): ContestCompletedEventFilter;
    ContestCompleted(contestId?: null): ContestCompletedEventFilter;

    "NewPrediction(int256,uint256,uint256,address,uint256)"(
      predictedValue?: null,
      predictedAt?: null,
      difference?: null,
      user?: null,
      contestId?: null
    ): NewPredictionEventFilter;
    NewPrediction(
      predictedValue?: null,
      predictedAt?: null,
      difference?: null,
      user?: null,
      contestId?: null
    ): NewPredictionEventFilter;

    "ResultAnnounced()"(): ResultAnnouncedEventFilter;
    ResultAnnounced(): ResultAnnouncedEventFilter;

    "TopUpSuccessfull(uint256,address)"(
      amount?: null,
      user?: null
    ): TopUpSuccessfullEventFilter;
    TopUpSuccessfull(amount?: null, user?: null): TopUpSuccessfullEventFilter;

    "WithdrawSuccessfull(uint256,address)"(
      amount?: null,
      user?: null
    ): WithdrawSuccessfullEventFilter;
    WithdrawSuccessfull(
      amount?: null,
      user?: null
    ): WithdrawSuccessfullEventFilter;
  };

  estimateGas: {
    addFunds(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    automateResult(
      addresses: PromiseOrValue<string>[],
      rewards: PromiseOrValue<BigNumberish>[],
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    balanceOf(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getContest(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getContestPlayers(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getContests(overrides?: CallOverrides): Promise<BigNumber>;

    getEntranceFee(overrides?: CallOverrides): Promise<BigNumber>;

    getInterval(overrides?: CallOverrides): Promise<BigNumber>;

    getLatestPrice(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getLatestTimeStamp(overrides?: CallOverrides): Promise<BigNumber>;

    getNumOfContests(overrides?: CallOverrides): Promise<BigNumber>;

    getNumOfMaxPlayers(overrides?: CallOverrides): Promise<BigNumber>;

    getOwner(overrides?: CallOverrides): Promise<BigNumber>;

    getPredictions(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getTotalBalance(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    getWinners(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<BigNumber>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    predict(
      contestId: PromiseOrValue<BigNumberish>,
      _predictedValue: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<BigNumber>;
  };

  populateTransaction: {
    addFunds(
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    automateResult(
      addresses: PromiseOrValue<string>[],
      rewards: PromiseOrValue<BigNumberish>[],
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    balanceOf(
      _address: PromiseOrValue<string>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    checkUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getContest(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getContestPlayers(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getContests(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getEntranceFee(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getInterval(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getLatestPrice(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getLatestTimeStamp(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getNumOfContests(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getNumOfMaxPlayers(
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getOwner(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    getPredictions(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getTotalBalance(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    getWinners(
      contestId: PromiseOrValue<BigNumberish>,
      overrides?: CallOverrides
    ): Promise<PopulatedTransaction>;

    performUpkeep(
      arg0: PromiseOrValue<BytesLike>,
      overrides?: Overrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    predict(
      contestId: PromiseOrValue<BigNumberish>,
      _predictedValue: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;

    withdraw(
      amount: PromiseOrValue<BigNumberish>,
      overrides?: PayableOverrides & { from?: PromiseOrValue<string> }
    ): Promise<PopulatedTransaction>;
  };
}

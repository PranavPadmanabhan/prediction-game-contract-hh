/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, BigNumber, Signer, utils } from "ethers";
import type { EventFragment } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type {
  TypedEventFilter,
  TypedEvent,
  TypedListener,
  OnEvent,
  PromiseOrValue,
} from "../common";

export interface PriceFeedInterface extends utils.Interface {
  functions: {};

  events: {
    "PriceUpdated(int256,uint8)": EventFragment;
  };

  getEvent(nameOrSignatureOrTopic: "PriceUpdated"): EventFragment;
}

export interface PriceUpdatedEventObject {
  price: BigNumber;
  decimal: number;
}
export type PriceUpdatedEvent = TypedEvent<
  [BigNumber, number],
  PriceUpdatedEventObject
>;

export type PriceUpdatedEventFilter = TypedEventFilter<PriceUpdatedEvent>;

export interface PriceFeed extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: PriceFeedInterface;

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

  functions: {};

  callStatic: {};

  filters: {
    "PriceUpdated(int256,uint8)"(
      price?: null,
      decimal?: null
    ): PriceUpdatedEventFilter;
    PriceUpdated(price?: null, decimal?: null): PriceUpdatedEventFilter;
  };

  estimateGas: {};

  populateTransaction: {};
}

// @ts-ignore
// @ts-ignore
// @ts-ignore
import {
  EthereumEvent,
  SmartContract,
  EthereumValue,
  JSONValue,
  TypedMap,
  Entity,
  EthereumTuple,
  Bytes,
  Address,
  BigInt
} from "@graphprotocol/graph-ts";

export class Wager extends EthereumEvent {
  get params(): WagerParams {
    return new WagerParams(this);
  }
}

export class WagerParams {
  _event: Wager;

  constructor(event: Wager) {
    this._event = event;
  }

  get actionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get actor(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get msg(): string {
    return this._event.parameters[2].value.toString();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get balance(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class WagerAccepted extends EthereumEvent {
  get params(): WagerAcceptedParams {
    return new WagerAcceptedParams(this);
  }
}

export class WagerAcceptedParams {
  _event: WagerAccepted;

  constructor(event: WagerAccepted) {
    this._event = event;
  }

  get actionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get acceptor(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get msg(): string {
    return this._event.parameters[2].value.toString();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }

  get balance(): BigInt {
    return this._event.parameters[4].value.toBigInt();
  }
}

export class Shame extends EthereumEvent {
  get params(): ShameParams {
    return new ShameParams(this);
  }
}

export class ShameParams {
  _event: Shame;

  constructor(event: Shame) {
    this._event = event;
  }

  get actionId(): BigInt {
    return this._event.parameters[0].value.toBigInt();
  }

  get loser(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get winner(): Address {
    return this._event.parameters[2].value.toAddress();
  }

  get amount(): BigInt {
    return this._event.parameters[3].value.toBigInt();
  }
}

export class MinterAdded extends EthereumEvent {
  get params(): MinterAddedParams {
    return new MinterAddedParams(this);
  }
}

export class MinterAddedParams {
  _event: MinterAdded;

  constructor(event: MinterAdded) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class MinterRemoved extends EthereumEvent {
  get params(): MinterRemovedParams {
    return new MinterRemovedParams(this);
  }
}

export class MinterRemovedParams {
  _event: MinterRemoved;

  constructor(event: MinterRemoved) {
    this._event = event;
  }

  get account(): Address {
    return this._event.parameters[0].value.toAddress();
  }
}

export class Transfer extends EthereumEvent {
  get params(): TransferParams {
    return new TransferParams(this);
  }
}

export class TransferParams {
  _event: Transfer;

  constructor(event: Transfer) {
    this._event = event;
  }

  get from(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get to(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Approval extends EthereumEvent {
  get params(): ApprovalParams {
    return new ApprovalParams(this);
  }
}

export class ApprovalParams {
  _event: Approval;

  constructor(event: Approval) {
    this._event = event;
  }

  get owner(): Address {
    return this._event.parameters[0].value.toAddress();
  }

  get spender(): Address {
    return this._event.parameters[1].value.toAddress();
  }

  get value(): BigInt {
    return this._event.parameters[2].value.toBigInt();
  }
}

export class Contract extends SmartContract {
  static bind(address: Address): Contract {
    return new Contract("Contract", address);
  }

  name(): string {
    let result = super.call("name", []);
    return result[0].toString();
  }

  totalSupply(): BigInt {
    let result = super.call("totalSupply", []);
    return result[0].toBigInt();
  }

  decimals(): BigInt {
    let result = super.call("decimals", []);
    return result[0].toBigInt();
  }

  getId(): BigInt {
    let result = super.call("getId", []);
    return result[0].toBigInt();
  }

  balanceOf(owner: Address): BigInt {
    let result = super.call("balanceOf", [EthereumValue.fromAddress(owner)]);
    return result[0].toBigInt();
  }

  getWagerAcceptor(_actionId: BigInt): Address {
    let result = super.call("getWagerAcceptor", [
      EthereumValue.fromUnsignedBigInt(_actionId)
    ]);
    return result[0].toAddress();
  }

  symbol(): string {
    let result = super.call("symbol", []);
    return result[0].toString();
  }

  getWagerStatus(_actionId: BigInt): BigInt {
    let result = super.call("getWagerStatus", [
      EthereumValue.fromUnsignedBigInt(_actionId)
    ]);
    return result[0].toBigInt();
  }

  getWagerAmount(_actionId: BigInt): BigInt {
    let result = super.call("getWagerAmount", [
      EthereumValue.fromUnsignedBigInt(_actionId)
    ]);
    return result[0].toBigInt();
  }

  isMinter(account: Address): boolean {
    let result = super.call("isMinter", [EthereumValue.fromAddress(account)]);
    return result[0].toBoolean();
  }

  getWagerBettor(_actionId: BigInt): Address {
    let result = super.call("getWagerBettor", [
      EthereumValue.fromUnsignedBigInt(_actionId)
    ]);
    return result[0].toAddress();
  }

  allowance(owner: Address, spender: Address): BigInt {
    let result = super.call("allowance", [
      EthereumValue.fromAddress(owner),
      EthereumValue.fromAddress(spender)
    ]);
    return result[0].toBigInt();
  }

  getWagerDescription(_actionId: BigInt): string {
    let result = super.call("getWagerDescription", [
      EthereumValue.fromUnsignedBigInt(_actionId)
    ]);
    return result[0].toString();
  }
}

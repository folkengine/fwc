import {
  TypedMap,
  Entity,
  Value,
  ValueKind,
  store,
  Address,
  Bytes,
  BigInt,
  BigDecimal
} from "@graphprotocol/graph-ts";

export class Wager extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Wager entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Wager entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Wager", id.toString(), this);
  }

  static load(id: string): Wager | null {
    return store.get("Wager", id) as Wager | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get actionId(): BigInt {
    let value = this.get("actionId");
    return value.toBigInt();
  }

  set actionId(value: BigInt) {
    this.set("actionId", Value.fromBigInt(value));
  }

  get actor(): Bytes {
    let value = this.get("actor");
    return value.toBytes();
  }

  set actor(value: Bytes) {
    this.set("actor", Value.fromBytes(value));
  }

  get msg(): string {
    let value = this.get("msg");
    return value.toString();
  }

  set msg(value: string) {
    this.set("msg", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }
}

export class WagerAccepted extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save WagerAccepted entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save WagerAccepted entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("WagerAccepted", id.toString(), this);
  }

  static load(id: string): WagerAccepted | null {
    return store.get("WagerAccepted", id) as WagerAccepted | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get actionId(): BigInt {
    let value = this.get("actionId");
    return value.toBigInt();
  }

  set actionId(value: BigInt) {
    this.set("actionId", Value.fromBigInt(value));
  }

  get acceptor(): Bytes {
    let value = this.get("acceptor");
    return value.toBytes();
  }

  set acceptor(value: Bytes) {
    this.set("acceptor", Value.fromBytes(value));
  }

  get msg(): string {
    let value = this.get("msg");
    return value.toString();
  }

  set msg(value: string) {
    this.set("msg", Value.fromString(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }

  get balance(): BigInt {
    let value = this.get("balance");
    return value.toBigInt();
  }

  set balance(value: BigInt) {
    this.set("balance", Value.fromBigInt(value));
  }
}

export class Shame extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Shame entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Shame entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Shame", id.toString(), this);
  }

  static load(id: string): Shame | null {
    return store.get("Shame", id) as Shame | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get actionId(): BigInt {
    let value = this.get("actionId");
    return value.toBigInt();
  }

  set actionId(value: BigInt) {
    this.set("actionId", Value.fromBigInt(value));
  }

  get loser(): Bytes {
    let value = this.get("loser");
    return value.toBytes();
  }

  set loser(value: Bytes) {
    this.set("loser", Value.fromBytes(value));
  }

  get winner(): Bytes {
    let value = this.get("winner");
    return value.toBytes();
  }

  set winner(value: Bytes) {
    this.set("winner", Value.fromBytes(value));
  }

  get amount(): BigInt {
    let value = this.get("amount");
    return value.toBigInt();
  }

  set amount(value: BigInt) {
    this.set("amount", Value.fromBigInt(value));
  }
}

export class MinterAdded extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save MinterAdded entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save MinterAdded entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("MinterAdded", id.toString(), this);
  }

  static load(id: string): MinterAdded | null {
    return store.get("MinterAdded", id) as MinterAdded | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }
}

export class MinterRemoved extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save MinterRemoved entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save MinterRemoved entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("MinterRemoved", id.toString(), this);
  }

  static load(id: string): MinterRemoved | null {
    return store.get("MinterRemoved", id) as MinterRemoved | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get account(): Bytes {
    let value = this.get("account");
    return value.toBytes();
  }

  set account(value: Bytes) {
    this.set("account", Value.fromBytes(value));
  }
}

export class Transfer extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Transfer entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Transfer entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Transfer", id.toString(), this);
  }

  static load(id: string): Transfer | null {
    return store.get("Transfer", id) as Transfer | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get from(): Bytes {
    let value = this.get("from");
    return value.toBytes();
  }

  set from(value: Bytes) {
    this.set("from", Value.fromBytes(value));
  }

  get to(): Bytes {
    let value = this.get("to");
    return value.toBytes();
  }

  set to(value: Bytes) {
    this.set("to", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

export class Approval extends Entity {
  constructor(id: string) {
    this.entries = new Array(0);
    this.set("id", Value.fromString(id));
  }

  save(): void {
    let id = this.get("id");
    assert(id !== null, "Cannot save Approval entity without an ID");
    assert(
      id.kind == ValueKind.STRING,
      "Cannot save Approval entity with non-string ID. " +
        'Considering using .toHex() to convert the "id" to a string.'
    );
    store.set("Approval", id.toString(), this);
  }

  static load(id: string): Approval | null {
    return store.get("Approval", id) as Approval | null;
  }

  get id(): string {
    let value = this.get("id");
    return value.toString();
  }

  set id(value: string) {
    this.set("id", Value.fromString(value));
  }

  get owner(): Bytes {
    let value = this.get("owner");
    return value.toBytes();
  }

  set owner(value: Bytes) {
    this.set("owner", Value.fromBytes(value));
  }

  get spender(): Bytes {
    let value = this.get("spender");
    return value.toBytes();
  }

  set spender(value: Bytes) {
    this.set("spender", Value.fromBytes(value));
  }

  get value(): BigInt {
    let value = this.get("value");
    return value.toBigInt();
  }

  set value(value: BigInt) {
    this.set("value", Value.fromBigInt(value));
  }
}

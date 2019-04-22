import {
  Wager as WagerEvent,
  WagerAccepted as WagerAcceptedEvent,
  Shame as ShameEvent,
  MinterAdded as MinterAddedEvent,
  MinterRemoved as MinterRemovedEvent,
  Transfer as TransferEvent,
  Approval as ApprovalEvent
} from "../generated/Contract/Contract"
import {
  Wager,
  WagerAccepted,
  Shame,
  MinterAdded,
  MinterRemoved,
  Transfer,
  Approval
} from "../generated/schema"

export function handleWager(event: WagerEvent): void {
  let entity = new Wager(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.actionId = event.params.actionId
  entity.actor = event.params.actor
  entity.msg = event.params.msg
  entity.amount = event.params.amount
  entity.balance = event.params.balance
  entity.save()
}

export function handleWagerAccepted(event: WagerAcceptedEvent): void {
  let entity = new WagerAccepted(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.actionId = event.params.actionId
  entity.acceptor = event.params.acceptor
  entity.msg = event.params.msg
  entity.amount = event.params.amount
  entity.balance = event.params.balance
  entity.save()
}

export function handleShame(event: ShameEvent): void {
  let entity = new Shame(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.actionId = event.params.actionId
  entity.loser = event.params.loser
  entity.winner = event.params.winner
  entity.amount = event.params.amount
  entity.save()
}

export function handleMinterAdded(event: MinterAddedEvent): void {
  let entity = new MinterAdded(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.save()
}

export function handleMinterRemoved(event: MinterRemovedEvent): void {
  let entity = new MinterRemoved(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.account = event.params.account
  entity.save()
}

export function handleTransfer(event: TransferEvent): void {
  let entity = new Transfer(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.from = event.params.from
  entity.to = event.params.to
  entity.value = event.params.value
  entity.save()
}

export function handleApproval(event: ApprovalEvent): void {
  let entity = new Approval(
    event.transaction.hash.toHex() + "-" + event.logIndex.toString()
  )
  entity.owner = event.params.owner
  entity.spender = event.params.spender
  entity.value = event.params.value
  entity.save()
}

import { Address, ethereum } from "@graphprotocol/graph-ts";

import {
  Account,
  DefifaTierRedemptionWeight,
  Scorecard,
  Transaction,
} from "../../generated/schema";

import { ScorecardSubmitted } from "../../generated/DefifaGovernor/DefifaGovernor";

export function handleScorecardSubmitted(event: ScorecardSubmitted): void {
  let scorecard = new Scorecard(event.params.scorecardId.toString());
  scorecard.submitter = fetchAccount(event.params.caller).id;
  scorecard.gameId = event.params.gameId.toString();
  scorecard.save();

  for (let i = 0; i < event.params.tierWeights.length; i++) {
    const tierWeight = event.params.tierWeights[i];
    let weight = new DefifaTierRedemptionWeight(
      scorecard.id + "-" + tierWeight.id.toString()
    );
    weight.tierId = tierWeight.id.toString()
    weight.redemptionWeight = tierWeight.redemptionWeight;
    weight.scorecard = scorecard.id;
    weight.save();
  }
}

// HELPERS

export function fetchAccount(address: Address): Account {
  let account = new Account(address);
  account.save();
  return account;
}

export function logTransaction(event: ethereum.Event): Transaction {
  let tx = new Transaction(event.transaction.hash.toHex());
  tx.timestamp = event.block.timestamp;
  tx.blockNumber = event.block.number;
  tx.save();
  return tx as Transaction;
}
export type Tx = Transaction;

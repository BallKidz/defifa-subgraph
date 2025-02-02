import { BigInt, DataSourceContext } from "@graphprotocol/graph-ts";
import { LaunchGame as LaunchGameEvent } from "../../generated/DefifaDeployer/DefifaDeployer";
import { DefifaNFT as DefifaNFTContract } from "../../generated/templates/DefifaNFT/DefifaNFT";
import { Contract as ContractEntity } from "../../generated/schema";
import { DefifaNFT as Contract } from "../../generated/templates";

export function handleLaunchGame(event: LaunchGameEvent): void {
  let caller = event.params.caller;
  let delegate = event.params.delegate;
  let gameId = event.params.gameId;
  let tokenUriResolver = event.params.tokenUriResolver;

  let contract = new ContractEntity(delegate);

  const delegateContract = DefifaNFTContract.bind(delegate);
  const gameName = delegateContract.name();

  contract.address = delegate;
  contract.name = gameName;
  contract.gameId = gameId;
  contract.creator = caller;
  contract.tokenUriResolver = tokenUriResolver;
  contract.totalSupply = BigInt.fromI32(0);

  contract.save();

  let defifaContractContext = new DataSourceContext();
  defifaContractContext.setBigInt("gameId", gameId);
  Contract.createWithContext(delegate, defifaContractContext);

  let governorContext = new DataSourceContext();
  governorContext.setBigInt("gameId", gameId);
}

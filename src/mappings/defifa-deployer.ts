import { BigInt, DataSourceContext } from "@graphprotocol/graph-ts"
import { LaunchGame as LaunchGameEvent } from "../../generated/DefifaDeployer/DefifaDeployer"
import { Contract as ContractEntity } from "../../generated/schema"
import { DefifaNFT as Contract } from "../../generated/templates"
import { DefifaNFT } from "../../generated/templates/DefifaNFT/DefifaNFT"

export function handleLaunchGame(event: LaunchGameEvent): void {
  let caller = event.params.caller
  let delegate = event.params.delegate
  let gameId = event.params.gameId
  let governor = event.params.governor
  let tokenUriResolver = event.params.tokenUriResolver

  let contract = new ContractEntity(delegate.toHex())

  // let instance = DefifaNFT.bind(event.params.delegate)

  contract.address = delegate
  contract.gameId = gameId
  contract.governor = governor
  contract.creator = caller
  contract.tokenUriResolver = tokenUriResolver
  contract.totalSupply = BigInt.fromI32(0)

  // let name = instance.try_name()
  // if (!name.reverted) {
  //   contract.name = name.value
  // }
  // let symbol = instance.try_symbol()
  // if (!symbol.reverted) {
  //   contract.symbol = symbol.value
  // }

  contract.save()

  let context = new DataSourceContext()
  context.setBigInt("gameId", gameId)
  Contract.createWithContext(delegate, context)
}

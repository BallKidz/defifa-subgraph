import { Bytes, dataSource, json, log } from "@graphprotocol/graph-ts"

import { TokenMetadata } from "../../generated/schema"

export function handleMetadata(content: Bytes): void {
  const tokenId = dataSource.context().getString("tokenId")
  const contractAddress = dataSource.context().getString("contract")
  const tokenFullId = contractAddress + "-" + tokenId

  let tokenMetadata = new TokenMetadata(tokenFullId)
  tokenMetadata.token = tokenFullId

  if (content.toString().startsWith("{")) {
    const value = json.fromBytes(content).toObject()

    if (value) {
      const image = value.get("image")
      const name = value.get("name")
      const description = value.get("description")
      const identifier = value.get("identifier")
      const tags = value.get("tags")

      if (name) tokenMetadata.name = name.toString()
      if (image) tokenMetadata.image = image.toString()
      if (description) tokenMetadata.description = description.toString()
      if (identifier) tokenMetadata.identifier = identifier.toBigInt()
      if (tags)
        tokenMetadata.tags = tags.toArray().map<string>((tag) => tag.toString())
    }
  }

  tokenMetadata.save()
}

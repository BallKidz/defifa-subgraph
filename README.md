# Defifa Subgraph

Currently served by TheGraph's hosted service at: https://thegraph.com/hosted-service/subgraph/tomquirk/defifa-subgrap-hosted

## Development

### Deploy a new Subgraph version

- Run `yarn deploy`.

#### When to deploy a new version

| Change | Response |
| --- | --- |
| Contracts are redeployed and have new addresses | Update the contract addresses in the `subgraph.yaml` file and deploy a new Subgraph version |
| Contracts change how events are emitted | Update the `eventHandlers` in the `subgraph.yaml` file, then make necessary changes to the respective handler file in `src/mappings/`, then deploy. | 


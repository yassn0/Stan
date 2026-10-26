# Stan smart contracts

Foundry project holding the `Artist` / `ArtistFactory` contracts used by the Stan frontend.
Full API: [documentation.md](documentation.md).

## Setup

```shell
forge install foundry-rs/forge-std@v1.9.7 smartcontractkit/chainlink-brownie-contracts@1.3.0 --no-git
```

## Build / test

```shell
forge build
forge test
```

## Deploy

```shell
forge script script/DeployMissionMaker.sol --rpc-url <your_rpc_url> --private-key <your_private_key> --broadcast
```

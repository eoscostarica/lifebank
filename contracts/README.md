# Smart Contracts

There are three smart contracts deployed by lifebank.

- [Informed Consent Contract `consent2life`](#informed-consent-contract-consent2life)
- [Community Contract `lifebankcode`](#community-contract-lifebankcode)
- [Community Token Contract `lifebankcoin`](#community-token-contract-lifebankcoin)

## Unit Tests 

Unit tests for contract actions can be found here : [Life Bank Smart Contract Unit Tests](./tests)

### Important

Only `lifebankcode` can create a new community.
Use action `createcmm`

ACTION lifebankcode::createcmm(
eosio::name creator,
string community_name,
eosio::asset community_asset,
string description,
string logo,
const asset &maximum_supply)

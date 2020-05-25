# consent2life

## Informed Consent Contract [consent2life](https://github.com/eoscostarica/lifebank/tree/master/contracts/consent2life)

- Each donor must accept terms of use
- Each donation center must accept terms of participation
- Each local business must accept terms of participation
- All users must also have a way of revoking their consent.
- Ricardian Clauses included for each terms of service consent.

The Smart Contract is code deployed under the account [consent2life](https://jungle.bloks.io/account/consent2life).

Informed consent table must have :

- data owner - doner account name
- data viewer - clinic account name
- hash - hash of the smart contract
- ricardian clauses

## Compile

```
cd contracts/consent2life
eosio-cpp -abigen ./src/consent2life.cpp -o consent2life.wasm -I ./include/ -R ./ricardian
```

### Deploy

```
cleos wallet create -n lifebankcode --to-console

Creating wallet: lifebankcode
Save password to use in the future to unlock this wallet.
Without password imported keys will not be retrievable.
"YYY"
```

```
cleos wallet import -n lifebankcode --private-key XXX
imported private key for: EOS6C6NWiDkzA1AkVsuzWn1V1DGEsQ6iYMd1K5LBTHExzEmpDN5gW
```

```
cleos wallet unlock -n lifebankcode --password YYY
```

```
cleos -u https://jungle.eosio.cr set contract lifebankcode ./ lifebankcode.wasm lifebankcode.abi -p lifebankcode@active
```

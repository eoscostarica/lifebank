# consent2life

Medical cal procedures are inherently risky users must be informed and consent to the service

Users must also have a way of revoking their consent.

Each user must accept terms of service in order to use `lifebankcode` and `lifebankcoin` smart contracts

once a users account is created and PIN is generated the user must sign a transaction declaring informed consent to use the app.

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

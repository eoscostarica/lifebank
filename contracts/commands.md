## Compile

```
cd contracts/consent2life
eosio-cpp -abigen ./src/consent2life.cpp -o consent2life.wasm -I ./include/ -R ./ricardian
```

```
cd contracts/lifebankcode
eosio-cpp -abigen ./src/lifebankcode.cpp -o lifebankcode.wasm -I ./include/ -R ./ricardian
```

### Deploy local

#### consent2life

```
cleos wallet create -n consent2life --to-console

Creating wallet: lifebankcode
Save password to use in the future to unlock this wallet.
Without password imported keys will not be retrievable.
"YYY"
```

```
cleos wallet import -n consent2life --private-key XXX
imported private key for: EOS8SGFWbhTao1dnVRt9H5SkaKVtvpKiF6oG45SjybVzdASwpZRCN
```

```
cleos wallet unlock -n consent2life --password YYY
```

```
cleos -u https://jungle.eosio.cr set contract consent2life ./ consent2life.wasm consent2life.abi -p consent2life@active
```

#### lifebankcode

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

Use secundary index sha256

```
cleos -u https://jungle.eosio.cr get table consent2life consent2life userconsents --index 2 --key-type sha256 -L c27474851c08b81e0c02e2383f52d62f58860be5ad60cb6d6606393e8f9b6607 -U c27474851c08b81e0c02e2383f52d62f58860be5ad60cb6d6606393e8f9b6607
```

Adding eosio.code to permissions

The eosio.code authority is a pseudo authority implemented to enhance security, and enable contracts to execute inline actions.

```
cleos wallet unlock -n lifebankcode --password XXX
cleos -u https://jungle.eosio.cr set account permission lifebankcode active --add-code
```

# Eosio name to uint64

[![NPM](https://img.shields.io/npm/v/eosjs-account-name.svg)](https://www.npmjs.org/package/eosjs-account-name)
[![Build Status](https://travis-ci.org/manh-vv/eosjs-name.svg?branch=master)](https://travis-ci.org/manh-vv/eosjs-name)

```sh
npm i eosjs-account-name
```

```sh
yarn add eosjs-account-name
```

## From name to uint64

Here is [how eosio account name is computed to uint64]
(https://github.com/EOSIO/eos/blob/master/libraries/chain/include/eosio/chain/name.hpp#L21), I
think node developer should have this function too :).

[main.cpp](./examples/main.cpp) show how sample values are created.

```text
"eosio",
"eosio.msig",
"eosio.token",

---- 6138663577826885632
---- 6138663587900751872
---- 6138663591592764928
```

## From uint64 to name

Source https://github.com/EOSIO/eos/blob/master/libraries/chain/name.cpp#L19

## Example

Try on run-kit https://npm.runkit.com/eosjs-account-name

```javascript
const eosjsAccountName = require("eosjs-account-name")
const n = eosjsAccountName.nameToUint64('eosio');

console.log('eosio to uint64: ' + n);

console.log('uint64 to name: ' + eosjsAccountName.uint64ToName(n));
```

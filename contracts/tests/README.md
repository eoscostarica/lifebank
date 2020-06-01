## How to Run tests
Make the following adjustments within `test_lifebank.js` file.

1) you need to assign the priv key for the variable ```lifebank_priv_key``` which is the private
key for EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV.

2) The test suite require the accounts `lifebank1111` `lifebank1111` `lifebank1111`

3) Adjust the value of ``` const rpc = new JsonRpc('http://localhost:8888', { fetch });``` to pointing to your endpoint.
 
## execute the following commands: 
 ```
 yarn add eosjs
 yarn install
 yarn test
```


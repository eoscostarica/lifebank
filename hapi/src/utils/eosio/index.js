const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig') // development only
const fetch = require('node-fetch')
const { TextEncoder, TextDecoder } = require('util')

const { eosConfig } = require('./config')

const defaultPrivateKey = eosConfig.privateKey
const signatureProvider = new JsSignatureProvider([defaultPrivateKey])
const rpc = new JsonRpc(eosConfig.jungleUrl, { fetch })
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder()
})

const addTransaction = ({
  contractName = 'eossmartgat1',
  action = 'add',
  ...data
}) =>
  api.transact(
    {
      actions: [
        {
          account: contractName,
          name: action,
          authorization: [
            {
              actor: contractName,
              permission: 'active'
            }
          ],
          data
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  )

module.exports = {
  addTransaction
}

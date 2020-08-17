const { Api, JsonRpc } = require('eosjs')
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig')
const fetch = require('node-fetch')
const { TextEncoder, TextDecoder } = require('util')
const EosApi = require('eosjs-api')

const { eosConfig } = require('../config')

const wallet = require('./wallet')

const textEncoder = new TextEncoder()
const textDecoder = new TextDecoder()
const rpc = new JsonRpc(eosConfig.apiUrl, { fetch })
const eosApi = EosApi({
  httpEndpoint: eosConfig.apiUrl,
  verbose: false,
  fetchConfiguration: {}
})

const createAccount = async accountName => {
  const password = await wallet.create(accountName)
  const key = await wallet.createKey(accountName)

  try {
    await wallet.unlock(eosConfig.baseAccount, eosConfig.baseAccountPassword)
  } catch (error) {}

  const keys = await wallet.listKeys(
    eosConfig.baseAccount,
    eosConfig.baseAccountPassword
  )
  const api = new Api({
    rpc,
    textDecoder,
    textEncoder,
    chainId: eosConfig.chainId,
    signatureProvider: new JsSignatureProvider(keys)
  })
  const authorization = [
    {
      actor: eosConfig.baseAccount,
      permission: 'active'
    }
  ]

  const transaction = await api.transact(
    {
      actions: [
        {
          authorization,
          account: 'eosio',
          name: 'newaccount',
          data: {
            creator: eosConfig.baseAccount,
            name: accountName,
            owner: {
              threshold: 1,
              keys: [
                {
                  key,
                  weight: 1
                }
              ],
              accounts: [],
              waits: []
            },
            active: {
              threshold: 1,
              keys: [
                {
                  key,
                  weight: 1
                }
              ],
              accounts: [],
              waits: []
            }
          }
        },
        {
          authorization,
          account: 'eosio',
          name: 'buyrambytes',
          data: {
            payer: eosConfig.baseAccount,
            receiver: accountName,
            bytes: 4096
          }
        },
        {
          authorization,
          account: 'eosio',
          name: 'delegatebw',
          data: {
            from: eosConfig.baseAccount,
            receiver: accountName,
            stake_net_quantity: '1.0000 EOS',
            stake_cpu_quantity: '1.0000 EOS',
            transfer: false
          }
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  )
  await wallet.lock(eosConfig.baseAccount)

  return {
    password,
    transaction
  }
}

const generateRandomAccountName = async (prefix = '') => {
  const length = 12

  if (prefix.length === 12) return prefix

  const characters = 'abcdefghijklmnopqrstuvwxyz12345'
  let accountName = prefix

  while (accountName.length < length) {
    accountName = `${accountName}${characters.charAt(
      Math.floor(Math.random() * characters.length)
    )}`
  }

  try {
    const account = await getAccount(accountName)

    return account ? generateRandomAccountName(prefix) : accountName
  } catch (error) {
    return accountName
  }
}

const getAbi = account => eosApi.getAbi(account)

const getAccount = async account => {
  try {
    const accountInfo = await eosApi.getAccount(account)

    return accountInfo
  } catch (error) {
    return null
  }
}

const getCodeHash = account => eosApi.getCodeHash(account)

const getCurrencyBalance = (code, account, symbol) =>
  eosApi.getCurrencyBalance(code, account, symbol)

const getTableRows = options => eosApi.getTableRows({ json: true, ...options })

const transact = async (actions, account, password) => {
  try {
    await wallet.unlock(account, password)
  } catch (error) {}

  const keys = await wallet.listKeys(account, password)
  const api = new Api({
    rpc,
    textDecoder,
    textEncoder,
    chainId: eosConfig.chainId,
    signatureProvider: new JsSignatureProvider(keys)
  })

  const transaction = await api.transact(
    {
      actions
    },
    {
      blocksBehind: 3,
      expireSeconds: 30
    }
  )

  await wallet.lock(account)

  return transaction
}

module.exports = {
  createAccount,
  generateRandomAccountName,
  getAccount,
  getAbi,
  getCodeHash,
  getCurrencyBalance,
  getTableRows,
  transact
}

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

const createAccount = async (accountName) => {
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
          authorization: [
            {
              actor: 'costarica',
              permission: 'writer'
            }
          ],
          account: 'writer',
          name: 'run',
          data: {}
        },
        {
          authorization,
          account: 'eosio',
          name: 'newaccount',
          data: {
            creator: 'lifebank',
            name: accountName,
            active: {
              threshold: 2,
              keys: [{ weight: 1, key: key }],
              accounts: [
                {
                  weight: 1,
                  permission: { actor: 'writer', permission: 'access' }
                }
              ],
              waits: []
            },
            owner: {
              threshold: 2,
              keys: [{ weight: 1, key: key }],
              accounts: [
                {
                  weight: 1,
                  permission: { actor: 'writer', permission: 'access' }
                }
              ],
              waits: []
            },
            owner: {
              threshold: 2,
              keys: [{ weight: 1, key: key }],
              accounts: [
                {
                  weight: 1,
                  permission: { actor: 'writer', permission: 'access' }
                }
              ],
              waits: []
            }
          }
        }
      ]
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
      sign: true
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

const getAbi = (account) => eosApi.getAbi(account)

const getAccount = async (account) => {
  try {
    const accountInfo = await eosApi.getAccount(account)
    return accountInfo
  } catch (error) {
    return null
  }
}

const getCodeHash = (account) => eosApi.getCodeHash(account)

const getCurrencyBalance = (code, account, symbol) =>
  eosApi.getCurrencyBalance(code, account, symbol)

const getTableRows = (options) =>
  eosApi.getTableRows({ json: true, ...options })

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
  actions.unshift({
    authorization: [
      {
        actor: 'costarica',
        permission: 'writer'
      }
    ],
    account: 'writer',
    name: 'run',
    data: {}
  })

  const transaction = await api.transact(
    {
      actions
    },
    {
      blocksBehind: 3,
      expireSeconds: 30,
      sign: true
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

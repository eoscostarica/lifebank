const {
  eosUtils,
  jwtUtils,
  concent2lifeUtils,
  lifebankcodeUtils,
  lifebankcoinUtils
} = require('../utils')

const vaultApi = require('./vault.api')
const historyApi = require('./history.api')

const create = async ({ type, secret }) => {
  const account = await eosUtils.generateRandomAccountName(type)
  const { password, transaction } = await eosUtils.createAccount(account)
  const token = jwtUtils.create({ account, type })

  await vaultApi.insert({
    type,
    account,
    secret,
    password
  })

  await historyApi.insert(transaction)

  return {
    account,
    token,
    transaction_id: transaction.transaction_id
  }
}

const getProfile = async account => {
  const vault = await vaultApi.getOne({
    account: { _eq: account }
  })

  let data = {}

  switch (vault.type) {
    case 'donor':
      data = await getDonorData(account)
      break
    default:
      break
  }

  return {
    account,
    role: vault.type,
    ...data
  }
}

const getDonorData = async account => {
  const { tx } = await lifebankcodeUtils.getDonor(account)
  const data = await getTransactionData(tx)
  const networks = await lifebankcodeUtils.getUserNetworks(account)
  const comunities = []

  for (let index = 0; index < networks.length; index++) {
    const comunity = await lifebankcodeUtils.getComunity(
      networks[index].community
    )
    comunities.push(comunity.community_name)
  }

  const concents = await concent2lifeUtils.getConcent(account)
  const concent = concents.find(item => item.user === account)
  const balance = await lifebankcoinUtils.getbalance(account)

  return {
    comunities,
    balance,
    concent: !!concent,
    fullname: data.doner_name
  }
}

const getTransactionData = async tx => {
  const {
    processed: { action_traces: actionTraces = [] } = {}
  } = await historyApi.getOne({
    transaction_id: { _eq: tx }
  })

  return actionTraces.reduce(
    (result, item) => ({ ...result, ...item.act.data }),
    {}
  )
}

const login = async ({ account, secret }) => {
  const vault = await vaultApi.getOne({
    account: { _eq: account },
    secret: { _eq: secret }
  })

  if (!vault) {
    throw new Error('Invalid account or secret')
  }

  const token = jwtUtils.create({ account, type: vault.type })

  return {
    token
  }
}

module.exports = {
  create,
  getProfile,
  login
}

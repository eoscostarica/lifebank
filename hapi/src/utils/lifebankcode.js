const eosUtil = require('./eos')

const CONTRACT_NAME = 'lifebankcode' // @todo: use ENV
const COMMUNITY_ASSET = '0 LIFE' // @todo: use ENV

const addDonor = (account, password) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: CONTRACT_NAME,
        name: 'adddonor',
        data: {
          account,
          community_asset: COMMUNITY_ASSET
        }
      }
    ],
    account,
    password
  )
}

const addLifebank = (
  account,
  password,
  { name, hasImmunityTest, geolocation, ...profile }
) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: CONTRACT_NAME,
        name: 'addlifebank',
        data: {
          account,
          lifebank_name: name,
          hasImmunityTest: hasImmunityTest || false,
          community_asset: COMMUNITY_ASSET,
          location: JSON.stringify(geolocation),
          ...profile
        }
      }
    ],
    account,
    password
  )
}

const upLifebank = (
  account,
  password,
  { name, hasImmunityTest, geolocation, ...profile }
) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: CONTRACT_NAME,
        name: 'uplifebank',
        data: {
          account,
          lifebank_name: name,
          hasImmunityTest: hasImmunityTest || false,
          community_asset: COMMUNITY_ASSET,
          location: JSON.stringify(geolocation),
          ...profile
        }
      }
    ],
    account,
    password
  )
}

const addSponsor = (account, password, { name, geolocation, ...profile }) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: CONTRACT_NAME,
        name: 'addsponsor',
        data: {
          account,
          sponsor_name: name,
          location: JSON.stringify(geolocation),
          ...profile,
          community_asset: COMMUNITY_ASSET
        }
      }
    ],
    account,
    password
  )
}

const getDonor = async (account) => {
  const { rows = [] } = await eosUtil.getTableRows({
    scope: CONTRACT_NAME,
    code: CONTRACT_NAME,
    table: 'donors',
    table_key: 'account',
    limit: 1,
    lower_bound: account,
    upper_bound: account
  })

  return rows.length > 0 ? rows[0] : null
}

const getLifebank = async (account) => {
  const { rows = [] } = await eosUtil.getTableRows({
    scope: CONTRACT_NAME,
    code: CONTRACT_NAME,
    table: 'lifebanks',
    table_key: 'account',
    limit: 1,
    lower_bound: account,
    upper_bound: account
  })

  return rows.length > 0 ? rows[0] : null
}

const getComunity = async (symbol) => {
  const { rows = [] } = await eosUtil.getTableRows({
    scope: CONTRACT_NAME,
    code: CONTRACT_NAME,
    table: 'community',
    table_key: 'symbol',
    limit: 1,
    lower_bound: symbol,
    upper_bound: symbol
  })

  return rows.length > 0 ? rows[0] : null
}

const getSponsor = async (account) => {
  const { rows = [] } = await eosUtil.getTableRows({
    scope: CONTRACT_NAME,
    code: CONTRACT_NAME,
    table: 'sponsors',
    table_key: 'account',
    limit: 1,
    lower_bound: account,
    upper_bound: account
  })

  return rows.length > 0 ? rows[0] : null
}

const getUserNetworks = async (user) => {
  const { rows = [] } = await eosUtil.getTableRows({
    scope: CONTRACT_NAME,
    code: CONTRACT_NAME,
    table: 'network',
    table_key: 'user',
    lower_bound: user,
    upper_bound: user
  })

  if (rows.length < 1) {
    return [{ community: COMMUNITY_ASSET.replace(' ', ',') }]
  }

  return rows
}

module.exports = {
  addDonor,
  addLifebank,
  addSponsor,
  getDonor,
  getLifebank,
  getSponsor,
  getComunity,
  getUserNetworks,
  upLifebank
}

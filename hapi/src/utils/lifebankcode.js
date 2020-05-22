const eosUtil = require('./eos')

const adddonor = (account, password, { fullname }) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: 'lifebankcode', // @todo: use ENV
        name: 'adddoner',
        data: {
          account,
          doner_name: fullname
        }
      }
    ],
    account,
    password
  )
}

const addSponsor = (account, password, payload) => {
  return eosUtil.transact(
    [
      {
        authorization: [
          {
            actor: account,
            permission: 'active'
          }
        ],
        account: 'lifebankcode', // @todo: use ENV
        name: 'addsponsor',
        data: {
          account,
          sponsor_name: payload.sponsorName,
          covid_impact: payload.covidImpact,
          benefit_description: payload.benefitDescription,
          website: payload.website,
          telephone: payload.telephone,
          bussines_type: payload.bussinesType,
          schedule: payload.schedule
        }
      }
    ],
    account,
    password
  )
}

module.exports = {
  adddonor,
  addSponsor
}

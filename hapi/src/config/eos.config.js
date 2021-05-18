module.exports = {
  apiUrl: process.env.HAPI_EOS_API_ENDPOINT,
  chainId: process.env.HAPI_EOS_API_CHAIN_ID,
  baseAccount: process.env.HAPI_EOS_BASE_ACCOUNT,
  baseAccountPassword: process.env.HAPI_EOS_BASE_ACCOUNT_PASSWORD,
  walletUrl: process.env.HAPI_EOS_WALLET_URL,
  lifebankCodeContractName: process.env.LIFEBANKCODE_CONTRACTNAME,
  lifebankCoinContractName: process.env.LIFEBANKCOIN_CONTRACTNAME,
  consent2LifeContractName: process.env.CONSENT2LIFE_CONTRACTNAME,
  mailApproveLifebank: process.env.HAPI_MAIL_APPROVE_LIFEBANK,
  communityAsset: process.env.COMMUNITY_ASSET
}

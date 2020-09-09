## Life Token Contract [lifebankcoin](https://github.com/eoscostarica/lifebank/tree/master/contracts/lifebankcoin)

Donation Centers Verify Blood Donation (mint and transfer tokens)
Donation Center Account must verify that action of donating blood was completed , once a donor donates blood he/she will receive a token

> `donor` account type receives token from `clinic` account type and may ONLY transfer token to `sponsor` account types.

The Smart Contract is code deployed under the account [lifebankcoin](https://jungle3.bloks.io/account/lifebankcoin).

### Set a max yearly supply of life tokens per community to avoid abuse of blood demand level.

A community may agree to set a limit cap on the supply of active community life tokens a community can have outstanding at any given time to avoid abuse of blood demand levels. This can be done at the creation of the community or updated periodically by the community donation centers?

(should be a constant somewhere in the code)

### Transfer Life Tokens between users.

- A LifeBank can only transfer to an eligible life donor
- An eligible life donor can only transfer to a sponsor
- A sponsor can retain a life token as `savings` , savings may be useful in a future version of the app.

### Life Token Flow:

LifeBank -> LifeDonors -> LifeSponsors -> Savings

### token contract actions:

#### Create a new currency

When a new community is created a new EOSIO Token is configured with the following:

- max supply
- expiration

#### Mint new donation tokens receipts (Life Tokens)

- A like token will only be issued by a LifeBank
- A Life Token can only be transferred to the same user once every 3 months
- After expiry, a Life Token becomes non-transferrable and cannot be redeemed.

#### Blood Demand Level

Each LifeBank may update their status to one of the below demand levels. This indicates the amount of life tokens they are willing to mint at a particular location and time.

- **Green** 1 LifeToken is issued to each donor for a qualified blood donation
- **Yellow** 2 LifeToken issued to each donor for a qualified blood donation
- **Red** 3 LifeToken issued to each donor for a qualified blood donation

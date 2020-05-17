## Smart Contracts
There are three smart contracts deployed by lifebank.

### Informed Consent Contract [`consent2life`](https://github.com/eoscostarica/lifebank/tree/master/contracts/consent2life)
- Each user must accept terms of service
- Users must also have a way of revoking their consent.
- Ricardian Clauses must be included

The  Smart Contract is code deployed under the account [consent2life](https://jungle.bloks.io/account/consent2life).  

### Community Contract `lifebankcode`
A community represents one or more  **blood banks** in a given region. A community must have at least one clinic, upon creating a community you must then register a clinic. Each community has its own token symbol name.

The  Smart Contract is code deployed under the account [lifebankcode](https://jungle.bloks.io/account/lifebankcode).  


### Community Contract `lifebankcoin`

Clinics Verify Blood Donation (mint and transfer tokens)
Clinic Account must verify that action of donating blood was completed , once a donor donates blood he/she will receive a token 

> `donor` account type receives token from `clinic` account type and may ONLY transfer token to `sponsor` account types.

The  Smart Contract is code deployed under the account [lifebankcoin](https://jungle.bloks.io/account/lifebankcoin).

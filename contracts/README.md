# Smart Contracts

There are three smart contracts deployed by lifebank.  

  - [Informed Consent Contract `consent2life`](#informed-consent-contract-consent2life)
  - [Community Contract `lifebankcode`](#community-contract-lifebankcode)
  - [Community Token Contract `lifebankcoin`](#community-token-contract-lifebankcoin)

## Informed Consent Contract [consent2life](https://github.com/eoscostarica/lifebank/tree/master/contracts/consent2life)
- Each donor must accept terms of use
- Each donation center must accept terms of participation
- Each local business must accept terms of participation
- All users must also have a way of revoking their consent.
- Ricardian Clauses must be included for each terms of service consent.


The  Smart Contract is code deployed under the account [consent2life](https://jungle.bloks.io/account/consent2life).  

## Community Contract [lifebankcode](https://github.com/eoscostarica/lifebank/tree/master/contracts/lifebankcode)
A community represents one or more  **blood banks** in a given region. A community must have at least one clinic, upon creating a community you must then register a clinic. Each community has its own token symbol name.

Only registered donation centers can invite new donation centers in the same region to join the same community.

The  Smart Contract is code deployed under the account [lifebankcode](https://jungle.bloks.io/account/lifebankcode).  

### **Create a community**

A community represents one or more **community donation centers** **(CDC)** in a given region.

**A community has :**

- token symbol name
- country


### Register as a Community Donation Center (CDC)

**CDCs Verify Qualified Blood Donations (mint and transfer tokens)**

A community donation center (CDC) account must verify that a qualified blood donation (QBD) was completed. Once a eligible donor user donates blood, they will receive a community donation token receipt (cDTR)

A CDC must have :

- name
- description
- location
- phone number
- schedule
- blood demand level
- signed terms of participation
- eligibility requirements to donate at that location? (General Eligibility Quiz)
- immunity test?
- blood inventory?


**CDCs Verify Qualified Blood Donations (mint and transfer tokens)**

A community donation center (CDC) account must verify that a qualified blood donation (QBD) was completed. Once a eligible donor user donates blood, they will receive a community donation token receipt (cDTR)

Donor account type receives token from donation center account type and may ONLY transfer token to sponsor account types.

### Register as a Eligible Donor User (EDU)

Donors must have:

- name (email?)
- accountname
- Signed terms of use as informed consent

CDC will manage all personal data and no personal data is stored with Lifebank or the blockchain.

### Register as a Participating Local Business (PLB)

A Business must have:

- business name
- description of value proposition
- business website
- location
- schedule
- covid impact?

## Community Token Contract [lifebankcoin](https://github.com/eoscostarica/lifebank/tree/master/contracts/lifebankcoin)

Clinics Verify Blood Donation (mint and transfer tokens)
Clinic Account must verify that action of donating blood was completed , once a donor donates blood he/she will receive a token 

> `donor` account type receives token from `clinic` account type and may ONLY transfer token to `sponsor` account types.

The  Smart Contract is code deployed under the account [lifebankcoin](https://jungle.bloks.io/account/lifebankcoin).

### Set a max yearly supply of DTRs per community to avoid abuse of blood demand level.

A community may agree to set a limit cap on the supply of active community DTRs a community can have outstanding at any given time to avoid abuse of blood demand levels.  This can be done at the creation of the community or updated periodically by the community donation centers? 

(should be a constant somewhere in the code)

### Transfer DTR between users.

- A community donation centers (CDC) can only transfer to an eligible donor user (EDU)
- An eligible donor user (EBU) can only transfer to a participating local business (PLB)
- A participating local business (PLB) can retain a DTR as `savings` , savings may be useful in a future version of the app.

### Token Flow:

Donation Center (CDC) -> Donors (EDU) -> Sponsors (PLB) -> Savings

### token contract actions:

#### Create a new currency

When a new community is created a new EOSIO Token is configured with the following:

- max supply
- expiration

#### Mint new donation tokens receipts (DTR)

- A DTR will only be issued by a community donation center (CDC)
- A DTR can only be transferred to the same user once every 3 months
- After expiry, a DTR becomes non-transferrable and cannot be redeemed.

#### Blood Demand Level

Each CDC may update their status to one of the below demand levels. This indicates the amount of DTRs they are willing to mint at a particular location and time.

- **Green** 1 DTR is issued to each donor for a qualified blood donation
- **Yellow** 2 DTR issued to each donor for a qualified blood donation
- **Red** 3 DTR issued to each donor for a qualified blood donation

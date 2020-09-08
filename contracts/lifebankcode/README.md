# lifebankcode

## Community Contract [lifebankcode](https://github.com/eoscostarica/lifebank/tree/master/contracts/lifebankcode)

A community represents one or more **blood banks** in a given region. A community must have at least one clinic, upon creating a community you must then register a clinic. Each community has its own token symbol name.

Only registered donation centers can invite new donation centers in the same region to join the same community.

The Smart Contract is code deployed under the account [lifebankcode](https://jungle3.bloks.io/account/lifebankcode).

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

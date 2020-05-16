# lifebank
EOSIO Hackathon project

## These are the community smart contract actions :


### Create a  community   (blood bank)
A community represents one or more  **blood banks** in a given region.

**A community has :** 
   - token symbol name   
   - country
   
A community must have at least one clinic, upon creating a community you must then register a clinic.

### Clinics Verify Blood Donation (mint and transfer tokens)
Clinic Account must verify that action of donating blood was completed , once a donor donates blood he/she will receive a token 

> `donor` account type receives token from `clinic` account type and may  ONLY transfer token to `sponsor` account types.

#### Token Flow: 
Clinic -> User -> Sponsor -> Savings  

**A clinic has :** 
   - clinic name
   - clinic description
   - clinic location
   - clinic phone number
   - clinic schedule
   - immunity test?
   - blood urgency level

The community is composed of the **clinic** the **donors** , and the small business that **sponsor** the community.

_Note: maybe clinics can then add new clinics within the same community?_

## Sign Up

Users sign up on the register page. 

The register page creates a blockchain account and should help handle  key management, all users need to remember is a an account name and 4 digit PIN
 
### Register as a donor  (individual person)

donors must have:
 - name
 - accountname
 - Informed Consent

 
Clinic will manage all personal data and no personal data is stored on blockchain.


###  Register as a sponsor   (small business)
- sponsor name
- covid impact 
- description of benefit
- sponsor website
- telephone
- type 
- schedule


#### Informed Consent Smart Contact

- Each user must accept terms of service
- Users must also have a way of revoking their consent.
- Ricardian Clauses must be included

## These are the following token contract actions:

### Create a new currency 
When a community is create a new  EOSIO Token is configured. 
- max supply 
- expiration 

### Mint new compatible tokens
 - Tokes must only be issued by clinics
 - Tokens can only be issued for the same user once every 3 months.

#### Blood Demand Level

 - **Green** 1 token is issued to each doner 
 - **Yellow** 2 tokens issued to each doner
 - **Red**  3 tokens issued to each doner

### Max yearly supply of tokens per clinic to avoid abuse of bloood demand level.

(should be a constant somewhere in the code)

### Transfer compatible tokens between users.
- clinics can only transfer to doners 
- doners can only transfer to sponsors
- sponsors retain tokens as `savings` , savings may be useful in a future version of the app.

Optional:
### Set expiry options to a given token


## UX

### Users


### Clininc User Flow
https://zpl.io/amAMKdQ

### Blood Donor User Flow 
https://zpl.io/a8o9A7X

### Sponsor User Flow
https://zpl.io/a8o9kq6

#### Pages 
 - landing page
 - register 
 - dashboard 
 - profile 


#### Modals
 - reciept 
 - informed consent
 - 

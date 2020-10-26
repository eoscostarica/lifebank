/*
 * @file
 * @author  (C) 2020 by eoscostarica [ https://eoscostarica.io ]
 * @version 1.1.0
 *

 * @section DESCRIPTION
 *  Header file for the declaration of all functions related with the lifebankcode contract
 *
 * Smart contract lifebankcode for  EOSIO blockchains
 *    WebSite:        https://eoscostarica.io
 *    GitHub:         https://github.com/eoscostarica
 *
 */
#include <eosio/eosio.hpp>
#include <eosio/transaction.hpp>
#include <eosio/asset.hpp>
#include <eosio/crypto.hpp>

#include <lifebankcoin.hpp>

using namespace std;
using namespace eosio;

CONTRACT lifebankcode : public contract
{
public:
  using contract::contract;

  /**
   *
   *  This action unsubscribe an user form a community
   *
   * @param user - the user account name,
   * @param community_asset - Symbol ex: 1 SYS , 1 BLOOD
   *
   * @pre community's symbol must exits
   *
   */
  ACTION unsubscribe(name user, eosio::asset community_asset);

  /**
   *
   *  creates a community
   *
   * @param community_name - The name of the comunity
   * @param community_asset - Symbol ex: 1 SYS , 1 BLOOD
   * @param description - Community description
   * @param logo - Community log
   * @param maximum_supply - Maximun value of the community's asset
   *
   * @pre community's symbol must exits
   *
   */
  ACTION createcmm(string community_name, eosio::asset community_asset, string description, string logo, const asset &maximum_supply);

  /**
   *
   *  Liks a user within a community
   *
   * @param community_asset - Symbol ex: 1 SYS , 1 BLOOD
   * @param new_user - The user account name,
   *
   * @pre Community's symbol must exits
   *
   */
  ACTION link(eosio::asset community_asset, eosio::name new_user);

  /**
   *
   *  Saves the info related with a donor within a community
   *
   * @param account - The user account name,
   * @param community_asset - Symbol ex: 1 SYS , 1 BLOOD
   *
   * @pre community's symbol must exits
   *
   */
  ACTION adddonor(eosio::name account, eosio::asset community_asset);

  /**
   *
   *  Saves the info related with a lifebank within a community
   *
   * @param account - The user account name,
   * @param lifebank_name - The name of the life bank
   * @param description - Life bank's description
   * @param address - Life bank's address
   * @param location - Life banks's location latitud,logitud
   * @param phone_number - Life banks' phone_number
   * @param has_immunity_test - TODO:
   * @param blood_urgency_level - TODO:
   * @param schedule - Life banks's schedule
   * @param community_asset - Symbol ex: 1 SYS , 1 BLOOD
   * @param email - Life bank's email
   *
   * @pre community's symbol must exits
   *
   */
  ACTION addlifebank(eosio::name account, string lifebank_name,
                     string description, string address, string location, string phone_number,
                     bool has_immunity_test, uint8_t blood_urgency_level, string schedule, eosio::asset community_asset, string email);

  /**
   *
   *  TODO: que hace uplifebank???
   *
   * @param account - The user account name,
   * @param lifebank_name - The name of the life bank
   * @param description - Life bank's description
   * @param address - Life bank's address
   * @param location - Life banks's location latitud,logitud
   * @param phone_number - Life banks' phone_number
   * @param has_immunity_test - TODO:
   * @param blood_urgency_level - TODO:
   * @param schedule - Life banks's schedule
   * @param community_asset - Symbol ex: 1 SYS , 1 BLOOD
   * @param email - Life bank's email
   *
   * @pre community's symbol must exits
   *
   */
  ACTION uplifebank(
      eosio::name account,
      string lifebank_name,
      string about,
      string address,
      string location,
      string telephones,
      bool has_immunity_test,
      uint8_t blood_urgency_level,
      string schedule,
      eosio::asset community_asset,
      string email,
      string photos,
      string logo_url,
      string social_media_links);

  /**
   *
   *  Saves the info related with a sponsor within a community
   *
   * @param account - The user account name,
   * @param sponsor_name - The name of sponsor
   * @param covid_impact - covid impact
   * @param benefit_description - Sponsor benefit description
   * @param website - Sponsor's website
   * @param telephones - Sponsor's phone_numbers
   * @param business_type - Sponsor business_type
   * @param schedule - Sponsor's schedule
   * @param email - Sponsor's email
   * @param community_asset - Symbol ex: 1 SYS , 1 BLOOD
   * @param location - Sponsor's location:
   * @param address - Sponsor address
   * @param logo_url - Sponsor logo
   * @param about - Sponsor about
   * @param social_media_links - Sponsor social media links
   * @param photos - Sponsor photos
   * @pre community's symbol must exits
   *
   */
  ACTION addsponsor(
      eosio::name account,
      string sponsor_name,
      string covid_impact,
      string benefit_description,
      string website,
      string telephones,
      string business_type,
      string schedule,
      string email,
      eosio::asset community_asset,
      string location,
      string address,
      string logo_url,
      string about,
      string social_media_links,
      string photos);

  /**
   *
   *  Clear all data in all constact's tables
   *
   */
  ACTION clear();

private:
  /**
   *
   *  Creates a new token
   *
   * @param issuer - The issuer's name,
   * @param maximum_supply -  Maximun value of the community's asset
   *
   */
  void create_token(const name &issuer,
                    const asset &maximum_supply)
  {
    lifebankcoin::create_action create_new_token("lifebankcoin"_n, {get_self(), "active"_n});
    create_new_token.send(issuer, maximum_supply);
  }

  /**
   *
   *  Verify is an account has consent
   *
   * @param account - The user account name
   *
   * @return true is the account has a consent, otherwise returns false
   */
  void check_consent(eosio::name account);

  /**
   *
   *  Verify is an account is a donor
   *
   * @param account - The user account name
   *
   * @return true is the account is a donor, otherwise returns false
   */
  bool is_donor(name account);

  /**
   *
   *  Verify is an account is a sponsor
   *
   * @param account - The user account name
   *
   * @return true is the account is a sponsor, otherwise returns false
   */
  bool is_sponsor(name account);

  /**
   *
   *  Verify is an account is a lifebank
   *
   * @param account - The user account name
   *
   * @return true is the account is a lifebank, otherwise returns false
   */
  bool is_lifebank(name account);

  /**
   *
   *  TODO:
   *
   * @return the tx id with sha256 format
   */
  checksum256 get_tx();

  /*
  *
  *  Table to store community data
  */
  TABLE community
  {
    eosio::symbol symbol;

    eosio::name creator;
    string community_name;
    string description;
    string logo;

    uint64_t primary_key() const { return symbol.raw(); };

    EOSLIB_SERIALIZE(community,
                     (symbol)(creator)(community_name)(description)(logo));
  };

  typedef eosio::multi_index<eosio::name{"community"}, community> communities_table;

  /*
  *
  *  Table to store relationship between users and communities 
  */
  TABLE network
  {
    uint64_t id;

    eosio::symbol community;
    eosio::name user;

    uint64_t primary_key() const { return id; }
    uint64_t users_by_community() const { return community.raw(); }

    EOSLIB_SERIALIZE(network,
                     (id)(community)(user));
  };

  typedef eosio::multi_index<eosio::name("network"),
                             network,
                             eosio::indexed_by<eosio::name{"usersbycmm"},
                                               eosio::const_mem_fun<network, uint64_t, &network::users_by_community>>>
      networks_table;
  /*
  *
  *  Table to store data realted with donors
  */
  TABLE donor
  {
    eosio::name account;
    checksum256 tx;
    auto primary_key() const { return account.value; }
    EOSLIB_SERIALIZE(donor,
                     (account)(tx));
  };
  typedef multi_index<name("donors"), donor> donors_table;

  /*
  *
  *  Table to store data realted with lifebanks
  */
  TABLE lifebank
  {
    eosio::name account;
    eosio::symbol community;
    uint8_t blood_urgency_level;
    checksum256 tx;
    auto primary_key() const { return account.value; }
    EOSLIB_SERIALIZE(lifebank,
                     (account)(community)(blood_urgency_level)(tx));
  };
  typedef multi_index<name("lifebanks"), lifebank> lifebanks_table;

  /*
  *
  *  Table to store data realted with sponsors
  */
  TABLE sponsor
  {
    eosio::name account;

    checksum256 tx;
    auto primary_key() const { return account.value; }
    EOSLIB_SERIALIZE(sponsor,
                     (account)(tx));
  };
  typedef multi_index<name("sponsors"), sponsor> sponsors_table;
};

constexpr eosio::name consent_account{"consent2life"_n};

/*
*
*  Table to store data realted with consents
*/
struct informed_consent
{
  uint64_t id;

  checksum256 record;
  eosio::name user;
  eosio::name contract;
  checksum256 hash;
  EOSLIB_SERIALIZE(informed_consent,
                   (id)(record)(user)(contract)(hash));
  auto primary_key() const { return id; }
  checksum256 get_record() const { return record; }
  checksum256 get_hash() const { return hash; }
};

typedef eosio::multi_index<eosio::name("userconsents"), informed_consent,
                           indexed_by<eosio::name("singlerecord"), const_mem_fun<informed_consent, checksum256, &informed_consent::get_record>>,
                           indexed_by<eosio::name("byhash"), const_mem_fun<informed_consent, checksum256, &informed_consent::get_hash>>>
    informed_consents_table;

/**
  *
  *  Uility function for format a string to hash format
  *
  * @param input - The string to convert to sha256
  *
  * @return a sha256 value
  */
checksum256 string_to_hash(const string &input)
{
  return sha256(input.c_str(), input.size());
}

/**
  *
  *  Verify if a account has  a consent
  *
  * @param account - The name of the account
  * @param contract - The name of the contract
  *
  * @return true if the account has consent, otherwise returns false
  */
bool has_consent(eosio::name account, eosio::name contract)
{
  informed_consents_table _records(consent_account, consent_account.value);
  auto single_record = string_to_hash(account.to_string() + contract.to_string());
  auto single_record_index = _records.get_index<name("singlerecord")>();
  auto existing_record = single_record_index.find(single_record);
  return existing_record != single_record_index.end();
}

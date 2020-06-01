/*
 * @file
 * @author  (C) 2020 by eoscostarica [ https://eoscostarica.io ]
 * @version 1.1.0
 *

 * @section DESCRIPTION
 *  Header file for the declaration of all functions related with the consent2life contract
 *
 * Smart contract consent2life for  EOSIO blockchains
 *    WebSite:        https://eoscostarica.io
 *    GitHub:         https://github.com/eoscostarica
 *
 */
#include <eosio/eosio.hpp>
#include <eosio/crypto.hpp>

using namespace std;
using namespace eosio;

CONTRACT consent2life : public contract
{
public:
  using contract::contract;
  /**
   *
   *  This action stores a consent within the table userconsents
   *
   * @param user - the user account name,
   * @param contract - the name of the contract,
   * @param hash - the hash(user+name)
   *
   * @pre the hash is calculated with the concatenation of usercontrac as impot
   * 
   * @memo  a tool to calculate the hash http://emn178.github.io/online-tools/sha256.html
   */
  ACTION consent(name user, name contract, checksum256 hash);

  /**
   *
   *  This action remove a consent from the table userconsents
   *
   * @param user - the user account name,
   * @param contract - the name of the contract,
   *
   */
  ACTION revoke(name user, name contract);

  /**
   *
   *  Clear the content of the table userconsents
   *
   */
  ACTION clear();

private:
  static checksum256 string_to_hash(const string &input);

  /*
  * Stores the data related with users' consent
  */
  TABLE informed_consent
  {
    uint64_t id;
    checksum256 record;
    name user;
    name contract;
    checksum256 hash;
    EOSLIB_SERIALIZE(informed_consent,
                     (id)(record)(user)(contract)(hash));
    auto primary_key() const { return id; }
    checksum256 get_record() const { return record; }
    checksum256 get_hash() const { return hash; }
  };
  typedef multi_index<name("userconsents"), informed_consent,
                      indexed_by<name("singlerecord"), const_mem_fun<informed_consent, checksum256, &informed_consent::get_record>>,
                      indexed_by<name("byhash"), const_mem_fun<informed_consent, checksum256, &informed_consent::get_hash>>>
      informed_consent_table;
};

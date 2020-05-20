#include <eosio/eosio.hpp>
#include <eosio/transaction.hpp>
#include <eosio/asset.hpp>

using namespace std;
using namespace eosio;

CONTRACT lifebankcode : public contract
{
public:
  using contract::contract;

  ACTION createcmm(eosio::name creator, eosio::asset cmm_asset, string description, string logo);
  ACTION link(eosio::asset cmm_asset, eosio::name inviter, eosio::name new_user);

  ACTION adddoner(eosio::name account, string fullname);
  ACTION addclinic(eosio::name account, string clinic_name,
                   string description, string address, string location, string phone_number,
                   bool has_immunity_test, uint8_t blood_urgency_level);
  ACTION addsponsor(eosio::name account, string fullname);
  ACTION clear();

private:
  void check_consent(eosio::name account);
  checksum256 get_tx();

  TABLE community
  {
    eosio::symbol symbol;

    eosio::name creator;
    string logo;
    string name;
    string description;

    uint64_t primary_key() const { return symbol.raw(); };

    EOSLIB_SERIALIZE(community,
                     (symbol)(creator)(logo)(name)(description));
  };

  TABLE network
  {
    uint64_t id;

    eosio::symbol community;
    eosio::name user;

    uint64_t primary_key() const { return id; }
    uint64_t users_by_cmm() const { return community.raw(); }

    EOSLIB_SERIALIZE(network,
                     (id)(community)(user));
  };

  TABLE doner
  {
    eosio::name account;

    checksum256 tx;
    auto primary_key() const { return account.value; }
    EOSLIB_SERIALIZE(doner,
                     (account)(tx));
  };
  typedef multi_index<name("doners"), doner> doner_table;

  TABLE clinic
  {
    eosio::name account;

    checksum256 tx;
    auto primary_key() const { return account.value; }
    EOSLIB_SERIALIZE(clinic,
                     (account)(tx));
  };
  typedef multi_index<name("clinics"), clinic> clinic_table;

  TABLE sponsor
  {
    eosio::name account;

    checksum256 tx;
    auto primary_key() const { return account.value; }
    EOSLIB_SERIALIZE(sponsor,
                     (account)(tx));
  };
  typedef multi_index<name("sponsors"), sponsor> sponsor_table;
};

constexpr eosio::name consent_account{"consent2life"_n};

struct informed_consent
{
  uint64_t id;

  uint128_t record;
  eosio::name user;
  eosio::name contract;
  checksum256 hash;
  EOSLIB_SERIALIZE(informed_consent,
                   (id)(record)(user)(contract)(hash));
  auto primary_key() const { return id; }
  uint128_t get_record() const { return record; }
  checksum256 get_hash() const { return hash; }
};

typedef multi_index<name("userconsents"), informed_consent,
                    indexed_by<name("singlerecord"), const_mem_fun<informed_consent, uint128_t, &informed_consent::get_record>>,
                    indexed_by<name("byhash"), const_mem_fun<informed_consent, checksum256, &informed_consent::get_hash>>>
    informed_consent_table;

bool has_consent(eosio::name account, eosio::name contract)
{
  informed_consent_table _records(consent_account, consent_account.value);
  auto single_record = (static_cast<uint128_t>(account.value) << 64) | contract.value;
  auto single_record_index = _records.get_index<name("singlerecord")>();
  auto existing_record = single_record_index.find(single_record);
  if (existing_record == single_record_index.end())
  {
    return false;
  }
  return true;
}
#include <eosio/eosio.hpp>
#include <eosio/transaction.hpp>
#include <eosio/asset.hpp>

using namespace std;
using namespace eosio;

CONTRACT lifebankcode : public contract
{
public:
  using contract::contract;

  ACTION createcmm(eosio::name creator, string community_name, eosio::asset community_asset, string description, string logo);
  ACTION link(eosio::asset community_asset, eosio::name inviter, eosio::name new_user);

  ACTION adddoner(eosio::name account, string doner_name, eosio::asset community_asset);
  ACTION addlifebank(eosio::name account, string lifebank_name,
                     string description, string address, string location, string phone_number,
                     bool has_immunity_test, uint8_t blood_urgency_level, string schedule);
  ACTION addsponsor(eosio::name account, string sponsor_name, string covid_impact, string benefit_description,
                    string website, string telephone, string bussines_type, string schedule);
  ACTION clear();

private:
  void check_consent(eosio::name account);
  checksum256 get_tx();

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

  TABLE doner
  {
    eosio::name account;

    checksum256 tx;
    auto primary_key() const { return account.value; }
    EOSLIB_SERIALIZE(doner,
                     (account)(tx));
  };
  typedef multi_index<name("doners"), doner> doners_table;

  TABLE lifebank
  {
    eosio::name account;

    checksum256 tx;
    auto primary_key() const { return account.value; }
    EOSLIB_SERIALIZE(lifebank,
                     (account)(tx));
  };
  typedef multi_index<name("lifebanks"), lifebank> lifebanks_table;

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

typedef eosio::multi_index<eosio::name("userconsents"), informed_consent,
                           indexed_by<eosio::name("singlerecord"), const_mem_fun<informed_consent, uint128_t, &informed_consent::get_record>>,
                           indexed_by<eosio::name("byhash"), const_mem_fun<informed_consent, checksum256, &informed_consent::get_hash>>>
    informed_consents_table;

bool has_consent(eosio::name account, eosio::name contract)
{
  informed_consents_table _records(consent_account, consent_account.value);
  auto single_record = (static_cast<uint128_t>(account.value) << 64) | contract.value;
  auto single_record_index = _records.get_index<name("singlerecord")>();
  auto existing_record = single_record_index.find(single_record);
  if (existing_record == single_record_index.end())
  {
    return false;
  }
  return true;
}

#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT lifebankcode : public contract {
  public:
    using contract::contract;

    ACTION adddoner(name account, string fullname);
    ACTION clear();

  private:
    TABLE doner {
      uint64_t id;
      name     account;
      string   fullname;
      auto primary_key() const { return id; }
    };
    typedef multi_index<name("doners"), doner> doner_table;
};

constexpr name consent_account{"consent2life"_n};

struct informed_consent {
  uint64_t     id;
  uint128_t    record;
  name         user;
  name         contract;
  checksum256  hash;
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

bool has_consent(name account, name contract){
  informed_consent_table _records(consent_account, consent_account.value);
  auto single_record = (static_cast<uint128_t>(account.value) << 64) | contract.value;
  auto single_record_index = _records.get_index<name("singlerecord")>();
  auto existing_record = single_record_index.find(single_record);
  if (existing_record == single_record_index.end()) {
    return false;
  }
  return true;
}
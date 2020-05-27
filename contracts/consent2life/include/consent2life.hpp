#include <eosio/eosio.hpp>
#include <eosio/crypto.hpp>

using namespace std;
using namespace eosio;

CONTRACT consent2life : public contract
{
public:
  using contract::contract;

  ACTION consent(name user, name contract, checksum256 hash);
  ACTION revoke(name user, name contract);
  ACTION clear();

private:
  static checksum256 string_to_hash(const string &input);
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

#include <lifebankcode.hpp>

ACTION lifebankcode::adddoner(name account, string fullname) {
  require_auth(account);
  doner_table _doners(get_self(), get_self().value);
  bool consent = has_consent(account, get_self());
  eosio::check(consent, "Dont have consent");
}

ACTION lifebankcode::clear() {
  require_auth(get_self());
}

EOSIO_DISPATCH(lifebankcode, (adddoner)(clear))

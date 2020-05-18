#include <lifebankcode.hpp>

void lifebankcode::check_consent(name account) {
  bool consent = has_consent(account, get_self());
  eosio::check(consent, "Do not have consent for lifebankcode");
}

ACTION lifebankcode::adddoner(name account, string fullname) {
  require_auth(account);
  check_consent(account);
  doner_table _doners(get_self(), get_self().value);
  eosio::check(fullname.size() <= 64, "name has more than 64 bytes");
  auto doner_itr = _doners.find(account.value);
  if (doner_itr == _doners.end())
  {
    _doners.emplace(get_self(), [&](auto &row) {
      row.account = account;
      row.fullname = fullname;
    });
  }
  else
  {
    _doners.modify(doner_itr, get_self(), [&](auto &row) {
      row.fullname = fullname;
    });
  }
}

ACTION lifebankcode::clear() {
  require_auth(get_self());
}

EOSIO_DISPATCH(lifebankcode, (adddoner)(clear))

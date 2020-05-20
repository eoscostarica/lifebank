#include <lifebankcode.hpp>
#include <eosio/crypto.hpp>

checksum256 lifebankcode::get_tx()
{
  auto s = eosio::read_transaction(nullptr, 0);
  char *tx = (char *)malloc(s);
  read_transaction(tx, s);
  return sha256(tx, s);
}

void lifebankcode::check_consent(name account)
{
  bool consent = has_consent(account, get_self());
  eosio::check(consent, "Do not have consent for lifebankcode");
}

ACTION lifebankcode::adddoner(name account, string fullname)
{
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
      row.tx = get_tx();
    });
  }
  else
  {
    _doners.modify(doner_itr, get_self(), [&](auto &row) {
      row.fullname = fullname;
      row.tx = get_tx();
    });
  }
}

ACTION lifebankcode::addclinic(name account, string fullname)
{
  require_auth(account);
}

ACTION lifebankcode::addsponsor(name account, string fullname)
{
  require_auth(account);
}

ACTION lifebankcode::clear()
{
  // DEV only
  require_auth(get_self());

  doner_table _doners(get_self(), get_self().value);

  auto doners_itr = _doners.begin();
  while (doners_itr != _doners.end())
  {
    doners_itr = _doners.erase(doners_itr);
  }
}

EOSIO_DISPATCH(lifebankcode, (adddoner)(clear))

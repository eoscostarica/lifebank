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
  eosio::check(consent, "Account does not have consent for lifebankcode");
}

ACTION lifebankcode::createcmm(eosio::name creator, eosio::asset cmm_asset, string description, string logo)
{
  require_auth(creator);

  const eosio::symbol new_symbol = cmm_asset.symbol;
}

ACTION lifebankcode::link(eosio::asset cmm_asset, eosio::name inviter, eosio::name new_user)
{
  eosio::check(is_account(new_user), "New user account does not exists");
}

ACTION lifebankcode::adddoner(name account, string doner_name)
{
  require_auth(account);
  check_consent(account);
  doner_table _doners(get_self(), get_self().value);
  eosio::check(doner_name.size() <= 64, "Name has more than 64 bytes");
  auto doner_itr = _doners.find(account.value);
  if (doner_itr == _doners.end())
  {
    _doners.emplace(get_self(), [&](auto &row) {
      row.account = account;
      row.tx = get_tx();
    });
  }
  else
  {
    _doners.modify(doner_itr, get_self(), [&](auto &row) {
      row.tx = get_tx();
    });
  }
}

ACTION lifebankcode::addclinic(eosio::name account, string clinic_name,
                               string description, string address, string location, string phone_number,
                               bool has_immunity_test, uint8_t blood_urgency_level, string schedule)
{
  require_auth(account);
}

ACTION lifebankcode::addsponsor(eosio::name account, string sponsor_name, string covid_impact, string benefit_description,
                                string website, string telephone, string bussines_type, string schedule)
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

EOSIO_DISPATCH(lifebankcode, (createcmm)(link)(adddoner)(addclinic)(addsponsor)(clear))

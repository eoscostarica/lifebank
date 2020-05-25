#include <lifebankcode.hpp>
#include <eosio/crypto.hpp>
#include <utils.hpp>

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

ACTION lifebankcode::createcmm(eosio::name creator, string community_name, eosio::asset community_asset, string description, string logo)
{
  // Only the contract  can create communities at the moment
  require_auth(get_self());
  eosio::check(is_account(creator), "New user account does not exists");

  eosio::check(community_name.size() <= 256, "name has more than 256 bytes");
  eosio::check(description.size() <= 256, "description has more than 256 bytes");
  eosio::check(logo.size() <= 256, "logo has more than 256 bytes");

  const eosio::symbol new_symbol = community_asset.symbol;
  communities_table community(get_self(), get_self().value);
  auto existing_cmm = community.find(new_symbol.raw());
  eosio::check(existing_cmm == community.end(), "symbol already exists");
  community.emplace(get_self(), [&](auto &raw) {
    raw.symbol = new_symbol;
    raw.creator = creator;
    raw.logo = logo;
    raw.community_name = community_name;
    raw.description = description;
  });
}

ACTION lifebankcode::link(eosio::asset community_asset, eosio::name new_user)
{
  eosio::check(is_account(new_user), "New user account does not exists");
  require_auth(new_user);
  eosio::symbol community_symbol = community_asset.symbol;
  communities_table community(get_self(), get_self().value);
  const auto &cmm = community.get(community_symbol.raw(), "can't find any community with given asset");

  auto id = gen_uuid(community_symbol.raw(), new_user.value);
  networks_table network(get_self(), get_self().value);
  auto existing_netlink = network.find(id);
  if (existing_netlink != network.end())
  {
    return;
  }
  network.emplace(get_self(), [&](auto &raw) {
    raw.id = id;
    raw.community = community_symbol;
    raw.user = new_user;
  });
}

ACTION lifebankcode::adddonor(name account, string donor_name, eosio::asset community_asset)
{
  require_auth(account);
  check_consent(account);
  donors_table _donors(get_self(), get_self().value);
  eosio::check(donor_name.size() <= 64, "Name has more than 64 bytes");
  auto donor_itr = _donors.find(account.value);
  if (donor_itr == _donors.end())
  {
    _donors.emplace(get_self(), [&](auto &row) {
      row.account = account;
      row.tx = get_tx();
    });
    SEND_INLINE_ACTION(*this,                            // Account
                       link,                             // Action
                       {account, eosio::name{"active"}}, // Permission
                       {community_asset, account});
    require_recipient(account);
  }
  else
  {
    _donors.modify(donor_itr, get_self(), [&](auto &row) {
      row.tx = get_tx();
    });
  }
}

ACTION lifebankcode::addlifebank(eosio::name account, string lifebank_name,
                                 string description, string address, string location, string phone_number,
                                 bool has_immunity_test, uint8_t blood_urgency_level, string schedule, eosio::asset community_asset)
{
  require_auth(account);
  check_consent(account);
  lifebanks_table _lifebanks(get_self(), get_self().value);
  eosio::check(lifebank_name.size() <= 64, "Name has more than 64 bytes");
  auto lifebank_itr = _lifebanks.find(account.value);
  if (lifebank_itr == _lifebanks.end())
  {
    _lifebanks.emplace(get_self(), [&](auto &row) {
      row.account = account;
      row.tx = get_tx();
    });
    SEND_INLINE_ACTION(*this,                            // Account
                       link,                             // Action
                       {account, eosio::name{"active"}}, // Permission
                       {community_asset, account});
    require_recipient(account);
  }
  else
  {
    _lifebanks.modify(lifebank_itr, get_self(), [&](auto &row) {
      row.tx = get_tx();
    });
  }
}
ACTION lifebankcode::addsponsor(eosio::name account, string sponsor_name, string covid_impact, string benefit_description,
                                string website, string telephone, string bussines_type, string schedule, string email, eosio::asset community_asset)
{
  require_auth(account);
  check_consent(account);
  sponsors_table _sponsors(get_self(), get_self().value);
  eosio::check(sponsor_name.size() <= 64, "Name has more than 64 bytes");
  auto sponsor_itr = _sponsors.find(account.value);
  if (sponsor_itr == _sponsors.end())
  {
    _sponsors.emplace(get_self(), [&](auto &row) {
      row.account = account;
      row.tx = get_tx();
    });
    SEND_INLINE_ACTION(*this,                            // Account
                       link,                             // Action
                       {account, eosio::name{"active"}}, // Permission
                       {community_asset, account});
    require_recipient(account);
  }
  else
  {
    _sponsors.modify(sponsor_itr, get_self(), [&](auto &row) {
      row.tx = get_tx();
    });
  }
}

ACTION lifebankcode::clear()
{
  // DEV only
  require_auth(get_self());

  donors_table _donors(get_self(), get_self().value);

  auto donors_itr = _donors.begin();
  while (donors_itr != _donors.end())
  {
    donors_itr = _donors.erase(donors_itr);
  }

  sponsors_table _sponsors(get_self(), get_self().value);

  auto sponsors_itr = _sponsors.begin();
  while (sponsors_itr != _sponsors.end())
  {
    sponsors_itr = _sponsors.erase(sponsors_itr);
  }

  community_table _community(get_self(), get_self().value);

  auto community_itr = _community.begin();
  while (community_itr != _community.end())
  {
    community_itr = _community.erase(donors_itr);
  }

  network_table _network(get_self(), get_self().value);

  auto network_itr = _network.begin();
  while (network_itr != _network.end())
  {
    network_itr = _network.erase(donors_itr);
  }

  lifebank_table _lifebank(get_self(), get_self().value);

  auto lifebank_itr = _lifebank.begin();
  while (lifebank_itr != _lifebank.end())
  {
    lifebank_itr = _lifebank.erase(donors_itr);
  }
}

EOSIO_DISPATCH(lifebankcode, (createcmm)(link)(adddonor)(addlifebank)(addsponsor)(clear))

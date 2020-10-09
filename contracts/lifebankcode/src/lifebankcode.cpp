#include <lifebankcode.hpp>

bool lifebankcode::is_donor(name account)
{
  donors_table _donors(get_self(), get_self().value);
  auto itr_donors = _donors.find(account.value);
  return itr_donors == _donors.end();
}

bool lifebankcode::is_sponsor(name account)
{
  sponsors_table _sponsors(get_self(), get_self().value);
  auto sponsor_itr = _sponsors.find(account.value);
  return sponsor_itr == _sponsors.end();
}

bool lifebankcode::is_lifebank(name account)
{
  lifebanks_table _lifebanks(get_self(), get_self().value);
  auto lifebank_itr = _lifebanks.find(account.value);
  return lifebank_itr == _lifebanks.end();
}

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

ACTION lifebankcode::createcmm(string community_name, eosio::asset community_asset, string description, string logo, const asset &maximum_supply)
{
  // Only the contract can create communities at the moment
  require_auth(get_self());
  // eosio::check(is_account(creator), "New user account does not exists");

  eosio::check(community_name.size() <= 256, "name has more than 256 bytes");
  eosio::check(description.size() <= 256, "description has more than 256 bytes");
  eosio::check(logo.size() <= 256, "logo has more than 256 bytes");

  const eosio::symbol new_symbol = community_asset.symbol;
  communities_table community(get_self(), get_self().value);
  auto existing_cmm = community.find(new_symbol.raw());
  eosio::check(existing_cmm == community.end(), "symbol already exists");
  community.emplace(get_self(), [&](auto &raw) {
    raw.symbol = new_symbol;
    raw.creator = get_self();
    raw.logo = logo;
    raw.community_name = community_name;
    raw.description = description;
  });
  create_token(get_self(), maximum_supply);
}

ACTION lifebankcode::link(eosio::asset community_asset, eosio::name new_user)
{
  // Only the contract can create create links
  require_auth(get_self());
  eosio::check(is_account(new_user), "New user account does not exists");
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
  require_recipient(new_user);
}

ACTION lifebankcode::adddonor(name account, eosio::asset community_asset)
{
  require_auth(account);
  check_consent(account);

  eosio::check(is_sponsor(account), "Account already belogs to sponsor");
  eosio::check(is_lifebank(account), "Account already belogs to lifebank");

  donors_table _donors(get_self(), get_self().value);
  auto donor_itr = _donors.find(account.value);
  if (donor_itr == _donors.end())
  {
    _donors.emplace(get_self(), [&](auto &row) {
      row.account = account;
      row.tx = get_tx();
    });
    action(
        permission_level{get_self(), "active"_n},
        get_self(),
        "link"_n,
        std::make_tuple(community_asset, account))
        .send();
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
                                 bool has_immunity_test, uint8_t blood_urgency_level, string schedule, eosio::asset community_asset, string email)
{
  require_auth(get_self());
  eosio::check(is_account(account), "New user account does not exists");
  check_consent(account);
  lifebanks_table _lifebanks(get_self(), get_self().value);
  eosio::check(lifebank_name.size() <= 64, "Name has more than 64 bytes");
  eosio::check(blood_urgency_level > 0, "blood urgency level must be positive");
  eosio::check(blood_urgency_level < 4, "blood urgency level is out of range");
  auto lifebank_itr = _lifebanks.find(account.value);
  if (lifebank_itr == _lifebanks.end())
  {
    _lifebanks.emplace(get_self(), [&](auto &row) {
      row.account = account;
      row.community = community_asset.symbol;
      row.blood_urgency_level = blood_urgency_level;
      row.tx = get_tx();
    });
    action(
        permission_level{get_self(), "active"_n},
        get_self(),
        "link"_n,
        std::make_tuple(community_asset, account))
        .send();
  }
  else
  {
    _lifebanks.modify(lifebank_itr, get_self(), [&](auto &row) {
      row.blood_urgency_level = blood_urgency_level;
      row.tx = get_tx();
    });
  }
}

ACTION lifebankcode::uplifebank(eosio::name account, string lifebank_name,
                                string description, string address, string location, string phone_number,
                                bool has_immunity_test, uint8_t blood_urgency_level, string schedule, eosio::asset community_asset, string email)
{
  require_auth(account);
  check_consent(account);
  lifebanks_table _lifebanks(get_self(), get_self().value);
  eosio::check(lifebank_name.size() <= 64, "Name has more than 64 bytes");
  eosio::check(blood_urgency_level > 0, "blood urgency level must be positive");
  eosio::check(blood_urgency_level < 4, "blood urgency level is out of range");
  auto lifebank_itr = _lifebanks.find(account.value);
  if (lifebank_itr != _lifebanks.end())
  {
    _lifebanks.modify(lifebank_itr, get_self(), [&](auto &row) {
      row.blood_urgency_level = blood_urgency_level;
      row.tx = get_tx();
    });
  }
}

ACTION lifebankcode::addsponsor(
  eosio::name account, 
  string sponsor_name, 
  string covid_impact, 
  string benefit_description,
  string website, 
  string telephones, 
  string business_type, 
  string schedule, 
  string email,
  eosio::asset community_asset, 
  string location,
  string address,
  string logo_url,
  string about,
  string social_media_links,
  string photos
)
{
  require_auth(account);
  check_consent(account);

  eosio::check(is_donor(account), "Account already belogs to donor");
  eosio::check(is_lifebank(account), "Account already belogs to lifebank");

  sponsors_table _sponsors(get_self(), get_self().value);
  eosio::check(sponsor_name.size() <= 64, "Name has more than 64 bytes");
  auto sponsor_itr = _sponsors.find(account.value);
  if (sponsor_itr == _sponsors.end())
  {
    _sponsors.emplace(get_self(), [&](auto &row) {
      row.account = account;
      row.tx = get_tx();
    });
    action(
        permission_level{get_self(), "active"_n},
        get_self(),
        "link"_n,
        std::make_tuple(community_asset, account))
        .send();
  }
  else
  {
    _sponsors.modify(sponsor_itr, get_self(), [&](auto &row) {
      row.tx = get_tx();
    });
  }
}

ACTION lifebankcode::unsubscribe(name user, eosio::asset community_asset)
{
  require_auth(user);
  check_consent(user);

  eosio::symbol community_symbol = community_asset.symbol;
  auto id = gen_uuid(community_symbol.raw(), user.value);
  networks_table network(get_self(), get_self().value);
  auto existing_netlink = network.find(id);
  if (existing_netlink == network.end())
  {
    return;
  }
  network.erase(existing_netlink);
  donors_table _donors(get_self(), get_self().value);
  auto itr_donors = _donors.find(user.value);
  if (itr_donors != _donors.end())
  {
    _donors.erase(itr_donors);
  }
  sponsors_table _sponsors(get_self(), get_self().value);
  auto itr_sponsors = _sponsors.find(user.value);
  if (itr_sponsors != _sponsors.end())
  {
    _sponsors.erase(itr_sponsors);
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

  communities_table _community(get_self(), get_self().value);

  auto community_itr = _community.begin();
  while (community_itr != _community.end())
  {
    community_itr = _community.erase(community_itr);
  }

  networks_table _network(get_self(), get_self().value);

  auto network_itr = _network.begin();
  while (network_itr != _network.end())
  {
    network_itr = _network.erase(network_itr);
  }

  lifebanks_table _lifebank(get_self(), get_self().value);

  auto lifebank_itr = _lifebank.begin();
  while (lifebank_itr != _lifebank.end())
  {
    lifebank_itr = _lifebank.erase(lifebank_itr);
  }
}

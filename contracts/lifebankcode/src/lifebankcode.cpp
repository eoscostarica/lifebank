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
  check(consent, "Account does not have consent for lifebankcode");
}

bool lifebankcode::offer_exist(name offer_name)
{
  offers_table _offers(get_self(), get_self().value);

  auto offers_itr = _offers.find(offer_name.value);
  return offers_itr != _offers.end();
}

void lifebankcode::create_token(const name &issuer,
                                const asset &maximum_supply)
{
  lifebankcoin::create_action create_new_token("lifebankcoin"_n, {get_self(), "active"_n});
  create_new_token.send(issuer, maximum_supply);
}

ACTION lifebankcode::createcmm(string community_name, eosio::asset community_asset, string description, string logo, const asset &maximum_supply)
{
  // Only the contract can create communities at the moment
  require_auth(get_self());
  // check(is_account(creator), "New user account does not exists");

  check(community_name.size() <= 256, "name has more than 256 bytes");
  check(description.size() <= 256, "description has more than 256 bytes");
  check(logo.size() <= 256, "logo has more than 256 bytes");

  const eosio::symbol new_symbol = community_asset.symbol;
  communities_table community(get_self(), get_self().value);
  auto existing_cmm = community.find(new_symbol.raw());
  check(existing_cmm == community.end(), "symbol already exists");
  community.emplace(get_self(), [&](auto &raw) {
    raw.symbol = new_symbol;
    raw.creator = get_self();
    raw.logo = logo;
    raw.community_name = community_name;
    raw.description = description;
  });
  create_token(get_self(), maximum_supply);
}

ACTION lifebankcode::link(eosio::asset community_asset, name new_user)
{
  // Only the contract can create create links
  require_auth(get_self());
  check(is_account(new_user), "New user account does not exists");
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

  check(is_sponsor(account), "Account already belogs to sponsor");
  check(is_lifebank(account), "Account already belogs to lifebank");

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

ACTION lifebankcode::addlifebank(
    name account,
    string lifebank_name,
    string about,
    string address,
    string location,
    string telephones,
    bool has_immunity_test,
    uint8_t blood_urgency_level,
    string schedule,
    eosio::asset community_asset,
    string email,
    string photos,
    string logo_url,
    string social_media_links,
    string requirement)
{
  require_auth(get_self());
  check(is_account(account), "New user account does not exists");
  check_consent(account);
  lifebanks_table _lifebanks(get_self(), get_self().value);
  check(lifebank_name.size() <= 64, "Name has more than 64 bytes");
  check(blood_urgency_level > 0, "blood urgency level must be positive");
  check(blood_urgency_level < 4, "blood urgency level is out of range");
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

ACTION lifebankcode::uplifebank(
    name account,
    string lifebank_name,
    string about,
    string address,
    string location,
    string telephones,
    bool has_immunity_test,
    uint8_t blood_urgency_level,
    string schedule,
    eosio::asset community_asset,
    string email,
    string photos,
    string logo_url,
    string social_media_links,
    string requirement)
{
  require_auth(account);
  check_consent(account);
  lifebanks_table _lifebanks(get_self(), get_self().value);
  check(lifebank_name.size() <= 64, "Name has more than 64 bytes");
  check(blood_urgency_level > 0, "blood urgency level must be positive");
  check(blood_urgency_level < 4, "blood urgency level is out of range");
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
    name account,
    string sponsor_name,
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
    string photos)
{
  require_auth(account);
  check_consent(account);

  check(is_donor(account), "Account already belogs to donor");
  check(is_lifebank(account), "Account already belogs to lifebank");

  sponsors_table _sponsors(get_self(), get_self().value);
  check(sponsor_name.size() <= 64, "Name has more than 64 bytes");
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

ACTION lifebankcode::addoffer(
    name offer_name,
    name sponsor_name,
    string category,
    string beginning_date,
    string ending_date,
    asset cost,
    string description,
    string restriction)
{
  require_auth(sponsor_name);
  check_consent(sponsor_name);

  check(is_sponsor(sponsor_name), "Account must be a sponsor");

  offers_table _offers(get_self(), get_self().value);

  auto offers_itr = _offers.find(offer_name.value);
  if (offers_itr == _offers.end())
  {
    // Create row if not exist
    _offers.emplace(get_self(), [&](auto &row) {
      row.offer_name = offer_name;
      row.sponsor_name = sponsor_name;
      row.category = category;
      row.beginning_date = beginning_date;
      row.ending_date = ending_date;
      row.cost = cost;
    });
  }
  else
  {
    // Modify an offer record if it does exists
    _offers.modify(offers_itr, get_self(), [&](auto &row) {
      row.category = category;
      row.beginning_date = beginning_date;
      row.ending_date = ending_date;
      row.cost = cost;
    });
  }
}

ACTION lifebankcode::rmoffer(name offer_name)
{
  require_auth(get_self());

  lifebank_offers_table _lifebank_offers(get_self(), get_self().value);
  auto linkoffers_idx = _lifebank_offers.get_index<name("offername")>();
  auto linkoffers_itr = linkoffers_idx.find(offer_name.value);
  
  check(linkoffers_itr == linkoffers_idx.end(), "Cannot remove an offer if exist a reference to it from another table");

  offers_table _offers(get_self(), get_self().value);

  // Delete a filter records in _offers table
  auto offers_itr = _offers.find(offer_name.value);
  check(offers_itr != _offers.end(), "Offer not found");

  _offers.erase(offers_itr);
}

ACTION lifebankcode::linkoffer(name offer_name, eosio::symbol community)
{
  require_auth(get_self());

  check(offer_exist(offer_name), "Offer not found");

  lifebank_offers_table _lifebank_offers(get_self(), get_self().value);

  auto linkoffers_itr = _lifebank_offers.find(offer_name.value);
  check(linkoffers_itr == _lifebank_offers.end(), "The wish offer already exist");

  _lifebank_offers.emplace(get_self(), [&](auto &row) {
    row.id = _lifebank_offers.available_primary_key();
    row.offer_name = offer_name;
    row.community = community;
  });
}

ACTION lifebankcode::rmlinkoffer(uint64_t id)
{
  require_auth(get_self());

  lifebank_offers_table _lifebank_offers(get_self(), get_self().value);

  // Delete a filter records in _offers table
  auto linkoffers_itr = _lifebank_offers.find(id);
  check(linkoffers_itr != _lifebank_offers.end(), "Offer link not found");

  _lifebank_offers.erase(linkoffers_itr);
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

  offers_table _offers(get_self(), get_self().value);

  auto offers_itr = _offers.begin();
  while (offers_itr != _offers.end())
  {
    offers_itr = _offers.erase(offers_itr);
  }
}

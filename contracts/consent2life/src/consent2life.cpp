#include <consent2life.hpp>

ACTION consent2life::consent(name user, name contract, checksum256 hash)
{
  require_auth(user);

  eosio::check(eosio::is_account(contract), "Account does not exist");

  // Init the _records table
  informed_consent_table _records(get_self(), get_self().value);
  // calculate unique record
  auto single_record = (static_cast<uint128_t>(user.value) << 64) | contract.value;
  // Find the record user _records table
  auto single_record_index = _records.get_index<name("singlerecord")>();
  auto existing_record = single_record_index.find(single_record);

  if (existing_record == single_record_index.end())
  {
    // Create a consent record if it does not exist
    _records.emplace(get_self(), [&](auto &row) {
      row.id = _records.available_primary_key();
      row.record = single_record;
      row.user = user;
      row.contract = contract;
      row.hash = hash;
    });
  }
  else
  {
    // Modify a consent record if it exists
    single_record_index.modify(existing_record, get_self(), [&](auto &row) {
      row.hash = hash;
    });
  }
}

ACTION consent2life::revoke(name user, name contract)
{
  require_auth(user);

  informed_consent_table _records(get_self(), get_self().value);

  // calculate unique record
  auto single_record = (static_cast<uint128_t>(user.value) << 64) | contract.value;

  // Find and delete existing record in _records table
  auto itr = _records.begin();
  while (itr != _records.end())
  {
    if (itr->record == single_record)
    {
      itr = _records.erase(itr);
      return;
    }
    else
    {
      itr++;
    }
  }
}

ACTION consent2life::clear()
{
  require_auth(get_self());

  informed_consent_table _records(get_self(), get_self().value);

  // Delete all records in _records table
  auto consent_itr = _records.begin();
  while (consent_itr != _records.end())
  {
    consent_itr = _records.erase(consent_itr);
  }
}

EOSIO_DISPATCH(consent2life, (consent)(revoke)(clear))

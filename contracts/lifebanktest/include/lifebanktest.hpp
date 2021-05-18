#include <eosio/eosio.hpp>

using namespace std;
using namespace eosio;

CONTRACT lifebanktest : public contract {
  public:
    using contract::contract;

    ACTION hi(name from, string message, string message2);
    ACTION clear();

  private:
    TABLE messages {
      name    user;
      string  text;
      auto primary_key() const { return user.value; }
    };
    typedef multi_index<name("messages"), messages> messages_table;
};

//
//  main.cpp
//  hello-world
//
//  Created by Manh Vu on 4/4/18.
//  Copyright © 2018 Manh Vu. All rights reserved.
//

#include <iostream>
using std::string;

static uint64_t char_to_symbol( char c ) {
   if( c >= 'a' && c <= 'z' )
      return (c - 'a') + 6;
   if( c >= '1' && c <= '5' )
      return (c - '1') + 1;
   return 0;
}

// Each char of the string is encoded into 5-bit chunk and left-shifted
// to its 5-bit slot starting with the highest slot for the first char.
// The 13th char, if str is long enough, is encoded into 4-bit chunk
// and placed in the lowest 4 bits. 64 = 12 * 5 + 4
static uint64_t string_to_name( const char* str )
{
   uint64_t name = 0;
   int i = 0;
   for ( ; str[i] && i < 12; ++i) {
       // NOTE: char_to_symbol() returns char type, and without this explicit
       // expansion to uint64 type, the compilation fails at the point of usage
       // of string_to_name(), where the usage requires constant (compile time) expression.
        name |= (char_to_symbol(str[i]) & 0x1f) << (64 - 5 * (i + 1));
    }

   // The for-loop encoded up to 60 high bits into uint64 'name' variable,
   // if (strlen(str) > 12) then encode str[12] into the low (remaining)
   // 4 bits of 'name'
   if (i == 12)
       name |= char_to_symbol(str[12]) & 0x0F;
   return name;
}

uint64_t hashString(string str) {
    uint64_t hash = 5381;
    char c;
    auto s = str.c_str();
    
    while ((c = *s++)) {
        hash = ((hash << 5) + hash) + c;
    }
    
    return hash;
}

static uint64_t hashString2(string str_ ) {
    auto str = str_.c_str();
    uint32_t len = 0;
    while( str[len] ) ++len;
    
    uint64_t value = 0;
    
    for( uint32_t i = 0; i <= 64; ++i ) {
        uint64_t c = 0;
        if( i < len ) c = uint64_t(str[i]);
        
        if( i < 12 ) {
            c &= 0x1f;
            c <<= 64-5*(i+1);
        }
        else {
            c &= 0x0f;
        }
        
        value |= c;
    }
    
    return value;
}

int main(int argc, const char * argv[]) {
    // insert code here...
    std::cout << "Hello, World!\n";
    string text[] = {
        "eosio",
        "eosio.msig",
        "eosio.token",
        "_endl_"
    };
    auto p = text;
    string t;
    t = *p;
    
    while (t != "_endl_") {
        std::cout << "---- " << hashString(t) << std::endl;
        p++;
        t = *p;
    };
    
    std::cout << "---- ----" << std::endl;
    
    p = text;
    t = *p;
    while (t != "_endl_") {
        std::cout << "---- " << string_to_name(t.c_str()) << std::endl;
        p++;
        t = *p;
    };
    
    return 0;
}

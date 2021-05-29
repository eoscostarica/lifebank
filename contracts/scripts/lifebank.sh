#!/usr/bin/env bash
# Local .env
if [ -f ../../.env ]; then
    # Load Environment Variables
    export $(cat ../../.env | grep -v '#' | awk '/=/ {print $1}')
fi
set -e
unlock_lifebank_wallet() {
    echo 'Unlocking Wallet...'
    cleos wallet unlock -n lifebank --password $(cat ./secrets/lifebank_wallet_password.txt) ||
        echo "Wallet has already been unlocked..."
}
create_lifebank_wallet() {
    echo 'Creating Wallet...'
    cleos wallet create -n lifebank --to-console |
        awk 'FNR > 3 { print $1 }' |
        tr -d '"' \
            >./secrets/lifebank_wallet_password.txt
    cleos wallet open -n lifebank
    unlock_lifebank_wallet
    cleos wallet import -n lifebank --private-key $EOS_PRIV_KEY
}
create_lifebank_accounts() {
    echo 'Creating Lifebank Accounts...'
    lifebank_accounts=(
        "consent2life"
        "lifebankcode"
        "lifebankcoin"
        "lbacccreator"
        "sponsprueba1"
        "donorprueba1"
        "12letterlife"
    )
    for account in "${lifebank_accounts[@]}"; do
        echo "Creating lifebank account '$account'"
        keys=($(cleos create key --to-console))
        pub=${keys[5]}
        priv=${keys[2]}
        cleos wallet import -n lifebank --private-key $priv
        mkdir -p ./secrets
        echo $pub >./secrets/$account.pub
        echo $priv >./secrets/$account.priv
        cleos -u $EOS_API_URL system newaccount eosio \
            --transfer $account \
            $EOS_PUB_KEY \
            --stake-net "10000 EOS" \
            --stake-cpu "10000 EOS" \
            --buy-ram-kbytes 8192
    done
}
assign_resources() {
    cleos -u $EOS_API_URL get account lbacccreator 
    cleos -u $EOS_API_URL system buyram eosio lbacccreator "10000 EOS"
    cleos -u $EOS_API_URL get account lbacccreator 
    cleos -u $EOS_API_URL transfer eosio lbacccreator "10000000 EOS" "Lifebank initial funding"
}
deploy_lifebank_contracts() {
    echo 'Deploy Consent Contract'
    cleos -u $EOS_API_URL set contract consent2life ../consent2life/ -p consent2life@active -j -s -d
    sleep 2
    echo 'Deploy Code Contract'
    cleos -u $EOS_API_URL set contract lifebankcode ../lifebankcode/ -p lifebankcode@active
    code_pubkey=$(cat ./secrets/lifebankcode.pub)
    cleos -u $EOS_API_URL set account permission lifebankcode active \
        '{
            "threshold":1,
            "keys":[
                {
                    "key":"'$code_pubkey'",
                    "weight":1
                }
            ],
            "accounts": [
                {
                    "permission":{
                        "actor":"lifebankcode",
                        "permission":"eosio.code"
                    },
                    "weight":1
                }
            ]
        }' owner -p lifebankcode
    cleos -u $EOS_API_URL get account lifebankcode
    echo 'Deploy Coin Contract'
    coin_pubkey=$(cat ./secrets/lifebankcoin.pub)
    cleos -u $EOS_API_URL set contract lifebankcoin ../lifebankcoin/ -p lifebankcoin@active
    cleos -u $EOS_API_URL set account permission lifebankcoin active \
        '{
            "threshold":1,
            "keys":[
                {
                    "key":"'$coin_pubkey'",
                    "weight":1
                }
            ],
            "accounts": [
                {
                    "permission":{
                        "actor":"lifebankcoin",
                        "permission":"eosio.code"
                    },
                    "weight":1
                }
            ]
        }' owner -p lifebankcoin
    cleos -u $EOS_API_URL get account lifebankcoin
}
consent() {
    echo 'Consent to Contracts'
    cleos -u $EOS_API_URL push action consent2life consent '{"user": "lifebankcode", "contract": "lifebankcoin", "hash":""}' -p lifebankcode@active
    cleos -u $EOS_API_URL push action consent2life consent '{"user": "lifebankcoin", "contract": "lifebankcode", "hash":""}' -p lifebankcoin@active
    cleos -u $EOS_API_URL push action consent2life consent '{"user": "12letterlife", "contract": "lifebankcode", "hash":""}' -p 12letterlife@active
    cleos -u $EOS_API_URL push action consent2life consent '{"user": "sponsprueba1", "contract": "lifebankcode", "hash":""}' -p sponsprueba1@active
    cleos -u $EOS_API_URL push action consent2life consent '{"user": "donorprueba1", "contract": "lifebankcode", "hash":""}' -p donorprueba1@active
}
create_community() {
    echo 'Create Lifebank Community'
    cleos -u $EOS_API_URL push action lifebankcode createcmm \
    '{
        "community_name":"LifeBank Costa Rica",
        "community_asset":"0 LIFE",
        "description":"LifeBank development Instance",
        "logo":"https://raw.githubusercontent.com/eoscostarica/lifebank/master/docs/logos/2-OverWhite-lifebank-logo-v1-may25-2020-01.svg",
        "maximum_supply":"1000000 LIFE"
    }' -p lifebankcode@active
}

register_lifebank() {
    echo 'Register LifeBank'
    cleos -u $EOS_API_URL push action lifebankcode addlifebank \
    '{
        "about": "Salvando vidas",
        "email":"bsSiquirres@mail.com",
        "photos": "[\"https://b122fe8e0b8ea4d16cb3-8420fc0ce05d0ddef095398ad3e98f10.ssl.cf5.rackcdn.com/hospital-trauma-mob.jpg\",\"https://d1lofqbqbj927c.cloudfront.net/monumental/2018/02/19141317/Calderon-Guardia-2.jpg\",\"https://www.ccss.sa.cr/images/hospitales/thumb/9.jpg\"]",
        "account":"12letterlife",
        "address":"siquirres, Limon, Costa Rica",
        "location": "{\"latitude\":10.097867627911938,\"longitude\":-83.50939652646625}",
        "logo_url": "https://static.vecteezy.com/system/resources/previews/001/194/392/non_2x/red-cross-png.png",
        "schedule": "[{\"day\":\"Monday\",\"open\":\"06:00am\",\"close\":\"4:00pm\"},{\"day\":\"Wednesday\",\"open\":\"06:00am\",\"close\":\"4:00pm\"},{\"day\":\"Sunday\",\"open\":\"08:00am\",\"close\":\"10:00am\"}]",
        "telephones": "[\"800-800-100\"]",
        "lifebank_name":"Banco de sangre Siquirres",
        "community_asset":"0 LIFE",
        "has_immunity_test":true,
        "social_media_links":"[]",
        "blood_urgency_level":2,
    }' -p lifebankcode@active
}
register_donor() {
    echo 'Register Donor'
    cleos -u $EOS_API_URL push action lifebankcode adddonor \
    '{
        "account":"donorprueba1",
        "community_asset":"0 LIFE"
    }' -p donorprueba1@active
}
register_sponsor() {
    echo 'Register Sponsor'
    cleos -u $EOS_API_URL push action lifebankcode addsponsor \
    '{
        "account":"sponsprueba1",
        "sponsor_name":"Ferreteria McGyver",
        "covid_impact":"Los clientes le huyen al covid",
        "benefit_description":"10% off toilet seats",
        "website":"https://garberhardware.com/",
        "telephones":"[\"134123\", \"09090032\"]",
        "business_type":"Construction",
        "schedule":"[{\"day\":\"Sunday\",\"open\":\"06:00\",\"close\":\"16:00\"},{\"day\":\"Friday\",\"open\":\"06:00\",\"close\":\"16:00\"},{\"day\":\"Saturday\",\"open\":\"06:00\",\"close\":\"16:00\"}]",
        "email":"garber@lifebank.io",
        "community_asset":"0 LIFE",
        "location":"{\"latitude\":40.746434642148586,\"longitude\":-74.00169825211302}",
        "address": "CQ San Carlos",
        "logo_url": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png",
        "about": "Toilets for free only here",
        "social_media_links": "[{\"name\":\"facebook\",\"url\":\"https://jsonformatter.curiousconcept.com\"},{\"name\":\"instragram\",\"url\":\"https://jsonformatter.curiousconcept.com\"},{\"name\":\"twitter\",\"url\":\"https://jsonformatter.curiousconcept.com\"}]",
        "photos": "[\"https://static.hosteltur.com/app/public/uploads/img/articles/2020/04/10/M_110203_costa-rica.jpg\",\"https://www.larepublica.net/storage/images/2019/07/30/20190730091248.cr-3.jpg\"]"
    }' -p sponsprueba1@active
}

test_token_lifecycle() {
    echo 'Issue token'
    cleos -u $EOS_API_URL action lifebankcoin issue \
    '{
        "lifebank":"12letterlife",
        "to":"donorprueba1",
        "memo":"por donar sangre"
    }' -p 12letterlife@active
    echo 'Donor transfers to sponsor'
    cleos -u $EOS_API_URL push action lifebankcoin transfer \
    '{
        "from":"donorprueba1",
        "to":"sponsprueba1",
        "quantity":"2 LIFE",
        "memo":"por darme un descuento"
    }' -p donorprueba1@active
    echo 'Sponsor transfer to lifebank'
    cleos -u $EOS_API_URL push action lifebankcoin transfer \
    '{
        "from":"sponsprueba1",
        "to":"12letterlife",
        "quantity":"2 LIFE",
        "memo":"para que sigan recibiendo donaciones"
    }' -p sponsprueba1@active
    echo 'Lifebank transfer to lifebank'
    # TO DO : Setup a second LB and transfer
}
clear_tables() {
    echo 'Clear Consent Tables'
    cleos -u $EOS_API_URL push action consent2life clear '' -p consent2life@active
    echo 'Clear Code Tables'
    cleos  -u $EOS_API_URL push action lifebankcode clear '' -p lifebankcode@active
    echo 'Clear Coin Tables'
    cleos -u $EOS_API_URL push action lifebankcoin clear '' -p lifebankcoin@active
}

consent_lacchain() {
  echo 'Consent to Contracts'
  mkdir -p ./stdout/consent
  TEMP_DIR=./stdout/consent

  cleos -u $EOS_API_URL push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
  cleos -u https://writer.eosio.cr push action -j -d -s consent2life consent '{"user": "lifebankcoin", "contract": "lifebankcode", "hash":""}' -p lifebankcoin@active >$TEMP_DIR/tx2.json
  jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
  jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
  cleos -u $EOS_API_URL push transaction $TEMP_DIR/tx4.json -p costarica@writer -p lifebankcode@active
}

create_community_lacchain() {
    echo 'Create Lifebank Community'
    mkdir -p ./stdout/comm
    TEMP_DIR=./stdout/comm

    cleos -u $EOS_API_URL push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://writer.eosio.cr push action -j -d -s lifebankcode createcmm \
    '{
        "community_name":"LifeBank Costa Rica",
        "community_asset":"0 LIFE",
        "description":"LifeBank development Instance",
        "logo":"https://raw.githubusercontent.com/eoscostarica/lifebank/master/docs/logos/2-OverWhite-lifebank-logo-v1-may25-2020-01.svg",
        "maximum_supply":"1000000 LIFE"
    }' -p lifebankcode@active >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u $EOS_API_URL -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p costarica@writer -p lifebankcode@active
}

grant_lifebankcode_permission_in_lifebankcoin() {
    echo 'Create Permission for Lifebankcode in Lifebankcoin'
    mkdir -p ./stdout/permission
    TEMP_DIR=./stdout/permission

    cleos -u $EOS_API_URL push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://writer.eosio.cr set account permission lifebankcoin active permission_lifebankcoin.json owner -j -d -s -p lifebankcoin >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u $EOS_API_URL -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p costarica@writer -p lifebankcoin@active
}

grant_lifebankcode_permission_in_lifebankcode() {
    echo 'Create Permission for Lifebankcode in Lifebankcoin'
    mkdir -p ./stdout/permission
    TEMP_DIR=./stdout/permission

    cleos -u $EOS_API_URL push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://writer.eosio.cr set account permission lifebankcode active permission_lifebankcode.json owner -j -d -s -p lifebankcode >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u $EOS_API_URL -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p costarica@writer -p lifebankcode@active
}

grant_consent2life_permission() {
    echo 'Create Permission for consent2life'
    mkdir -p ./stdout/permission
    TEMP_DIR=./stdout/permission

    cleos -u $HAPI_EOS_API_ENDPOINT push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://writer.eosio.cr set account permission consent2life active permission_consent2life.json owner -j -d -s -p consent2life >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u $HAPI_EOS_API_ENDPOINT -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p costarica@writer -p consent2life@active
}

change_active_permission() {
    echo 'Change Active Permission for Lifebankcoin'
    mkdir -p ./stdout/permission_active
    TEMP_DIR=./stdout/permission_active

    cleos -u $EOS_API_URL push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://lacchain.eosio.cr set account permission lifebankcoin active EOS53M2oyoGpt7oVRNywoASZ1gLXDHJfbNoL6LDXew2CbCtus2Zht -j -d -s -p lifebankcoin@owner >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u $EOS_API_URL -r "Accept-Encoding: identity" push transaction -j -d -s $TEMP_DIR/tx4.json -p costarica@writer -p lifebankcoin@owner >$TEMP_DIR/tx5.json
}

deploy_lifebank_contracts_to_lacchain() {
    echo 'Deploy Smart Contract'
    mkdir -p ./stdout/lifebankcode
    TEMP_DIR=./stdout/lifebankcode

    cleos -u $HAPI_EOS_API_ENDPOINT push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u $HAPI_EOS_API_ENDPOINT set contract lifebankcode -j -d -s ../lifebankcode/ >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u $HAPI_EOS_API_ENDPOINT -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p lifebankcode@active
}

consent_lacchain() {
    echo 'LACChain Consent to Contracts'

    mkdir -p ./stdout/consent2life
    TEMP_DIR=./stdout/consent2life

    cleos -u $EOS_API_URL push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://writer.eosio.cr push action -j -d -s consent2life consent '{"user": "sponsprueba1", "contract": "lifebankcode", "hash":""}' -p sponsprueba1@active >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u $EOS_API_URL -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p costarica@writer -p consent2life@active
}

register_sponsor_lacchain() {
    echo 'Register Sponsor'
    mkdir -p ./stdout/register
    TEMP_DIR=./stdout/register

    cleos -u https://lacchain.eosio.cr push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://writer.eosio.cr push action -j -d -s lifebankcode addsponsor '{}' -p lifebankcode@active >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u https://lacchain.eosio.cr -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p costarica@writer -p lifebankcode@active
}

add_donor_lacchain() {
    echo 'Call action'
    mkdir -p ./stdout/register
    TEMP_DIR=./stdout/register

    cleos -u $HAPI_EOS_API_ENDPOINT push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://writer.eosio.cr push action -j -d -s lifebankcode adddonor '{
        "account":"donfwt1tyyw5",
        "community_asset":"1 LIFE"
    }' -p donfwt1tyyw5@active >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u $HAPI_EOS_API_ENDPOINT -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p costarica@writer -p donfwt1tyyw5@active
}

test_func() {
    echo 'Call action'
    mkdir -p ./stdout/register
    TEMP_DIR=./stdout/register

    cleos -u https://lacchain.eosio.cr -r "Accept-Encoding: identity" push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u https://lacchain.eosio.cr -r "Accept-Encoding: identity" push action -j -d -s lifebankcode addsponsor '{
        "account":"spo333yaqsoj",
        "sponsor_name":"Ferreteria McGyver",
        "benefit_description":"10% off toilet seats",
        "website":"https://garberhardware.com/",
        "telephones":"[\"134123\", \"09090032\"]",
        "business_type":"Construction",
        "schedule":"[{\"day\":\"Sunday\",\"open\":\"06:00\",\"close\":\"16:00\"},{\"day\":\"Friday\",\"open\":\"06:00\",\"close\":\"16:00\"},{\"day\":\"Saturday\",\"open\":\"06:00\",\"close\":\"16:00\"}]",
        "email":"garber@lifebank.io",
        "community_asset":"0 LIFE",
        "location":"{\"latitude\":40.746434642148586,\"longitude\":-74.00169825211302}",
        "address": "CQ San Carlos",
        "logo_url": "https://upload.wikimedia.org/wikipedia/commons/e/ef/Youtube_logo.png",
        "about": "Toilets for free only here",
        "social_media_links": "[{\"name\":\"facebook\",\"url\":\"https://jsonformatter.curiousconcept.com\"},{\"name\":\"instragram\",\"url\":\"https://jsonformatter.curiousconcept.com\"},{\"name\":\"twitter\",\"url\":\"https://jsonformatter.curiousconcept.com\"}]",
        "photos": "[\"https://static.hosteltur.com/app/public/uploads/img/articles/2020/04/10/M_110203_costa-rica.jpg\",\"https://www.larepublica.net/storage/images/2019/07/30/20190730091248.cr-3.jpg\"]",
        "covid_impact": "Healthy"
    }' -p spo333yaqsoj@active >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u https://lacchain.eosio.cr -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p costarica@writer -p spo333yaqsoj@active
}

set_code() {
    echo 'Register Sponsor'
    mkdir -p ./stdout/setcode
    TEMP_DIR=./stdout/setcode

    cleos -u $EOS_API_URL push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
    cleos -u $EOS_API_URL set code -j -d -s lifebankcode ../lifebankcode/lifebankcode.wasm >$TEMP_DIR/tx2.json
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
    cleos -u $EOS_API_URL -r "Accept-Encoding: identity" push transaction $TEMP_DIR/tx4.json -p costarica@writer -p lifebankcode@active
}

run_lifebank() {
    echo 'Installing LifeBank ...'
    create_community_lacchain
    create_lifebank_wallet
    create_lifebank_accounts
    assign_resources
    deploy_lifebank_contracts
    consent
    create_community
    register_lifebank
    register_donor
    register_sponsor
    test_token_lifecycle
    # TO DO: update_sponsor
    # TO DO: update_lifebank
    # TO DO: update_donor
    #clear_tables
}
run_lifebank
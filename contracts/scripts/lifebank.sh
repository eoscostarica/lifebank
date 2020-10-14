#!/usr/bin/env bash
EOS_PRIV_KEY=5JvEJvWVxWx9VQ5JmQreeB6WgG1a5DhDHYcdcJTzf4Hi4KBSQYL
EOS_PUB_KEY=EOS7ZKSa9zYuCmxRkzXQ696F5bNc5U8yPq4doH8hhLNQgkUpybGtN

set -e

unlock_lifebank_wallet() {
    echo 'Unlocking Wallet...'
    cleos wallet unlock -n 13letterlife --password $(cat ./secrets/lifebank_wallet_password.txt) ||
        echo "Wallet has already been unlocked..."
}

create_lifebank_wallet() {
    echo 'Creating Wallet...'
    cleos wallet create -n 13letterlife --to-console |
        awk 'FNR > 3 { print $1 }' |
        tr -d '"' \
            >./secrets/lifebank_wallet_password.txt
    cleos wallet open -n 13letterlife
    unlock_lifebank_wallet
    cleos wallet import -n 13letterlife --private-key $EOS_PRIV_KEY
}

create_lifebank_accounts() {
    echo 'Creating Lifebank Accounts...'
    lifebank_accounts=(
        # "consent2life"
        # "lifebankcode"
        # "lifebankcoin"
        "13letterlife"
        # "sponsprueba1"
        # "donorprueba1"
    )

    for account in "${lifebank_accounts[@]}"; do
        echo "Creating lifebank account '$account'"

        keys=($(cleos create key --to-console))
        pub=${keys[5]}
        priv=${keys[2]}

        cleos wallet import -n 13letterlife --private-key $priv
        mkdir -p ./secrets
        echo $pub >./secrets/$account.pub
        echo $priv >./secrets/$account.priv
        cleos -u https://lifebank.eosio.cr/api system newaccount eosio \
            --transfer $account \
            $EOS_PUB_KEY \
            --stake-net "10000.0000 SYS" \
            --stake-cpu "10000.0000 SYS" \
            --buy-ram-kbytes 8192
    done
}

deploy_lifebank_contracts() {
    echo 'Deploy Consent Contract'
    cleos -u https://lifebank.eosio.cr/api set contract consent2life ../consent2life/ -p consent2life@active
    sleep 2
    echo 'Deploy Code Contract'
    cleos -u https://lifebank.eosio.cr/api set contract lifebankcode ../lifebankcode/ -p lifebankcode@active
    code_pubkey=$(cat ./secrets/lifebankcode.pub)
    cleos -u https://lifebank.eosio.cr/api set account permission lifebankcode active \
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
    cleos -u https://lifebank.eosio.cr/api get account lifebankcode
    echo 'Deploy Coin Contract'
    coin_pubkey=$(cat ./secrets/lifebankcoin.pub)
    cleos -u https://lifebank.eosio.cr/api set contract lifebankcoin ../lifebankcoin/ -p lifebankcoin@active
    cleos -u https://lifebank.eosio.cr/api set account permission lifebankcoin active \
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
    cleos -u https://lifebank.eosio.cr/api get account lifebankcoin
}

consent() {
    echo 'Consent to Contracts'
    # cleos -u https://lifebank.eosio.cr/api push action consent2life consent '{"user": "lifebankcode", "contract": "lifebankcoin", "hash":""}' -p lifebankcode@active
    # cleos -u https://lifebank.eosio.cr/api push action consent2life consent '{"user": "lifebankcoin", "contract": "lifebankcode", "hash":""}' -p lifebankcoin@active
    cleos push action consent2life consent '{"user": "13letterlife", "contract": "lifebankcode", "hash":""}' -p bancoprueba1@active
    cleos push action consent2life consent '{"user": "13letterlife", "contract": "lifebankcoin", "hash":""}' -p bancoprueba1@active
    # cleos push action consent2life consent '{"user": "sponsprueba1", "contract": "lifebankcode", "hash":""}' -p sponsprueba1@active
    # cleos push action consent2life consent '{"user": "sponsprueba1", "contract": "lifebankcoin", "hash":""}' -p sponsprueba1@active
    # cleos push action consent2life consent '{"user": "donorprueba1", "contract": "lifebankcode", "hash":""}' -p donorprueba1@active
    # cleos push action consent2life consent '{"user": "donorprueba1", "contract": "lifebankcoin", "hash":""}' -p donorprueba1@active
}

create_community() {
    echo 'Create Lifebank Community'
    cleos push action lifebankcode createcmm \
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
    cleos push action lifebankcode addlifebank \
    '{
        "account":"13letterliffe",
        "lifebank_name":"Banco de sangre Siquirres",
        "description":"Salvando vidas",
        "address":"siquirres, Limon, Costa Rica",
        "location": "{\"latitude\":40.722387752690764,\"longitude\":-73.99595112132992}",
        "phone_number":"(646) 665-6000",
        "has_immunity_test":true,
        "blood_urgency_level":2,
        "schedule": "[{\"day\":\"Sunday\",\"open\":\"06:00\",\"close\":\"16:00\"}]",
        "community_asset":"0 LIFE",
        "email":"bsSiquirres@mail.com"
    }' -p lifebankcode@active
}

register_donor() {
    echo 'Register Donor'
    cleos push action lifebankcode adddonor \
    '{
        "account":"donorprueba1",
        "community_asset":"0 LIFE"
    }' -p donorprueba1@active
}

register_sponsor() {
    echo 'Register Sponsor'
    cleos push action lifebankcode addsponsor \
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
    cleos push action lifebankcoin issue \
    '{
        "lifebank":"bancoprueba1",
        "to":"donorprueba1",
        "memo":"por donar sangre"
    }' -p bancoprueba1@active

    echo 'Donor transfers to sponsor'
    cleos push action lifebankcoin transfer \
    '{
        "from":"donorprueba1",
        "to":"sponsprueba1",
        "quantity":"2 LIFE",
        "memo":"por darme un descuento"
    }' -p donorprueba1@active

    echo 'Sponsor transfer to lifebank'
    cleos push action lifebankcoin transfer \
    '{
        "from":"sponsprueba1",
        "to":"bancoprueba1",
        "quantity":"2 LIFE",
        "memo":"para que sigan recibiendo donaciones"
    }' -p sponsprueba1@active

    echo 'Lifebank transfer to lifebank'
    # TO DO : Setup a second LB and transfer
}

clear_tables() {
    echo 'Clear Consent Tables'
    cleos push action consent2life clear '' -p consent2life@active
    echo 'Clear Code Tables'
    cleos push action lifebankcode clear '' -p lifebankcode@active
    echo 'Clear Coin Tables'
    cleos push action lifebankcoin clear '' -p lifebankcoin@active
}

run_lifebank() {
    echo 'Installing LifeBank ...'
    create_lifebank_wallet
    create_lifebank_accounts
    # deploy_lifebank_contracts
    consent
    create_community
    register_lifebank
    # register_donor
    # register_sponsor
    #test_token_lifecycle
    # TO DO: update_sponsor
    # TO DO: update_lifebank
    # TO DO: update_donor
    #clear_tables
}

run_lifebank
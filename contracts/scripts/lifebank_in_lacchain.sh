deploy_lifebank_contracts_to_lacchain() {
    echo 'Deploy Lifebankcode'
    mkdir -p ./stdout/lifebankcode
    TEMP_DIR=./stdout/lifebankcode

    echo '1. set lifebankcode smart contract code'
    cleos -u $EOS_API_URL set contract lifebankcode -j -d -s ../lifebankcode/ >$TEMP_DIR/tx2.json

    echo '2. writer auth'
    cleos -u $EOS_API_URL push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json

    echo '3. merge actions'
    jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json

    echo '4. merge transaction'
    jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json

    echo '5. sign transaction'
    cleos -u $EOS_API_URL push transaction $TEMP_DIR/tx4.json -p costarica@writer -p lifebankcode@active
}

consent() {
  echo 'Consent to Contracts'
  mkdir -p ./stdout/consent
  TEMP_DIR=./stdout/consent

  cleos -u $EOS_API_URL push action -j -d -s writer run '{}' -p costarica@writer >$TEMP_DIR/tx1.json
  cleos -u https://writer.eosio.cr push action -j -d -s consent2life consent '{"user": "lifebankcoin", "contract": "lifebankcode", "hash":""}' -p lifebankcoin@active >$TEMP_DIR/tx2.json
  jq -s '[.[].actions[]]' $TEMP_DIR/tx1.json $TEMP_DIR/tx2.json >$TEMP_DIR/tx3.json
  jq '.actions = input' $TEMP_DIR/tx1.json $TEMP_DIR/tx3.json >$TEMP_DIR/tx4.json
  cleos -u $EOS_API_URL push transaction $TEMP_DIR/tx4.json -p costarica@writer -p lifebankcode@active
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

create_lifebank_acount_to_lacchain() {
    WORK_DIR=/opt/application
    mkdir -p ./stdout/account
    TEMP_DIR=./stdout/account

    cleos -u $EOS_API_URL push action -j -d -s eosio setram \
        '{
        "entity":"latamlink",
        "account":"eosmechanics",
        "ram_bytes": 200000
    }' -p latamlink@writer >$TEMP_DIR/tx1.json
}

run_lifebank() {
    echo 'Installing LifeBank ...'
    deploy_lifebank_contracts_to_lacchain
}

run_lifebank
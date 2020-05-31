const { Api, JsonRpc, RpcError } = require('eosjs');
const { JsSignatureProvider } = require('eosjs/dist/eosjs-jssig');      // development only
const fetch = require('node-fetch');                                    // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require('util');                   // node only; native TextEncoder/Decoder
const lifebank_priv_key='5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3';
const lifebank_pub_key='EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV';
const MIN_VAL = 0;
const MAX_VAL = 4;

const signatureProvider = new JsSignatureProvider([lifebank_priv_key]);
const rpc = new JsonRpc('http://localhost:8888', { fetch });
const api = new Api({ rpc, signatureProvider, textDecoder: new TextDecoder(), textEncoder: new TextEncoder() });
const get = require('lodash.get')
var chai = require('chai'),assert = chai.assert;

describe ('Lifebank unit test', function(){
   
    it('contract: consent2life testing consent good parameters',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: 'consent2life',
                  name: 'consent',
                  authorization: [{
                    actor: 'consent2life',
                    permission: 'active',
                  }],
                  data: {
                    user: 'consent2life',
                    contract: 'consent2life',
                    hash: 'c27474851c08b81e0c02e2383f52d62f58860be5ad60cb6d6606393e8f9b6607'
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
          }
    });

    it('contract: consent2life testing consent wrong auth',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: 'consent2life',
                  name: 'consent',
                  authorization: [{
                    actor: 'consent2life',
                    permission: 'active',
                  }],
                  data: {
                    user: 'consent2xxxx',
                    contract: 'consent3life',
                    hash: '4157f9fbc8b4b6ddeceb2d7552b9258e6c9d48a2d80d27db087627e3d3c5c5b4'
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            assert.equal(err, 'Error: missing authority of consent2xxxx')
          }
    });

    it('contract: consent2life testing consent bad hash',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: 'consent2life',
                  name: 'consent',
                  authorization: [{
                    actor: 'consent2life',
                    permission: 'active',
                  }],
                  data: {
                    user: 'consent2life',
                    contract: 'consent3life',
                    hash: 'c27474851c08b81e5ad60cb6d6606393e8f9b6607'
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            assert.equal(err, 'Error: Odd number of hex digits')
          }
    });

    it('contract: consent2life testing consent invalid contract',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: 'consent2life',
                  name: 'consent',
                  authorization: [{
                    actor: 'consent2life',
                    permission: 'active',
                  }],
                  data: {
                    user: 'consent2life',
                    contract: 'consent3life',
                    hash: '8dbc0156eaa14cf176385904a4b86b5896d641aad48a02c572e9cb7908dcfe28'
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'Account does not exist')
          }
    });

    it('contract: lifebankcoin testing clear ',async () => {
        try {
            //cleos push action lifebankcoin clear '{"current_asset":"1 BLOOD","owner":"lifebankcode" }' -p lifebankcoin@active
            const result = await api.transact({
                actions: [{
                  account: 'lifebankcoin',
                  name: 'clear',
                  authorization: [{
                    actor: 'lifebankcoin',
                    permission: 'active',
                  }],
                  data: {
                    current_asset: '1 BLOOD',
                    owner: 'lifebankcode'
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });

            const resultClean = await api.transact({
                actions: [{
                  account: 'lifebankcode',
                  name: 'clear',
                  authorization: [{
                    actor: 'lifebankcode',
                    permission: 'active',
                  }],
                  data: {
                    
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            console.log('\nCaught exception: ' + err);
          }
    });

   
     it('contract: lifebankcode testing createcmm ',async () => {
        try {
            
            const result = await api.transact({
                actions: [{
                  account: 'lifebankcode',
                  name: 'createcmm',
                  authorization: [{
                    actor: 'lifebankcode',
                    permission: 'active',
                  }],
                  data: {
                    community_name: 'Blood Bank1',
                    community_asset: '1 BLOOD',
                    description: 'Bank of blood',
                    logo: 'a logo url',
                    maximum_supply:'1000000 BLOOD'
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            console.log('\nCaught exception: ' + err);           
          }
    });

    it('contract: lifebankcode testing createcmm dup symbol ',async () => {
        try {
            
            const result = await api.transact({
                actions: [{
                  account: 'lifebankcode',
                  name: 'createcmm',
                  authorization: [{
                    actor: 'lifebankcode',
                    permission: 'active',
                  }],
                  data: {
                    community_name: 'Blood Bank2',
                    community_asset: '1 BLOOD',
                    description: 'Bank of blood',
                    logo: 'a logo url',
                    maximum_supply:'1000000 BLOOD'
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'symbol already exists')
          }
    });
//:addlifebank(eosio::name , string ,
// string , string , string , string ,
// bool , uint8_t , string schedule, eosio::asset , string )

    it('contract: lifebankcode testing addlifebank ',async () => {
        try {
            
            const result = await api.transact({
                actions: [{
                  account: 'lifebankcode',
                  name: 'addlifebank',
                  authorization: [{
                    actor: 'lifebankcode',
                    permission: 'active',
                  }],
                  data: {
                    account: 'lifebankcode',
                    lifebank_name: 'Lifebank name1',
                    description: 'Bank of description',
                    address: 'https://eoscostarica.io/',
                    location:'https://eoscostarica.io/',
                    phone_number:'+(506)1111111',
                    has_immunity_test: true,
                    blood_urgency_level: 1,
                    schedule: 'schedule',
                    community_asset:'1 BLOOD',
                    email:'hello@email.com'
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            console.log('\nCaught exception: ' + err); 
            //let errorMessage =  get(err, 'json.error.details[0].message')
            //errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            //assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            //assert.equal(errorMessage, 'symbol already exists')
          }
    });

    /*
    it('Register accounts as block producers',async () => {

    for(index =0 ; index < bp_accts_25.length; index++ ){  
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'regproducer',
                authorization: [{
                  actor: bp_accts_25[index],
                  permission: 'active',
                }],
                data: {
                  producer: bp_accts_25[index],
                  producer_key : rateproducer_pub_key,
                  url:'https://eoscostarica.io',
                  location:'0',
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
          console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    }
    });
    
    it('Remove votes/proxies from '+voter_acc+' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: voter_acc,
                  permission: 'active',
                }],
                data: {
                  voter: voter_acc,
                  proxy: '',
                  producers: []
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }

    });

    it('Remove votes/proxies from '+proxy_acc+' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  voter: proxy_acc,
                  proxy: '',
                  producers: []
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }

    });
 
   
    it('Rating using '+ voter_acc +' account with no voters ',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[0],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'account does not have enough voters')
          }
    });

    it('Register account ' +proxy_acc+ ' as proxy ',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'regproxy',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  proxy: proxy_acc,
                  isproxy: true,
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
            console.log('\nCaught exception: ' + err);
              if (err instanceof RpcError)
                console.log(JSON.stringify(err.json, null, 2));

        } 
    });

    it('Set up ' + proxy_acc + ' as proxy for '+voter_acc+' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: voter_acc,
                  permission: 'active',
                }],
                data: {
                  voter: voter_acc,
                  proxy: proxy_acc,
                  producers: []
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    });



    it('Rating using '+voter_acc+' and '+proxy_acc+' as proxy without voters',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[0],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'delegated proxy does not have enough voters')
          }
    });

    it('Set up 10 voters for ' + proxy_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  voter: proxy_acc,
                  proxy: '',
                  producers: bp_accts_10,
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    });

    it('Rating using '+voter_acc+' and '+proxy_acc+' as proxy with 10 voters',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[0],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'delegated proxy does not have enough voters')
          }
    });

    it('Set up 21 voters for ' + proxy_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  voter: proxy_acc,
                  proxy: '',
                  producers: bp_accts_21,
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    });

    it('Rating using '+voter_acc+' and '+proxy_acc+' as proxy with 21 voters',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[0],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });

    it('Set up 25 voters for ' + proxy_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  voter: proxy_acc,
                  proxy: '',
                  producers: bp_accts_25,
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    });

    it('Rating using '+voter_acc+' and '+proxy_acc+'as proxy with 25 voters',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[0],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
              console.log(JSON.stringify(err.json, null, 2));
          } 

    });

    it('Set up 10 voters for ' + voter_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: voter_acc,
                  permission: 'active',
                }],
                data: {
                  voter: voter_acc,
                  proxy: '',
                  producers: bp_accts_10,
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    });

    it('Rating using '+voter_acc+' account with 10 voters',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[0],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
            let errorMessage =  get(err, 'json.error.details[0].message')
            errorMessage && (errorMessage = errorMessage.replace('assertion failure with message:', '').trim())
            assert.equal('eosio_assert_message_exception', get(err, 'json.error.name') || '')
            assert.equal(errorMessage, 'account does not have enough voters')
          }
    });

    it('Set up 21 voters for ' + voter_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: voter_acc,
                  permission: 'active',
                }],
                data: {
                  voter: voter_acc,
                  proxy: '',
                  producers: bp_accts_21,
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    });

    it('Rating using '+voter_acc+' account with 21 voters',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[0],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });

    it('Set up 25 voters for ' + voter_acc + ' account',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'voteproducer',
                authorization: [{
                  actor: voter_acc,
                  permission: 'active',
                }],
                data: {
                  voter: voter_acc,
                  proxy: '',
                  producers: bp_accts_25,
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    });

    it('Rating using '+voter_acc+' account with 25 voters',async () => {
        try {
            const result = await api.transact({
                actions: [{
                  account: contract_acct,
                  name: 'rate',
                  authorization: [{
                    actor: voter_acc,
                    permission: 'active',
                  }],
                  data: {
                    user: voter_acc,
                    bp: bp_accts_25[0],
                    transparency:8,
                    infrastructure:8,
                    trustiness:7,
                    development:6,
                    community:9,
                  },
                }]
              }, {
                blocksBehind: 3,
                expireSeconds: 30,
              });
          } catch (err) {
             console.log('\nCaught exception: ' + err);
             if (err instanceof RpcError)
             console.log(JSON.stringify(err.json, null, 2));
          }
    });

    it('Unregister account '+proxy_acc+' as proxy',async () => {
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'regproxy',
                authorization: [{
                  actor: proxy_acc,
                  permission: 'active',
                }],
                data: {
                  proxy: proxy_acc,
                  isproxy: false
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {

        }

    });


    it('Unregister producers accounts',async () => {

    for(index =0 ; index < bp_accts_25.length; index++ ){  
      try {
          const result = await api.transact({
              actions: [{
                account: 'eosio',
                name: 'unregprod',
                authorization: [{
                  actor: bp_accts_25[index],
                  permission: 'active',
                }],
                data: {
                  producer: bp_accts_25[index],
                },
              }]
            }, {
              blocksBehind: 3,
              expireSeconds: 30,
            });
        } catch (err) {
         console.log('\nCaught exception: ' + err);
          if (err instanceof RpcError)
            console.log(JSON.stringify(err.json, null, 2));
        }
    }
    });
*/
 
});

/*
 * @file
 * @author  (C) 2020 by eoscostarica [ https://eoscostarica.io ]
 * @version 1.1.0
 *
 * @section LICENSE

 * @section DESCRIPTION
 *  Unit test for the project LifeBank. EOSIO Virtual Hackathon Project - Coding for Change
 *
 * A simple standard for digital assets (ie. Fungible and Non-Fungible Tokens - NFTs) for EOSIO blockchains
 *    WebSite:        https://eoscostarica.io
 *    GitHub:         https://github.com/eoscostarica
 *
 */

const { Api, JsonRpc, RpcError } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig"); // development only
const fetch = require("node-fetch"); // node only; not needed in browsers
const { TextEncoder, TextDecoder } = require("util"); // node only; native TextEncoder/Decoder
const lifebank_priv_key = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"; // the priv key for EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV

const BLOOD_MIN_VAL = 0; //min value for blood_urgency_level
const BLOOD_MAX_VAL = 4; // max value for blood_urgency_level

const signatureProvider = new JsSignatureProvider([lifebank_priv_key]);
const rpc = new JsonRpc("http://localhost:8888", { fetch });
const api = new Api({
  rpc,
  signatureProvider,
  textDecoder: new TextDecoder(),
  textEncoder: new TextEncoder(),
});
const get = require("lodash.get");
var chai = require("chai"),
  assert = chai.assert;

describe("Lifebank unit test", function () {
  it("contract: consent2life testing consent wrong auth", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "consent2life",
              name: "consent",
              authorization: [
                {
                  actor: "consent2life",
                  permission: "active",
                },
              ],
              data: {
                user: "consent2xxxx",
                contract: "consent3life",
                hash:
                  "4157f9fbc8b4b6ddeceb2d7552b9258e6c9d48a2d80d27db087627e3d3c5c5b4",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      assert.equal(err, "Error: missing authority of consent2xxxx");
    }
  });

  it("contract: consent2life testing consent bad hash", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "consent2life",
              name: "consent",
              authorization: [
                {
                  actor: "consent2life",
                  permission: "active",
                },
              ],
              data: {
                user: "consent2life",
                contract: "consent3life",
                hash: "c27474851c08b81e5ad60cb6d6606393e8f9b6607",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      assert.equal(err, "Error: Odd number of hex digits");
    }
  });

  it("contract: consent2life testing consent invalid contract", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "consent2life",
              name: "consent",
              authorization: [
                {
                  actor: "consent2life",
                  permission: "active",
                },
              ],
              data: {
                user: "consent2life",
                contract: "consent3life",
                hash:
                  "8dbc0156eaa14cf176385904a4b86b5896d641aad48a02c572e9cb7908dcfe28",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "Account does not exist");
    }
  });

  it("contract: lifebankcoin testing clear ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcoin",
              name: "clear",
              authorization: [
                {
                  actor: "lifebankcoin",
                  permission: "active",
                },
              ],
              data: {
                current_asset: "1 BLOOD",
                owner: "lifebankcode",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );

      const resultClean = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "clear",
              authorization: [
                {
                  actor: "lifebankcode",
                  permission: "active",
                },
              ],
              data: {},
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("contract: lifebankcode testing createcmm ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "createcmm",
              authorization: [
                {
                  actor: "lifebankcode",
                  permission: "active",
                },
              ],
              data: {
                community_name: "Blood Bank1",
                community_asset: "1 BLOOD",
                description: "Bank of blood",
                logo: "a logo url",
                maximum_supply: "1000000 BLOOD",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("contract: lifebankcode testing createcmm dup symbol ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "createcmm",
              authorization: [
                {
                  actor: "lifebankcode",
                  permission: "active",
                },
              ],
              data: {
                community_name: "Blood Bank2",
                community_asset: "1 BLOOD",
                description: "Bank of blood",
                logo: "a logo url",
                maximum_supply: "1000000 BLOOD",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "symbol already exists");
    }
  });

  it("contract: lifebankcode testing addlifebank with invalid account", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "addlifebank",
              authorization: [
                {
                  actor: "lifebankcode",
                  permission: "active",
                },
              ],
              data: {
                account: "lifebankcxxx",
                lifebank_name: "Lifebank name1",
                description: "Bank of description",
                address: "https://eoscostarica.io/",
                location: "https://eoscostarica.io/",
                phone_number: "+(506)1111111",
                has_immunity_test: true,
                blood_urgency_level: 1,
                schedule: "schedule",
                community_asset: "1 BLOOD",
                email: "hello@email.com",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      //console.log('\nCaught exception: ' + err);
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "New user account does not exists");
    }
  });

  it("contract: lifebankcode testing addlifebank without consent", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "addlifebank",
              authorization: [
                {
                  actor: "lifebankcode",
                  permission: "active",
                },
              ],
              data: {
                account: "lifebank1111",
                lifebank_name: "Lifebank name1",
                description: "Bank of description",
                address: "https://eoscostarica.io/",
                location: "https://eoscostarica.io/",
                phone_number: "+(506)1111111",
                has_immunity_test: true,
                blood_urgency_level: 1,
                schedule: "schedule",
                community_asset: "1 BLOOD",
                email: "hello@email.com",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(
        errorMessage,
        "Account does not have consent for lifebankcode"
      );
    }
  });

  it("Creating consent for lifebank1111 account", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "consent2life",
              name: "consent",
              authorization: [
                {
                  actor: "lifebank1111",
                  permission: "active",
                },
              ],
              data: {
                user: "lifebank1111",
                contract: "lifebankcode",
                //http://emn178.github.io/online-tools/sha256.html for hash value 'lifebank1111lifebankcode' as input
                hash:
                  "2ccad427228bae530d3afba0150a3f105b7fe9d9d095e15d8380d597badbe48a",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing addlifebank with consent", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "addlifebank",
              authorization: [
                {
                  actor: "lifebankcode",
                  permission: "active",
                },
              ],
              data: {
                account: "lifebank1111",
                lifebank_name: "Lifebank name1",
                description: "Bank of description",
                address: "https://eoscostarica.io/",
                location: "https://eoscostarica.io/",
                phone_number: "+(506)1111111",
                has_immunity_test: true,
                blood_urgency_level: 1,
                schedule: "schedule",
                community_asset: "1 BLOOD",
                email: "hello@email.com",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("Revoke consent for lifebank1111 account", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "consent2life",
              name: "revoke",
              authorization: [
                {
                  actor: "lifebank1111",
                  permission: "active",
                },
              ],
              data: {
                user: "lifebank1111",
                contract: "lifebankcode",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing addlifebank with revoked consent", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "addlifebank",
              authorization: [
                {
                  actor: "lifebankcode",
                  permission: "active",
                },
              ],
              data: {
                account: "lifebank1111",
                lifebank_name: "Lifebank name1",
                description: "Bank of description",
                address: "https://eoscostarica.io/",
                location: "https://eoscostarica.io/",
                phone_number: "+(506)1111111",
                has_immunity_test: true,
                blood_urgency_level: 1,
                schedule: "schedule",
                community_asset: "1 BLOOD",
                email: "hello@email.com",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(
        errorMessage,
        "Account does not have consent for lifebankcode"
      );
    }
  });

  it("Returning consent for lifebank1111 account", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "consent2life",
              name: "consent",
              authorization: [
                {
                  actor: "lifebank1111",
                  permission: "active",
                },
              ],
              data: {
                user: "lifebank1111",
                contract: "lifebankcode",
                //http://emn178.github.io/online-tools/sha256.html for hash value 'lifebank1111lifebankcode' as input
                hash:
                  "2ccad427228bae530d3afba0150a3f105b7fe9d9d095e15d8380d597badbe48a",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing addlifebank blood levels", async () => {
    try {
      for (i = BLOOD_MIN_VAL + 1; i < BLOOD_MAX_VAL; i++) {
        const result = await api.transact(
          {
            actions: [
              {
                account: "lifebankcode",
                name: "addlifebank",
                authorization: [
                  {
                    actor: "lifebankcode",
                    permission: "active",
                  },
                ],
                data: {
                  account: "lifebank1111",
                  lifebank_name: "Lifebank name" + i,
                  description: "Bank of description",
                  address: "https://eoscostarica.io/",
                  location: "https://eoscostarica.io/",
                  phone_number: "+(506)1111111",
                  has_immunity_test: true,
                  blood_urgency_level: i,
                  schedule: "schedule",
                  community_asset: "1 BLOOD",
                  email: "hello@email.com",
                },
              },
            ],
          },
          {
            blocksBehind: 3,
            expireSeconds: 30,
          }
        );
      }
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("contract: lifebankcode testing addlifebank negative blood levels", async () => {
    try {
      blood_level = Math.floor(-(Math.random() * BLOOD_MAX_VAL + 1));
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "addlifebank",
              authorization: [
                {
                  actor: "lifebankcode",
                  permission: "active",
                },
              ],
              data: {
                account: "lifebank1111",
                lifebank_name: "Lifebank name" + i,
                description: "Bank of description",
                address: "https://eoscostarica.io/",
                location: "https://eoscostarica.io/",
                phone_number: "+(506)1111111",
                has_immunity_test: true,
                blood_urgency_level: blood_level,
                schedule: "schedule",
                community_asset: "1 BLOOD",
                email: "hello@email.com",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      assert.equal(err, "Error: Number is out of range");
    }
  });

  it("contract: lifebankcode testing addlifebank invalid blood levels", async () => {
    try {
      blood_level =
        Math.floor(Math.random() * BLOOD_MAX_VAL + 1) + BLOOD_MAX_VAL;
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "addlifebank",
              authorization: [
                {
                  actor: "lifebankcode",
                  permission: "active",
                },
              ],
              data: {
                account: "lifebank1111",
                lifebank_name: "Lifebank name" + i,
                description: "Bank of description",
                address: "https://eoscostarica.io/",
                location: "https://eoscostarica.io/",
                phone_number: "+(506)1111111",
                has_immunity_test: true,
                blood_urgency_level: blood_level,
                schedule: "schedule",
                community_asset: "1 BLOOD",
                email: "hello@email.com",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "blood urgency level is out of range");
    }
  });

  it("contract: lifebankcode testing addsponsor  without consent", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "addsponsor",
              authorization: [
                {
                  actor: "sponsor11111",
                  permission: "active",
                },
              ],
              data: {
                account: "sponsor11111",
                sponsor_name: "Sponsor Name",
                website: "https://eoscostarica.io/",
                telephone: "+(506)111111",
                business_type: "it",
                schedule: "schedule",
                email: "hello@email.com",
                community_asset: "1 BLOOD",
                location: "Costa Rica",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      //console.log('\nCaught exception: ' + err);
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(
        errorMessage,
        "Account does not have consent for lifebankcode"
      );
    }
  });

  it("Creating consent for sponsor11111 account", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "consent2life",
              name: "consent",
              authorization: [
                {
                  actor: "sponsor11111",
                  permission: "active",
                },
              ],
              data: {
                user: "sponsor11111",
                contract: "lifebankcode",
                //http://emn178.github.io/online-tools/sha256.html for hash value 'sponsor11111lifebankcode' as input
                hash:
                  "ac11dce9db1ceaabccd45986e53af537ce46ff258788148aa228708829178609",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing addsponsor  with consent", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "addsponsor",
              authorization: [
                {
                  actor: "sponsor11111",
                  permission: "active",
                },
              ],
              data: {
                account: "sponsor11111",
                sponsor_name: "Sponsor Name",
                website: "https://eoscostarica.io/",
                telephone: "+(506)111111",
                business_type: "it",
                schedule: "schedule",
                email: "hello@email.com",
                community_asset: "1 BLOOD",
                location: "Costa Rica",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("contract: lifebankcode testing adddonor without consent", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "adddonor",
              authorization: [
                {
                  actor: "donor1111111",
                  permission: "active",
                },
              ],
              data: {
                account: "donor1111111",
                community_asset: "1 BLOOD",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      //console.log('\nCaught exception: ' + err);
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(
        errorMessage,
        "Account does not have consent for lifebankcode"
      );
    }
  });

  it("Creating consent for donor1111111 account", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "consent2life",
              name: "consent",
              authorization: [
                {
                  actor: "donor1111111",
                  permission: "active",
                },
              ],
              data: {
                user: "donor1111111",
                contract: "lifebankcode",
                //http://emn178.github.io/online-tools/sha256.html for hash value 'donor1111111lifebankcode' as input
                hash:
                  "9f289531b73796244f9c0abaa9da20d40ba967c8cdd0cab3f830a8767863dce3",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing adddonor with consent ", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "adddonor",
              authorization: [
                {
                  actor: "donor1111111",
                  permission: "active",
                },
              ],
              data: {
                account: "donor1111111",
                community_asset: "1 BLOOD",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      console.log("\nCaught exception TTTTT: " + err);
    }
  });

  it("contract: lifebankcode testing adddonor with sponsor account", async () => {
    try {
      const result = await api.transact(
        {
          actions: [
            {
              account: "lifebankcode",
              name: "adddonor",
              authorization: [
                {
                  actor: "sponsor11111",
                  permission: "active",
                },
              ],
              data: {
                account: "sponsor11111",
                community_asset: "1 BLOOD",
              },
            },
          ],
        },
        {
          blocksBehind: 3,
          expireSeconds: 30,
        }
      );
    } catch (err) {
      let errorMessage = get(err, "json.error.details[0].message");
      errorMessage &&
        (errorMessage = errorMessage
          .replace("assertion failure with message:", "")
          .trim());
      assert.equal(
        "eosio_assert_message_exception",
        get(err, "json.error.name") || ""
      );
      assert.equal(errorMessage, "Account already belogs to sponsor");
    }
  });
});

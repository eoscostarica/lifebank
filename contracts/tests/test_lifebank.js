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

const { JsonRpc, RpcError } = require("eosjs");
const { JsSignatureProvider } = require("eosjs/dist/eosjs-jssig"); // development only
const fetch = require("node-fetch"); // node only; not needed in browsers
const lifebank_priv_key = "5KQwrPbwdL6PhXujxW37FSSQZ1JiwsST4cqQzDeyXtP79zkvFD3"; // the priv key for EOS6MRyAjQq8ud7hVNYcfnVPJqcVpscN5So8BhtHuGYqET5GDW5CV

const BLOOD_MIN_VAL = 0; //min value for blood_urgency_level
const BLOOD_MAX_VAL = 4; // max value for blood_urgency_level

const get = require("lodash.get");
var chai = require("chai"),
  assert = chai.assert;

describe("Lifebank unit test", function () {
  it("contract: consent2life testing consent wrong auth", async () => {
    try {
    } catch (err) {
      assert.equal(err, "Error: missing authority of consent2xxxx");
    }
  });

  it("contract: consent2life testing consent bad hash", async () => {
    try {
    } catch (err) {
      assert.equal(err, "Error: Odd number of hex digits");
    }
  });

  it("contract: consent2life testing consent invalid contract", async () => {
    try {
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
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("contract: lifebankcode testing createcmm ", async () => {
    try {
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("contract: lifebankcode testing createcmm dup symbol ", async () => {
    try {
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
      assert.equal(errorMessage, "New user account does not exists");
    }
  });

  it("contract: lifebankcode testing addlifebank without consent", async () => {
    try {
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
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing addlifebank with consent", async () => {
    try {
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("Revoke consent for lifebank1111 account", async () => {
    try {
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing addlifebank with revoked consent", async () => {
    try {
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
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing addlifebank blood levels", async () => {
    try {
      for (i = BLOOD_MIN_VAL + 1; i < BLOOD_MAX_VAL; i++) {}
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("contract: lifebankcode testing addlifebank negative blood levels", async () => {
    try {
      blood_level = Math.floor(-(Math.random() * BLOOD_MAX_VAL + 1));
    } catch (err) {
      assert.equal(err, "Error: Number is out of range");
    }
  });

  it("contract: lifebankcode testing addlifebank invalid blood levels", async () => {
    try {
      blood_level =
        Math.floor(Math.random() * BLOOD_MAX_VAL + 1) + BLOOD_MAX_VAL;
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

  it("Creating consent for sponsor11111 account", async () => {
    try {
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing addsponsor  with consent", async () => {
    try {
    } catch (err) {
      console.log("\nCaught exception: " + err);
    }
  });

  it("contract: lifebankcode testing adddonor without consent", async () => {
    try {
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

  it("Creating consent for donor1111111 account", async () => {
    try {
    } catch (err) {
      console.log("\nCaught exception: " + err);
      if (err instanceof RpcError)
        console.log(JSON.stringify(err.json, null, 2));
    }
  });

  it("contract: lifebankcode testing adddonor with consent ", async () => {
    try {
    } catch (err) {
      console.log("\nCaught exception TTTTT: " + err);
    }
  });

  it("contract: lifebankcode testing adddonor with sponsor account", async () => {
    try {
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

<template>
  <div class="body-container">
    <div class="hero__logo" v-show="address == null">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>
    <div class="hero__title-page" v-show="address == null">
      {{ $t("pages.send.pageName") }}
    </div>
    <div class="hero__subTitle2" v-show="address == null">
      Please make sure you are using
    </div>
    <div class="hero__subTitle3" v-show="address == null">
      <b-icon-lock-fill></b-icon-lock-fill> https://wallet.neatio.net
    </div>

    <div class="hero__title" v-show="address == null">
      <input
        type="password"
        class="hero__inputs"
        v-model="keyInput"
        placeholder=" Enter Your Private Key In Here"
      />
    </div>

    <div class="hero__warn" v-show="address == null">{{ keyError }}</div>
    <div class="hero__title" v-show="address == null">
      <div class="hero__title-ks">
        <button class="ripple" @click="importKey">IMPORT</button>
      </div>
    </div>

    <div class="hero__walletInfo" v-show="address !== null">
      <div class="hero__subTitle2" v-show="address !== null">
        Wallet Address
      </div>
      <div class="hero__title">
        {{ address }}
      </div>
      <div class="hero__title">
        <div v-show="balance == null && address !== null">
          <div class="breeding-rhombus-spinner">
            <div class="rhombus child-1"></div>
            <div class="rhombus child-2"></div>
            <div class="rhombus child-3"></div>
            <div class="rhombus child-4"></div>
            <div class="rhombus child-5"></div>
            <div class="rhombus child-6"></div>
            <div class="rhombus child-7"></div>
            <div class="rhombus child-8"></div>
            <div class="rhombus big"></div>
          </div>
        </div>
      </div>
      <div class="hero__subTitle2" v-show="balance !== null">Your Balance</div>
      <div class="hero__bal" v-show="balance !== null">
        {{ balance }} <span class="hero__neat">NEAT</span>
      </div>
    </div>

    <div class="hero__title" v-show="address !== null"></div>
    <div class="hero__title" v-show="address !== null">
      <input
        type="text"
        class="hero__input1"
        v-model="addressToSend"
        placeholder="Destination Address"
      />
    </div>
    <div class="hero__title" v-show="address !== null">
      <input
        type="text"
        class="hero__input2"
        v-model="amountToSend"
        placeholder="Amount To Send"
      />
    </div>
    <div class="hero__title" v-show="address !== null">
      <div class="hero__title-ks">
        <button class="ripple" @click="neatSend">SEND</button>
      </div>
    </div>
    <div
      class="hero__title"
      v-show="transactionHash === null && sending !== null"
    >
      Executed!
      <div
        class="hero__subTitle2"
        v-show="transactionHash === null && sending !== null"
      >
        Transaction Hash ID is:
      </div>
      <div
        class="hero__subTitle3"
        v-show="transactionHash === null && sending !== null"
      >
        {{ sending }}
      </div>
    </div>

    <div class="hero__title" v-show="transactionHash !== null">
      Executed!
      <div class="hero__subTitle2" v-show="transactionHash !== null">
        Transaction Hash ID is:
      </div>
      <div class="hero__subTitle3" v-show="transactionHash !== null">
        {{ transactionHash }}
      </div>
    </div>
  </div>
</template>

<script>
const Account = require("neatioapi").account;
const Nat = require("neatioapi").nat;
const Utils = require("neatioapi").utils;
const URL = "https://rpc.neatio.net";
const Web3 = require("web3");
const web3 = new Web3("https://rpc.neatio.net");

import axios from "axios";

export default {
  name: "SendPK",

  data() {
    return {
      keyInput: null,
      address: null,
      balance: null,
      sending: null,
      transactionHash: null,
      amountToSend: null,
      addressToSend: null,
      keyError: null,
    };
  },

  methods: {
    importKey() {
      if (this.keyInput.length != 64) {
        const keyError = "Invalid private key!";
        this.keyError = keyError;
        console.log(keyError);
        return;
      } else {
        const privateKey = "0x" + this.keyInput;
        const wallet = Account.fromPrivate(privateKey);
        this.address = wallet.address;
        this.privateKey = wallet.privateKey;
        const address = this.address;
        const DATA = {
          jsonrpc: "2.0",
          method: "neat_getBalance",
          params: [`${address}`, "latest"],
          id: 1,
        };

        setInterval(() => {
          axios
            .post(URL, DATA, { "Content-type": "application/json" })
            .then(
              (response) =>
                (this.balance = Utils.toNEAT(
                  Nat.toString(response.data.result)
                ))
            );
        }, 1000);
      }
    },

    async neatSend() {
      const privateKey = "0x" + this.keyInput;
      const account = web3.eth.accounts.privateKeyToAccount(privateKey);
      const addressFrom = account.address;
      const amountToSend = this.amountToSend;
      const addressTo = this.addressToSend;
       console.log(
          `Sending... ${addressFrom} to ${addressTo}`
       );

      const createTransaction = await web3.eth.accounts.signTransaction(
        {
          from: addressFrom,
          to: addressTo,
          value: web3.utils.toWei(`${amountToSend}`, "ether"),
          gas: "53000",
        },
        privateKey
      );
      
      const sending = 'Sending...'
      console.log (sending)

      const txHash = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
      );

       console.log(
          `Transaction confirmed: ${txHash.transactionHash}`
       );
    },
  },
};
</script>
<template>
  <div class="body-container">

    <div class="hero__title-page">{{ $t("pages.send.pageName") }}</div>
    <div class="hero__subTitle2" v-show="txtName == ''">
      Please make sure you are using
    </div>
    <div class="hero__subTitle3" v-show="txtName == ''">
      <b-icon-lock-fill></b-icon-lock-fill> https://wallet.neatio.net
    </div>
    <div class="hero__title" v-show="txtName !== '' && address == null">
      KeyStore File Loaded
    </div>
    <div class="hero__walFile" v-show="txtName !== '' && address == null">
      {{ txtName }}
    </div>

    <div class="hero__title" v-show="txtName == '' && address == null">
      <button class="ripple" @click="selectKeyStore">IMPORT KEYSTORE</button>
    </div>

    <input
      @change="onFileChange"
      style="display: none"
      id="f"
      ref="f"
      type="file"
    />
    <div class="hero__title" v-show="address == null">
      <input
        type="password"
        class="hero__inputs"
        @keyup.enter="decryptWallet"
        v-show="txtName !== ''"
        v-model="passwd"
        placeholder="Wallet Password"
      />
    </div>
    <div class="hero__title" v-show="txtName !== '' && address == null">
      <div class="hero__title-ks">
        <button class="ripple" @click="decryptWallet">DECRYPT</button>
      </div>
    </div>

    <div class="hero__subTitle2" v-show="address !== null">Wallet Address</div>
    <div class="hero__title">
      {{ address }}
    </div>
    <div class="hero__title">
      <div v-show="balance == null && address !== null">
        <div class="hero__title-ks">
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
    </div>
    <div class="hero__subTitle2" v-show="balance !== null">Your Balance</div>
    <div class="hero__bal" v-show="balance !== null">
      {{ balance }} <span class="hero__neat">NIO</span>
    </div>
    <div class="hero__title" v-show="address == null"></div>
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

    <div class="hero__title" v-show="txHash !== null">
      Executed!
      <div class="hero__subTitle2" v-show="txHash !== null">
        Transaction Hash ID is:
      </div>
      <div class="hero__subTitle3" v-show="txHash !== null">
        {{ txHash }}
      </div>
    </div>
  </div>
</template>

<script>
const Account = require("nio-api").account;
const KeyStore = require("nio-api").keystore;
const Transaction = require("nio-api").transaction;
const Nat = require("nio-api").nat;
const Utils = require("nio-api").utils;
const URL = "https://rpc.neatio.net";
const RPC = require("nio-api").rpc;
const Web3 = require('web3');
const web3 = new Web3('https://rpc.neatio.net');
const Accounts = require('web3-eth-accounts').accounts;
const Tx = require('ethereumjs-tx').Transaction;

import axios from "axios";

export default {
  name: "SendKS",

  data() {
    return {
      address: null,
      balance: null,
      txHash: null,
      amountToSend: null,
      addressToSend: null,
      keyStore: null,
      passwd: null,
      privateKey: null,
      txtName: "",
      wallet: null,
    };
  },

  methods: {
    selectKeyStore() {
      document.getElementById("f").click();
    },

    onFileChange(f) {
      const vm = this;
      const file = document.getElementById("f").files[0];
      const txtName = file.name;
      this.txtName = txtName;
      const reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        vm.keyStore = this.result;
      };
    },

    decryptWallet() {
      const account = KeyStore.fromV3Keystore(
        JSON.parse(this.keyStore),
        this.passwd
      );
      const privKey = account.privateKey;
      const wallet = Account.fromPrivate(privKey);
      this.address = wallet.address;
      this.privateKey = wallet.privateKey;
      const address = this.address;
      this.address = address;
      console.log(address);

      const DATA = {
        jsonrpc: "2.0",
        method: "neat_getBalance",
        params: [`${address}`, "latest"],
        id: 1,
      };
      setInterval(() => {
        axios
          .post(URL, DATA)
          .then(
            (response) =>
              (this.balance = Utils.toNEAT(Nat.toString(response.data.result)))
          );
      }, 3500);
    },

    async neatSend() {
            const account = KeyStore.fromV3Keystore(
        JSON.parse(this.keyStore),
        this.passwd
      );
      const privateKey = account.privateKey;
       // console.log(account);
     const addressFrom = this.address;
    // console.log(addressFrom);

  const amountToSend = this.amountToSend;
  const addressTo = this.addressToSend;
  //  console.log(
  //     `Sending... ${addressFrom} to ${addressTo}`
  //  );

   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         from: addressFrom,
         to: addressTo,
         value: web3.utils.toWei(`${amountToSend}`, 'ether'),
         gas: '53000',
      },
      privateKey
   );

   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
     
   );
    this.transactionHash = createReceipt.transactionHash;
    },
  },
};
</script>
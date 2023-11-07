<template>
  <div class="body-container">
    
    <div class="hero__subTitle2" v-show="txtName == ''">
      Please make sure you are using
    </div>
    <div class="hero__subTitle7" v-show="txtName == ''">
      <b-icon-lock-fill></b-icon-lock-fill> https://wallet.neatio.net
    </div>

    <div class="hero__title33">
      <div v-show="balance == null && address !== null">Loading Balance</div>
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

    <div class="hero__bal" v-show="balance !== null">
      <div>
        <div class="test-bal">
          {{ balance }} <span class="hero__neat">NIO</span>
        </div>

        <div class="wallet-header" v-show="address !== null">
          <div class="hero__titlex">
            {{ address }}
          </div>
        </div>
      </div>
    </div>

    <div class="box-btn">
      <div class="box7" v-show="address !== null">
        <button2 class="sendButton" id="rpp1" @click="swStake">Send</button2>
      </div>

      <div class="box8" v-show="address !== null">
        <button2 class="stakeButton" id="rpp2" @click="swStake">Stake</button2>
      </div>
    </div>

    <div class="box0" v-show="address === null">
      <div class="hero__wallet-description" v-show="address === null">
        {{ $t("Here you can access your Neatio wallet.") }}
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
    </div>

    <div class="box1" id="box11" v-show="address !== null">
      <div class="hero__wallet-description" v-show="address == null">
        {{ $t("Here you can access your Neatio wallet.") }}
      </div>


      <div class="hero__title22" v-show="address !== null">Destination</div>
      <div class="hero__title" v-show="address !== null">
        <input
          type="text"
          class="hero__input1"
          v-model="addressToSend"
          placeholder="Address"
        />
      </div>
      <div class="hero__title" v-show="address !== null">
        <input
          type="text"
          class="hero__input2"
          v-model="amountToSend"
          placeholder="Amount"
        />
      </div>
      <div class="hero__title" v-show="address !== null">
        <div class="hero__title-ks">
          <button class="ripple" @click="neatSend">SEND</button>
        </div>
      </div>

      <div class="hero__title" v-show="txHash !== null">
        Sent!
        <div class="hero__subTitle2" v-show="txHash !== null">
          Transaction Hash ID is:
        </div>
        <div class="hero__subTitle3" v-show="txHash !== null">
          <a :href="`https://scan.neatio.net/tx/${txHash}`">View TX</a>
        </div>
      </div>
    </div>

    <div hidden class="box2" id="box22" v-show="address !== null">
      <div class="hero__title23" v-show="address !== null">Disclaimer!</div>
      <div class="hero__subTitle33" v-show="address !== null">
        Please note that Neatio operates on a 24-hour epoch. Your coins will
        start generating rewards on the next epoch and unstaking may take up to
        24 hours.
      </div>

      <div class="hero__title" v-show="address !== null">
        <input
          type="text"
          class="hero__input2"
          v-model="amountToSend"
          placeholder="Amount to stake"
        />
      </div>
      <div class="hero__title" v-show="address !== null">
        <div class="hero__title-ks">
          <button class="ripple" @click="neatStake">Stake</button>
        </div>
      </div>

      <div class="hero__title" v-show="txHash !== null">
        Sent!
        <div class="hero__subTitle2" v-show="txHash !== null">
          Transaction Hash ID is:
        </div>
        <div class="hero__subTitle3" v-show="txHash !== null">
          <a :href="`https://scan.neatio.net/tx/${txHash}`">View TX</a>
        </div>
      </div>
    </div>
    


    
   
  




  </div>
</template>

<script>
const Account = require("nio-api").account;
const KeyStore = require("nio-api").keystore;
const Transaction = require("nio-api").transaction;
const RPC = require("nio-api").rpc;
const Nat = require("nio-api").nat;
const Utils = require("nio-api").utils;
const URL = "https://rpc.neatio.net";

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
            .post(URL, DATA, { "Content-type": "application/json" })
            .then(
              (response) =>
                (this.balance = Utils.toNio(Nat.toString(response.data.result)))
            );
        }, 3500);
    },

    async neatSend() {
      const userAccount = {
        address: this.address,
        privateKey: this.privateKey,
      };
      const send = RPC(URL);
      const nonce = await send("neat_getTransactionCount", [
        userAccount.address,
        "latest",
      ]);
      const recipient = this.addressToSend;
      const amount = this.amountToSend;
      const tx = {
        chainId: Nat.fromString("1"),
        nonce: Nat.fromString(nonce),
        gasPrice: Nat.fromString("10000000000"),
        gas: Nat.fromString("1000000"),
        to: Utils.stringToHex(recipient),
        value: Nat.fromString(Utils.fromNio(amount)),
        data: "0x",
      };
      const signature = Transaction.sign(tx, userAccount);
      const txHash = await send("neat_sendRawTransaction", [signature]);
      this.txHash = txHash;
    },




    swStake() {
      if (document.getElementById("box11")) {
        if (document.getElementById("box11").style.display == "none") {
          document.getElementById("box11").style.display = "block";
          document.getElementById("box22").style.display = "none";
        } else {
          document.getElementById("box11").style.display = "none";
          document.getElementById("box22").style.display = "block";
        }
      }
    },

    neatStake() {
      // code
    },



  },
};
</script>
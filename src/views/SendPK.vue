<template>
  <div class="body-container">
    <div class="hero__subTitle2" v-show="address == null">
      Please make sure you are visiting
      <div class="hero__subTitle7" v-show="address == null">
        <b-icon-lock-fill></b-icon-lock-fill> https://wallet.neatio.net
      </div>
    </div>
    
    <div class="hero__title33">
      <div class="load-text" v-show="balance == null && address !== null">Loading Balance </div>
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

      <div class="hero__title" v-show="address === null">
        <input
          type="password"
          class="hero__inputs"
          v-model="keyInput"
          placeholder=" Enter Your Private Key"
        />
      </div>

      <div class="hero__warn" v-show="address == null">{{ keyError }}</div>
      <div class="hero__title" v-show="address == null">
        <div class="hero__title-ks">
          <button class="ripple" @click="importKey">IMPORT</button>
        </div>
      </div>
    </div>

    <div class="box1" id="box11" v-show="address !== null">
      <div class="hero__wallet-description" v-show="address == null">
        {{ $t("Here you can access your Neatio wallet.") }}
      </div>

      <div class="hero__title" v-show="address == null">
        <input
          type="password"
          class="hero__inputs"
          v-model="keyInput"
          placeholder=" Enter Your Private Key"
        />
      </div>

      <div class="hero__warn" v-show="address == null">{{ keyError }}</div>
      <div class="hero__title" v-show="address == null">
        <div class="hero__title-ks">
          <button class="ripple" @click="importKey">IMPORT</button>
        </div>
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
         <div class="hero__subTitle2" v-show="txHash !== null">
          Transaction Hash ID is: {{ txHash }}
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
          v-model="amountToStake"
          placeholder="Amount to stake"
        />
      </div>
      <div class="hero__title" v-show="address !== null">
        <div class="hero__title-ks">
          <button class="ripple" @click="neatStake">Stake</button>
        </div>
      </div>

      <div class="hero__title" v-show="txHash !== null">
        Coin sent to stake!
        <div class="hero__subTitle2" v-show="txHash !== null">
          Transaction Hash ID is: {{ txHash }}
        </div>

      </div>
    </div>
  </div>
</template>

<script>
const Account = require("nio-api").account;
const Transaction = require("nio-api").transaction;
const Abi = require("nio-api").abi;
const RPC = require("nio-api").rpc;
const Nat = require("nio-api").nat;
const Utils = require("nio-api").utils;
const URL = "https://rpc.neatio.net";

import axios from "axios";

export default {
  name: "SendPK",

  data() {
    return {
      keyInput: null,
      address: null,
      addry: null,
      balance: null,
      sending: null,
      transactionHash: null,
      amountToSend: null,
      amountToStake: null,
      addressToSend: null,
      keyError: null,
      txHash: null,
      checked: true,
      label: "Send",
      active: 1,
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
        this.addry = `${this.address.substr(0, 6)}...${this.address.slice(-4)}`;
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
                (this.balance = Utils.toNio(Nat.toString(response.data.result)))
            );
        }, 3500);
      }
    },

    update() {
      this.label = this.checked ? this.dataOn : this.dataOff;
    },

    getBalanceDetail() {
      const address = this.address;
      const valData = {
        jsonrpc: "2.0",
        method: "neat_getBalanceDetail",
        params: [`${address}`, "latest", true],
        id: 1,
      };
      axios
        .post(URL, valData)
        .then((response) => {
          (this.fullbalance = Utils.toNio(
            Nat.toString(response.data.result.balance)
          )),
            (this.staking = Utils.toNio(
              Nat.toString(response.data.result.delegateBalance)
            )),
            (this.rewards = Utils.toNio(
              Nat.toString(response.data.result.rewardBalance)
            ));
          console.log(this.staking);
        })
        .catch((error) => {
          console.log("error", error);
        });
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

    async neatStake() {

      const userAccount = {
        address: this.address,
        privateKey: this.privateKey,
      };
      const amount = this.amountToStake;
      const send = RPC(URL);
      const contractMethod = Abi.encodeParams(["address"], ["Nio3BHxKwCW65jRysbsBNh454h6XrPuK"])
      const validatorData = Utils.sha3("Delegate(address)").substr(2, 8);
      const nonce = await send("neat_getTransactionCount", [
        userAccount.address,
        "latest",
      ]);
      const tx = {
        chainId: Nat.fromString("1"),
        nonce: Nat.fromString(nonce),
        gasPrice: Nat.fromString("10000000000"),
        gas: Nat.fromString("1000000"),
        to: Utils.stringToHex("Nio33MintingSmartContractAddress"),
        value: Nat.fromString(Utils.fromNio(amount)),
        data: contractMethod + validatorData.substring(2),
      };
      const signature = Transaction.sign(tx, userAccount);
      const txHash = await send("neat_sendRawTransaction", [signature]);
      this.txHash = txHash;
      console.log(txHash);
    },

    async neatClaim() {
      const userAccount = {
        address: this.address,
        privateKey: this.privateKey,
      };
      const send = RPC(URL);
      const contractMethod = Abi.methodID("WithdrawReward", ["address"]);
      const validatorData = Abi.encodeParams(
        ["address"],
        [userAccount.address]
      );
      const nonce = await send("neat_getTransactionCount", [
        userAccount.address,
        "latest",
      ]);
      const tx = {
        chainId: Nat.fromString("1"),
        nonce: Nat.fromString(nonce),
        gasPrice: Nat.fromString("10000000"),
        gas: Nat.fromString("10000000"),
        to: Utils.stringToHex("Nio33MintingSmartContractAddress"),
        value: "0x0",
        data: contractMethod + validatorData.substring(2),
      };
      const signature = Transaction.sign(tx, userAccount);
      const txHash = await send("neat_sendRawTransaction", [signature]);
      this.txHash = txHash;
    },


  },
};
</script>
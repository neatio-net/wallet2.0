<template>
  <div class="body-container">
    <div class="hero__title-page" v-show="address == null">
      {{ $t("pages.register.pageName") }}
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

    <div class="hero__subTitle2" v-show="address !== null">Wallet Address</div>
    <div class="hero__title">
      {{ address }}
    </div>

    <div class="hero__fullbalance">
      <div class="hero__subTitle2" v-show="balance !== null">
        Available balance
      </div>
      <div class="hero__bal" v-show="balance !== null">
        {{ balance }}<span class="hero__neat">NEAT</span>
      </div>
      <div class="hero__subTitle2" v-show="staked !== null">Coins locked</div>
      <div class="hero__bal2" v-show="balance !== null">
        {{ staked }} <span class="hero__neat">NEAT</span>
      </div>
      <div class="hero__subTitle2" v-show="reward !== null">
        Unclaimed Rewards
      </div>
      <div class="hero__bal2" v-show="balance !== null">
        {{ reward }} <span class="hero__neat">NEAT</span>
      </div>
    </div>

    <!-- <div class="hero__subTitle2" v-show="balance !== null" > Available balance  </div>
    <div class="hero__bal" v-show="balance !== null">
      {{ balance }}<span class="hero__neat">NEAT</span>
    </div>
    <div class="hero__subTitle2" v-show="staked !== null">Coins locked</div>
    <div class="hero__bal2" v-show="balance !== null">
      {{ staked }} <span class="hero__neat">NEAT</span>
    </div>
    <div class="hero__subTitle2" v-show="reward !== null">Unclaimed Rewards</div>
    <div class="hero__bal2" v-show="balance !== null">
      {{ reward }} <span class="hero__neat">NEAT</span>
    </div> -->

    <div class="hero__title" v-show="reward != '0' && reward !== null">
      <input
        type="text"
        class="hero__input2"
        v-model="amountToClaim"
        placeholder="Amount To Claim"
      />
    </div>

    <div class="hero__title-claim" v-show="reward !== '0' && reward !== null">
      <button class="ripple" @click="neatClaim">CLAIM REWARD</button>
    </div>

    <div class="hero__title" v-show="staked === '0' && staked !== null">
      <input
        type="password"
        class="hero__input1"
        v-model="valPubKeyInput"
        placeholder="Validator Public Key  (256 char long)"
      />
    </div>
    <div class="hero__title" v-show="staked === '0' && staked !== null">
      <input
        type="password"
        class="hero__input1"
        v-model="valPrivKeyInput"
        placeholder="Validator Private Key  (64 char long)"
      />
    </div>
    <!-- <div class="hero__title" v-show="staked === '0' && staked !== null">
      <input
        type="text"
        class="hero__input2"
        v-model="valCommission"
        placeholder="Commission  ( 0 to 100 )"
      />
    </div> -->

    <div class="hero__title" v-show="staked === '0' && staked !== null">
      <input
        type="text"
        class="hero__input2"
        v-model="valAmountToStake"
        placeholder="Amount (min. 50,000)"
      />
    </div>

    <div class="hero__title" v-show="staked == '0' && staked !== null">
      <button class="ripple" @click="neatReg">REGISTER</button>
    </div>

    <div class="hero__title4">
      <div class="hero__subTitle2" v-show="staked !== '0' && staked !== null">
        !!! Danger Zone !!!
      </div>
      <div class="hero__title" v-show="staked !== '0' && staked !== null">
        <button class="ripple2" @click="neatUnreg">UN-REGISTER</button>
      </div>
    </div>
  </div>
</template>

<script>
const Account = require("nio-api").account;
const RPC = require("nio-api").rpc;
const Nat = require("nio-api").nat;
const Utils = require("nio-api").utils;
const URL = "https://rpc.neatio.net";
const Web3 = require("web3");
const Abi = require("nio-api").abi;
const web3 = new Web3("https://rpc.neatio.net");

import axios from "axios";
import BigNumber from "bignumber.js";

export default {
  name: "StakingPK",

  data() {
    return {
      keyInput: null,
      address: null,
      balance: null,
      balanceDetails: null,
      staked: null,
      reward: null,
      txHash: null,
      valPubKey: null,
      valPrivKey: null,
      moreToSend: null,
      valPubKeyInput: "",
      valPrivKeyInput: "",
      keyError: null,
      valAmountToStake: null,
      valCommission: null,
      amountToClaim: null,
      transactionHash: null,
    };
  },

  methods: {
    //     initialize () {
    //   ethereum.on('chainChanged', (_chainId) => {
    //     this.getBalance();
    //   });

    //   ethereum.on('accountsChanged', (_accounts) => {
    //     this.address = _accounts[0];
    //     this.getBalance();
    //   })
    // },

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
          method: "neat_getBalanceDetail",
          params: [`${address}`, "latest", true],
          id: 1,
        };

        // setInterval(() => {
        axios
          .post(URL, DATA, { "Content-type": "application/json" })
          .then((response) => {
            (this.balance = Utils.toNEAT(
              Nat.toString(response.data.result.balance)
            )),
              (this.staked = Utils.toNEAT(
                Nat.toString(response.data.result.delegateBalance)
              )),
              (this.reward = Utils.toNEAT(
                Nat.toString(response.data.result.rewardBalance)
              ));
          });

        // }, 500);
      }
    },

    async neatReg() {
      const account = web3.eth.accounts.privateKeyToAccount(this.privateKey);
      const send = RPC(URL);
      const recipient = "0x0000000000000000000000000000000000000505";
      const amount = this.valAmountToStake;
      const valPubKey = this.valPubKeyInput;
      const valPrivKey = this.valPrivKeyInput;
      const validatorPubKey = "0x" + valPubKey;
      const validatorPrivKey = "0x" + valPrivKey;
      const validatorSignature = await send("neat_signAddress", [
        account.address,
        validatorPrivKey,
      ]);

      const contractMethod = Abi.methodID("Register", [
        "bytes",
        "bytes",
        "uint8",
      ]);

      const validatorData = Abi.encodeParams(
        ["bytes", "bytes", "uint8"],
        [validatorPubKey, validatorSignature, 15]
      );
      const createTransaction = await web3.eth.accounts.signTransaction(
        {
          from: account.address,
          to: recipient,
          value: web3.utils.toWei(`${amount}`, "ether"),
          gas: "53000",
          data: contractMethod + validatorData.substring(2),
        },
        this.privateKey
      );

      const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
      );
      alert(
        `Validator successfully registered! TxID: ${createReceipt.transactionHash}`
      ); // new alert
      console.log(
        `Validator succesfully registered: ${createReceipt.transactionHash}`
      );
    },

    async neatClaim() {
      // not working
      const account = web3.eth.accounts.privateKeyToAccount(this.privateKey);
      const recipient = "0x0000000000000000000000000000000000000505";
      const contractMethod = Abi.methodID("WithdrawReward", [
        "address",
        "uint256",
      ]);
      const validatorData = Abi.encodeParams(
        ["address", "uint256"],
        [
          account.address,
          new BigNumber(this.amountToClaim).multipliedBy(Math.pow(10, 18)),
        ]
      );
      const createTransaction = await web3.eth.accounts.signTransaction(
        {
          from: account.address,
          to: recipient,
          value: "0x0",
          gas: "53000",
          data: contractMethod + validatorData.substring(2),
        },
        this.privateKey
      );
      const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
      );
      alert(
        `Your claim was successfully! TxID: ${createReceipt.transactionHash}`
      ); // new alert
      console.log(
        `Reward succesfully claimed with tx ID: ${createReceipt.transactionHash}`
      );
    },

    async neatUnreg() {
      const account = web3.eth.accounts.privateKeyToAccount(this.privateKey);
      const recipient = "0x0000000000000000000000000000000000000505";
      const contractMethod = Abi.methodID("UnRegister", []);
      const createTransaction = await web3.eth.accounts.signTransaction(
        {
          from: account.address,
          to: recipient,
          value: "0x0",
          gas: "53000",
          data: contractMethod,
        },
        this.privateKey
      );

      const createReceipt = await web3.eth.sendSignedTransaction(
        createTransaction.rawTransaction
      );
      alert(
        `Validator successfully unregistered! TxID: ${createReceipt.transactionHash}`
      ); // new alert
      console.log(
        `Validator unregistered succesfully with tx ID: ${createReceipt.transactionHash}`
      );
    },
  },
};
</script>
<template>
  <div class="body-container">
        <div class="hero__logo" v-show="address == null">
      <img src="../assets/images/logo.png" alt="" width="100" />
    </div>
    <div class="hero__title-page" v-show="address == null">{{ $t("pages.send.pageName") }} </div>
    <div class="hero__subTitle2" v-show="address == null">Please make sure you are using</div>
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
    

    <!-- Wallet Info -->
    <div class="wallet-container" v-show="address !== null">
    
    <div class="wallet-container-left">
    <div class="hero__walInfoAddLeft" v-show="address !== null">Wallet Address</div>
     <div class="hero__walInfoAddLeft">
      {{ address }}
     </div>
    </div>
    


     <div class="wallet-container-right">
    <div class="hero__walInfoAddRight" v-show="balance !== null">Your Balance</div>
    <div class="hero__walInfoAddRight" v-show="balance !== null">
      {{ balance }} <span class="hero__neat">NEAT</span>
    </div>
        <div class="hero__walInfoAddRight" v-show="staked !== '0'">
      {{ staked }} <span class="hero__neat">NEAT</span>
    </div>
        <div class="hero__walInfoAddRight" v-show="reward !== '0'">
      {{ reward }} <span class="hero__neat">NEAT</span>
    </div>
     </div>

   
    </div>
    <!-- END -->

    
  </div>
</template>

<script>
const Account = require("neatioapi").account;
const Nat = require("neatioapi").nat;
const Utils = require("neatioapi").utils;
const URL = "https://scan.neatio.net";



import axios from "axios";

export default {
  name: "SendPK",

  data() {
    return {
      keyInput: null,
      address: null,
      balance: null,
      staked: null,
      reward: null,
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
        console.log(keyError)
        return;
      }
      else {
      const privateKey = "0x" + this.keyInput;
      const wallet = Account.fromPrivate(privateKey);
      this.address = wallet.address;
      this.privateKey = wallet.privateKey;
      const address = this.address;
      const DATA = {
        jsonrpc: "2.0",
        method: "neat_getBalanceDetail",
        params: [`${address}`, "latest", true],
        id: 1,
      };

        axios.post(URL, DATA).then((response) => {
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
    }
    },


// async neatSend () {   const privateKey = "0x" + this.keyInput;   
//     const account = web3.eth.accounts.privateKeyToAccount(privateKey);
//        // console.log(account);
//      const addressFrom = account.address;
//     // console.log(addressFrom);

//   const amountToSend = this.amountToSend;
//   const addressTo = this.addressToSend;
//    console.log(
//       `Sending... ${addressFrom} to ${addressTo}`
//    );

//    const createTransaction = await web3.eth.accounts.signTransaction(
//       {
//          from: addressFrom,
//          to: addressTo,
//          value: web3.utils.toWei(`${amountToSend}`, 'ether'),
//          gas: '53000',
//       },
//       privateKey
//    );

//    const createReceipt = await web3.eth.sendSignedTransaction(
//       createTransaction.rawTransaction
     
//    );

//    console.log(
//       `Transaction confirmed: ${createReceipt.transactionHash}`
//    );
// },



  },
};
</script>
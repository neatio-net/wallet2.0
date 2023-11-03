<template>
  <div class="body-container">
    <div class="hero__subTitle2" v-show="address == null">
      Please make sure you are visiting
      <div class="hero__subTitle7" v-show="address == null">
        <b-icon-lock-fill></b-icon-lock-fill> https://wallet.neatio.net
      </div>
    </div>

    <div class="hero__subTitle2" v-show="address !== null">
          Address
        </div>
        <div class="hero__title">
          {{ address }}
        </div>

        <!-- <div class="box-btn">
          <div class="box7" v-show="address !== null">
          <button class="ripplex" id="rpp1" @click="swStake">Send</button>
        </div>
        <div class="box8" v-show="address !== null">
          <button class="ripplex" id="rpp2" @click="swStake">Stake</button>
        </div>
        </div> -->
  
    <Tabs>

    
     <Tab name="transfer" >
    <div class="box1" id="box11" >
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

      <div class="hero__walletInfo" v-show="address !== null">
        <!-- <div class="hero__subTitle2" v-show="address !== null">
          WALLET ADDRESS
        </div>
        <div class="hero__title">
          {{ address }}
        </div> -->
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
        <div class="hero__subTitle2" v-show="balance !== null">
          BALANCE
        </div>
        <div class="hero__bal" v-show="balance !== null">
          {{ balance }} <span class="hero__neat">NIO</span>
        </div>
      </div>

      <div class="hero__title" v-show="address !== null"></div>
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
    </Tab>


 <Tab name="stakex">

    <div class="box2" id="box22" >
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

      <div class="hero__walletInfo" v-show="address !== null">
        <!-- <div class="hero__subTitle2" v-show="address !== null">
          WALLET ADDRESS
        </div>
        <div class="hero__title">
          {{ address }}
        </div> -->
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
        <div class="hero__subTitle2" v-show="balance !== null">
          BALANCE
        </div>
        <div class="hero__bal" v-show="balance !== null">
          {{ balance }} <span class="hero__neat">NIO</span>
        </div>
      </div>

      <div class="hero__title" v-show="address !== null"></div>
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
  </Tab>
    </Tabs>
  </div>
</template>

<script>

const Account = require("nio-api").account;
const Transaction = require("nio-api").transaction;
const RPC = require("nio-api").rpc;
const Nat = require("nio-api").nat;
const Utils = require("nio-api").utils;
const URL = "https://rpc.neatio.net";

import axios from "axios";
import Tab from "@/components/Tab";
import Tabs from "@/components/Tabs";

export default {
  name: "SendPK",
  components: {
      Tab,
      Tabs
  },
  data() {
    return {
      keyInput: null,
      address: null,
      addry: null,
      balance: null,
      sending: null,
      transactionHash: null,
      amountToSend: null,
      addressToSend: null,
      keyError: null,
      txHash: null,

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
                (this.balance = Utils.toNio(
                  Nat.toString(response.data.result)
                ))
            );
        }, 3500);
      }
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

    swStake()  {
  

            if (document.getElementById('box11')) {

                if (document.getElementById('box11').style.display == 'none') {
                    document.getElementById('box11').style.display = 'block';
                    document.getElementById('box22').style.display = 'none';
                }
                else {
                    document.getElementById('box11').style.display = 'none';
                    document.getElementById('box22').style.display = 'block';
                }
                
            }
            

     },

    neatStake() {
      // code
    }

  },
};
</script>
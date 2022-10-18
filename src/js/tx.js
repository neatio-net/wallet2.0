const Web3 = require('web3');

// Variables definition
const privKey =
 'd85d6232d014261468a5d28b86f72e0fedb3de7f77dd00dd3aca2497e7027f8d'; // Genesis private key
const addressFrom = '0x07FB382c9d47541a21e71141b5a52954dEf5F269';
const addressTo = '0xf26d305f1542d73c5c551d89e6ec33d951765188';
const web3 = new Web3('https://scan.neatio.net');

// Create transaction
const deploy = async () => {
   console.log(
      `Attempting to make transaction from ${addressFrom} to ${addressTo}`
   );

   const createTransaction = await web3.eth.accounts.signTransaction(
      {
         from: addressFrom,
         to: addressTo,
         value: web3.utils.toWei('1', 'ether'),
         gas: '21000',
      },
      privKey
   );

   // Deploy transaction
   const createReceipt = await web3.eth.sendSignedTransaction(
      createTransaction.rawTransaction
   );
   console.log(
      `Transaction successful with hash: ${createReceipt.transactionHash}`
   );
};

deploy();

module.exports = deploy;
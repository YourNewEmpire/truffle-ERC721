const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const fs = require('fs');
const path = require("path");

//prerequisite vars.
const MNEMONIC = fs.readFileSync(".secret").toString().trim()
const API_KEY = fs.readFileSync(".apikey").toString().trim()
const OWNER_ADDRESS = "0xdd079a5B0CDa6707960197a6B195a436E3CE7836";
const OLD_NFT_CONTRACT_ADDRESS = '0x21685b5c0aaEc1169E3AA69f18A69b55Db2c04ff';
const NFT_CONTRACT_ADDRESS = '0xFB6c3bFeb4cF437Eb63aAF60739b69581d74B3d4'
const USERS_ADDRESS = '0x296477206a6cAa99f032D798E327bfF41D05f00B';
const NUM_ITEMS = 5;

//Parse the contract artifact for ABI reference.
let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/GameItem.json"));
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi

async function main() {

  try {
    const provider = new HDWalletProvider(
      MNEMONIC,
      `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`
    );
    const web3Instance = new web3(provider);


    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
    );

    //award item for each in const
    for (var i = 0; i < NUM_ITEMS; i++) {

      /*
        The base URI is already set in the contract, all i need is the tokenID, 
        which is from the for loop, i 
      */
      await nftContract.methods
        .mintItem(OWNER_ADDRESS, i)
        .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));

    }
  }
  catch (e) {
    console.log(e)
  }
}

async function testMatic() {

  try {
    const provider = new HDWalletProvider(
      MNEMONIC,
      `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`
    );
    const web3Instance = new web3(provider);


    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
    );

    //award item for each in const


    /*
      The base URI is already set in the contract, all i need is the tokenID, 
      which is from the for loop, i 
    */
    await nftContract.methods
      .transferItem(USERS_ADDRESS, 1)
      .send({ from: OWNER_ADDRESS }).then(console.log('transfered')).catch(error => console.log(error));


  }
  catch (e) {
    console.log(e)
  }
}

main().then(() => process.exit(0))
  .catch(error => {
    console.error(error);
    process.exit(1);
  });

const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const fs = require('fs');
const path = require("path");

//prerequisite vars.
const MNEMONIC = fs.readFileSync(".secret").toString().trim()
const API_KEY = fs.readFileSync(".apikey").toString().trim()
const OWNER_ADDRESS = "0xdd079a5B0CDa6707960197a6B195a436E3CE7836";
const NFT_CONTRACT_ADDRESS = '0xf79349d03E0A2BfFD5Ea27B512D51Bd84289E72A';
const NUM_ITEMS = 5;

//Parse the contract artifact for ABI reference.
let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/GameItem.json"));
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi

async function main() {

  try {
    const provider = new HDWalletProvider(
      MNEMONIC,
      `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`  );
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
        .awardItem(OWNER_ADDRESS, i)
        .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));

    }
  }
  catch (e) {
    console.log(e)
  }
}

main();

const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const fs = require('fs');
const path = require("path");

//*prerequisite vars.
const MNEMONIC = fs.readFileSync(".secret").toString().trim()
const API_KEY = fs.readFileSync(".apikey").toString().trim()
const OWNER_ADDRESS = "0xdd079a5B0CDa6707960197a6B195a436E3CE7836";
const USERS_ADDRESS = '0x296477206a6cAa99f032D798E327bfF41D05f00B';
const SECOND_OWNER = "0x2e9A82c1e0165b6F9f18c8aB2F98a7f44174d345"
const OLD_NFT_CONTRACT_ADDRESS = '0x0f99ed1683A190CC082cB8e20CAFb2Cce708E04b';
const NFT_CONTRACT_ADDRESS = '0xbb21662c2ba070db869c94d475f78b9fa7273b0e'
const MUMBAI = `https://rpc-mumbai.maticvigil.com/v1/${API_KEY}`
const MATIC = `https://rpc-mainnet.maticvigil.com/v1/${API_KEY}`
const NUM_ITEMS = 5;


//*Parse the contract artifact for ABI reference.
let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/GameItem.json"));
let contractAbi = JSON.parse(rawdata);
const NFT_ABI = contractAbi.abi

async function main() {

  try {
    //*define web3 instances
    const provider = new HDWalletProvider(
      MNEMONIC,
      MATIC
    );

    const web3Instance = new web3(provider);

    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
    );


      //* just mint 1
    await nftContract.methods
      .mintItem(OWNER_ADDRESS, `https://ipfs.io/ipfs/QmZ13J2TyXTKjjyA46rYENRQYxEKjGtG6qyxUSXwhJZmZt/5.json`)
      .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));


    //* mint for a certain amount
    /*
    for (var i = 1; i < NUM_ITEMS; i++) {
      await nftContract.methods
        .mintItem(OWNER_ADDRESS, `https://ipfs.io/ipfs/QmZ13J2TyXTKjjyA46rYENRQYxEKjGtG6qyxUSXwhJZmZt/${i}.json`)
        .send({ from: OWNER_ADDRESS }).then(console.log('minted')).catch(error => console.log(error));
    }
    */
  }
  
  catch (e) {
    console.log(e)
  }
}

async function testMatic() {

  try {
    const provider = new HDWalletProvider(
      MNEMONIC, MATIC
    );
    const web3Instance = new web3(provider);


    const nftContract = new web3Instance.eth.Contract(
      NFT_ABI,
      NFT_CONTRACT_ADDRESS,
    );


    for (var i = 1; i < NUM_ITEMS; i++) {
      await nftContract.methods
        .tokenURI(i).call().then((receipt) => {
          console.log(receipt)
        }).catch(err => console.log(err))

    }
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

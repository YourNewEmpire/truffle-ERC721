const HDWalletProvider = require('@truffle/hdwallet-provider');
const web3 = require("web3");
const fs = require('fs');
const path = require("path");

const MNEMONIC = fs.readFileSync(".secret").toString().trim()
const NFT_CONTRACT_ADDRESS = '0xf79349d03E0A2BfFD5Ea27B512D51Bd84289E72A';
let rawdata = fs.readFileSync(path.resolve(__dirname, "../build/contracts/GameItem.json"));
let contractAbi = JSON.parse(rawdata);

const NFT_ABI = contractAbi.abi

//test script for calculating token uris based off an address (the user )

async function main() {

      const walletAddress = "0xdd079a5B0CDa6707960197a6B195a436E3CE7836"
      let usersURIs = []



      try {
            const provider = new HDWalletProvider(
                  MNEMONIC,
                  `https://rpc-mumbai.maticvigil.com/v1/f7178baf2319f5704d765be9c095e1b9c94ceb1f`);
            const web3Instance = new web3(provider);

            const nftContract = new web3Instance.eth.Contract(
                  NFT_ABI,
                  NFT_CONTRACT_ADDRESS,
            );
            async function pushURIs(total) {
                  for (i = 1; i <= total; i++) {
                        await nftContract.methods.ownerOf(i).call().then(res => {
                              if (res === walletAddress) {
                                    usersURIs.push(`https://contract-abis.herokuapp.com/api/token/${i}`)
                                    console.log(usersURIs)
                              }
                              else{
                                    console.log("user is empty")
                              }
                        }
                        )
                  }
            };


            await nftContract.methods
                  .totalSupply()
                  .call().then(res => pushURIs(res))
                  .catch(error => console.log(error));




      }
      catch (e) {
            console.log(e)
      }
}

main();

require("@nomicfoundation/hardhat-toolbox");
require("@nomiclabs/hardhat-ethers");
require('dotenv').config();

/** @type import('hardhat/config').HardhatUserConfig */
const API_URL = process.env.API_URL;
const PRIVATE_KEY = process.env.PRIVATE_KEY;

module.exports = {
    solidity: "0.8.20",
    defaultNetwork: "sepolia",
    networks: {
      hardhat: {},
      sepolia: {
        url: API_URL,
        accounts: [PRIVATE_KEY]
      },
    },
    etherscan: {
      apiKey: { 
        sepolia: process.env.ETHERSCAN_API_KEY,
    },
  }
};
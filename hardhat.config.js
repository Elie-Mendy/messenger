// import hardhat
require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: "0.8.19",
  // idicate the artifacts path 
  paths: {
    artifacts: './src/artifacts',
  },
  // settings for network connection
  networks: {
    hardhat: {
      chainId: 1337
    }
  }
};
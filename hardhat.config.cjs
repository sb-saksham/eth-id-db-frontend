require("@nomicfoundation/hardhat-toolbox");

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.18",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  paths: {
    sources: "./contracts/",
    artifacts: "./src/artifacts/",

  },
  networks: {
    sepolia: {
      url: `https://eth-sepolia.g.alchemy.com/v2/PF-BRAa65EWNg_chNAgVzPlwX_ScyX2K`,//${process.env.REACT_APP_API_SEPOLIA_KEY}`,
      accounts: ["c2e30e588048137558857889b1f99602ff7f5f8ece130d7a74c3e3c853d0a183"] //[process.env.REACT_APP_PRIVATE_KEY]
    }
  }
};

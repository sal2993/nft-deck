/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("@nomiclabs/hardhat-waffle");
require("dotenv/config");

const { HARDHAT_PORT } = process.env;

module.exports = {
  solidity: "0.7.3",
  networks: {
    localhost: { url: `http://127.0.0.1:${HARDHAT_PORT}` },
    hardhat: {
      accounts: [{"privateKey":"0xffd42249fc35d9480ced445e6724ad854eb7f3e093764ba13b8a20d4ce532a9d","balance":"1000000000000000000000"},{"privateKey":"0xc24ba6f0a5df993339e15c614a35dd5fcde65547804261377e15c8db0c8c5700","balance":"1000000000000000000000"},{"privateKey":"0xb32ec5dfe05bc1b793d883e86b0f6eafa9ffd3b0fca0643386040c28fa6955db","balance":"1000000000000000000000"},{"privateKey":"0x94b384e8aeb2ff0d323190021ba95425e002d4ca6c084f25d9d4c59c60a57092","balance":"1000000000000000000000"},{"privateKey":"0x5f040f8b43a10e759b07e726883b422150f68cf210dccd6598af61fd54c28ff9","balance":"1000000000000000000000"},{"privateKey":"0xb3ca0d3ff34eb9de938a2e2f6587d148c324faa9cfe4cb7b91a5f39884421977","balance":"1000000000000000000000"},{"privateKey":"0x647f8872b5b8881e43e4f54e407de3397be6453ada80e1316a915e968dc90795","balance":"1000000000000000000000"},{"privateKey":"0x7fa656bb5d1bbc96d6c0de71443d7e557c56b29bd898cd78d6e02eeb16cbea32","balance":"1000000000000000000000"},{"privateKey":"0x92938de20378884cbeef8abdfa9a2de44f5eb918cd8c8e279a72c4a6df8c78ee","balance":"1000000000000000000000"},{"privateKey":"0x14ae2808e77447356e14f6fff5057e2cb348cafa7fb6c08a44858225efbc0f99","balance":"1000000000000000000000"}]
    },
  },
  paths: {
    sources: './contracts',
    tests: './__tests__/contracts',
    cache: './cache',
    artifacts: './artifacts',
  },
};
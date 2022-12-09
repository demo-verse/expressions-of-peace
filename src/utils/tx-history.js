const { Alchemy, Network } = require("alchemy-sdk");
const InputDataDecoder = require("ethereum-input-data-decoder");
const ExpressionOfPeace_GoerliV2 = require("../artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace_GoerliV2.json");
const expressionOfPeaceABI_GoerliV2 = ExpressionOfPeace_GoerliV2;
const creds = require("../creds.json");

const config = {
  apiKey: creds.ALCHEMY_GOERLI_APIKEY,
  network: Network.ETH_GOERLI,
};

const alchemy = new Alchemy(config);

// get inputs for a given TX.
async function getData() {
  return await alchemy.core.getTransaction(
    "0xd1558939e98b90f3f29005a2d74fa0d6fbf95504ef8187ebb38b0d5612333431"
  );
}

getData().then((res) => {
  const decoder = new InputDataDecoder(expressionOfPeaceABI_GoerliV2);
  const result = decoder.decodeData(res.data);
  console.log(result.inputs);
});
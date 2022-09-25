import "./App.css";
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import ReactFlagsSelect from "react-flags-select";
import { hasFlag, countries } from "country-flag-icons";

import getUnicodeFlagIcon from "country-flag-icons/unicode";

// import { makeNFT } from "./NFTMaker";
// import ExpressionOfPeace from "./artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace_Rinkeby.json";
import ExpressionOfPeace_Goerli from "./artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace_Goerli.json";
import ExpressionOfPeace_GoerliV2 from "./artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace_GoerliV2.json";
// const expressionOfPeaceAddress = "0x6d584295790d2C9f7F2D4249B6CAebC15b1DA682";
// const expressionOfPeaceAddress_Goerli =
//   "0xe563950E3d97c1CF11665163D4B14EAD092C503C";

const expressionOfPeaceAddress_GoerliV2 =
  "0x82e4afb4c80f84ffa2c95af29293c538f96f726e";
// ABI so the web3 library knows how to interact with our contract
// const expressionOfPeaceABI = ExpressionOfPeace;
// const expressionOfPeaceABI_Goerli = ExpressionOfPeace_Goerli;
const expressionOfPeaceABI_GoerliV2 = ExpressionOfPeace_GoerliV2;

const CHAIN_ID_GOERLI = 5; // goerli testnet @ ethereum

const Expressions = () => {
  // const [provider, setProvider] = useState();
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("click to read last expression");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [lastCountry, setLastCountry] = useState("");
  const [countryFlagExists, setCountryFlagExists] = useState(false);

  useEffect(() => {
    console.log(`selected country as: ${selectedCountry}`);
  }, [selectedCountry]);

  const networkHandler = async (_currentChainId) => {
    function dec2hex(i) {
      return `0x${i.toString(16)}`;
    }
    async function requestSwitchNetwork(_currentChainId) {
      try {
        const hexChainId = dec2hex(_currentChainId);
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: hexChainId }],
        });
      } catch (switchError) {
        // This error code indicates that the Görli network was not present @ the MetaMask wallet.
        if (switchError.code === 4902) {
          console.log(
            "This network is not available in your metamask, please add it manually."
          );
        }
        console.log("Failed to switch to the network");
      }
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    if (provider) {
      // if wallet is not connected to rinkeby of goerli networks already,
      // request switch network. (writig one of them depending on availability.
      // note that rinkeby will be closed down in October 2022.
      if (window.ethereum && _currentChainId !== Number(CHAIN_ID_GOERLI)) {
        // setNetworkValid(false);
        console.log("switching to goerli for now.");
        // setDesiredChainId(CHAIN_ID_GOERLI);
        requestSwitchNetwork(CHAIN_ID_GOERLI);
      } else {
        console.log("network is valid");
      }
    } else {
      console.log("no provider");
    }
  };
  // handles submit button
  // add textual version  of the expression
  const handleSubmit = async (e) => {
    // stops page from refreshing
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    networkHandler();

    // create instance of contract using our contract address, abi, and provider
    const contract = new ethers.Contract(
      expressionOfPeaceAddress_GoerliV2,
      expressionOfPeaceABI_GoerliV2,
      provider
    );

    // a signer is necessary when we want to write to blockchain
    // a wallet doesn't need to sign/spend any gas to read from blockchain
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);

    if (inputValue.length > 0 &&  selectedCountry.length > 0) {
      await contractWithSigner.express_as_citizen(inputValue, selectedCountry);
    } else if (inputValue.length > 0 && !selectedCountry.length > 0){
      await contractWithSigner.just_express(inputValue);
    } else {
      alert('Please express peace, as in the text area.') // alert for now 
    }

    // await contractWithSigner.set(inputValue);
    // setAlreadySigned(true);
  };

  const handleRetrieveData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    networkHandler();
    console.log("retreiving data..");
    const expressionOfPeaceContract = new ethers.Contract(
      expressionOfPeaceAddress_GoerliV2,
      expressionOfPeaceABI_GoerliV2,
      provider
    );

    //get last expression tuple (array),
    //storing current_expression at its index 0
    // and citizenship info as ISO code of country, at index 1.
    //https://www.countrycode.org/

    const expression = await expressionOfPeaceContract.read();
    let expressionTxt = "";
    let countryISO = "";

    if (expression.length > 1) {
      expressionTxt = expression[0];
      countryISO = expression[1];
      setValue(expressionTxt);
      setLastCountry(countryISO);
      if (countries.includes(countryISO) === true) {
        setCountryFlagExists(true);
      }
    }
    console.log(`expression text: ${JSON.stringify(expressionTxt)}`);
    console.log(`last read country code: ${JSON.stringify(countryISO)}`);
  };

  return (
    <section className="cards">
      <div className="last-expression-card">
        <h2>last expression</h2>
        <button onClick={handleRetrieveData}>read</button>

        <p>{value}</p>
        {lastCountry.length > 0 ? (
          <>expressed by someone from {getUnicodeFlagIcon(lastCountry)}</>
        ) : null}
      </div>

      <div className="new-expression-card">
        <h2>yours, sincerely</h2>
        
        <form onSubmit={handleSubmit} className="input">
          <textarea
            type="text"
            required
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            // onKeyPress={(e) => e.preventDefault()}
            // onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}

            name="value"
            placeholder="how would you imagine, express and make a World Peace?"
          />
          {/* <div className="checkbox">
          including ref? {refIncluded} <input
            type="checkbox"
            checked={refIncluded}
            onChange={(e) => handleRefToggle(e.target.checked)}
          />
        </div> */}
        <div className="columns">
        <div className="country-select">
          optionally, add your citizenship <br></br><br></br>
        <ReactFlagsSelect
          selected={selectedCountry}
          className= "flags-menu"
          optionsSize={16}
          selectedSize={18}
          searchPlaceholder="type to search"
          
          fullWidth={false}
          onSelect={(countryCode) => setSelectedCountry(countryCode)}
          searchable
        />
      </div>  
          <div className="sign-button">
          <button>sign</button>
          </div>
        </div>
          {/* {alreadySigned ? (
          <button onClick={generateNFT}> make nft</button>
        ) : (
          <button onClick={generateNFT} disabled>
            {" "}
            make nft
          </button>
        )} */}
        </form>

        {/* {nftGenerarated ? (
        <iframe
          src="https://thentic.tech/request?id=nC9mNnMiFIi2kKru"
          title="your nft"
          height="360px"
          width="360px"
        ></iframe>
      ) : null} */}
      </div>
     
    </section>
  );
};

export default Expressions;

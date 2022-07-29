import { useEffect, useState } from "react";
import { ethers } from "ethers";

import "./App.css";
import ExpressionOfPeace from "./artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace.json";

// NOTE: Make sure to change this to the contract address you deployed
const expressionOfPeaceAddress = "0x6d584295790d2C9f7F2D4249B6CAebC15b1DA682";
// ABI so the web3 library knows how to interact with our contract
const expressionOfPeaceABI = ExpressionOfPeace;

// NOTE: checkout the API for ethers.js here: https://docs.ethers.io/v5/api/
// TIP: Remember to console.log something if you are unsure of what is being returned

const App = () => {
  const [provider, setProvider] = useState();
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("...");
  // const [blockNumber, setBlockNumber] = useState("0");
  // const [gasPrice, setGasPrice] = useState("0");
  const [account, setAccount] = useState("");
  // const [balance, setBalance] = useState("");
  const [connected, setConnected] = useState(false);
  // const [refIncluded, setRefIncluded] = useState(false);

  // Will run once everytime a user connects to the dapp
  useEffect(() => {
    // check if ethereum is provided by something like Metamask
    if (typeof window.ethereum !== "undefined") {
      console.log("ethereum is available");

      // get provider injected by metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);

      // Set some data like block number and gas price provided, you can find more options in the API docs
      // const setBlockchainData = async () => {
      //   setBlockNumber(await provider.getBlockNumber());
      //   let gasPrice = await provider.getGasPrice();
      //   // formats a returned big number as gwei where 1,000,000,000 gwei is 1 ether
      //   // you can read about more denominations here: https://ethdocs.org/en/latest/ether.html
      //   gasPrice = Math.trunc(ethers.utils.formatUnits(gasPrice, "gwei"));
      //   setGasPrice(gasPrice);
      // };

      // Set aquired blockchain data as state to use in our frontend
      // setBlockchainData();

      // Set provider so we can use it in other functions
      setProvider(provider);
    }
  }, []);

  // handles setting account and balance
  const accountHandler = async (account) => {
    setAccount(account);
    // const balance = await provider.getBalance(account);
    // notice that we use format ether here, uncomment the following console.log and see what happens if we don't
    // setBalance(ethers.utils.formatEther(balance));
  };



  // handles connecting account
  const connectHandler = async () => {
    // MetaMask requires requesting permission to connect users accounts
    await provider.send("eth_requestAccounts", []);
    const accountList = await provider.listAccounts();
    console.log(accountList);
    accountHandler(accountList[0]);
    setConnected(!connected);
  };

  // const handleRefToggle = async () => {
  //   setRefIncluded(!refIncluded);
  // }

  // handles submit button
  // add textual version  of the expression
  const handleSubmit = async (e) => {
    // stops page from refreshing
    e.preventDefault();

    // create instance of contract using our contract address, abi, and provider
    const contract = new ethers.Contract(
      expressionOfPeaceAddress,
      expressionOfPeaceABI,
      provider
    );

    // a signer is necessary when your want to write to the blockchain
    // your wallet doesn't need to sign or spend any ether to read from the blockchain
    // but it does need to spend ether and therefore sign to write to the blockchain
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    // we can use 'set' here because the abi provides us with a reference to the methods defined in our smart contract
    console.log(await contractWithSigner.set(inputValue));
    // console.log(inputValue);
  };

  const handleRetrieveData = async () => {
    const expressionOfPeaceContract = new ethers.Contract(
      expressionOfPeaceAddress,
      expressionOfPeaceABI,
      provider
    );
    // we can use 'get' here because the abi provides us with a reference to the methods defined in our smart contract

    //get current value
    const expressionTxt = await expressionOfPeaceContract.get();
    // console.log(`Expression of Peace: ${expressionTxt}`);
    setValue(expressionTxt);
    // console.log(`value from contract: ${await expressionOfPeaceContract.get()}`);
  };

  return (
    <div className="layout">
      <header className="navbar">
        <div className="container">
          <div className="logo">Expressions of Peace</div>
          {connected ? (
            <div>
              {/* <label>
                {`${Number.parseFloat(balance).toPrecision(4)} ETH`}
              </label> */}
              hi,
              <button className="account-button" onClick={connectHandler}>
                {account.substring(0, 5)}...
                {account.substring(account.length - 4)}
              </button>
            </div>
          ) : (
            <button className="connect-button" onClick={connectHandler}>
              connect
            </button>
          )}
        </div>
      </header>
      {connected ? (
        <section className="cards">
          <div className="card">
            <h2>last expression</h2>
            <button onClick={handleRetrieveData}>read </button>
            {/* <p>{value.length > 600 ? (
              <>
              {value.substring(0, 400)} ... <a > read all</a>
              </>
            ) : value}</p> */}
            <p>{value}</p>
          </div>
          <div className="card">
            <h2>yours, sincerely</h2>
            <form onSubmit={handleSubmit}>
              <textarea
                type="text"
                required
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                // onKeyPress={(e) => e.preventDefault()}
                // onKeyPress={(e) => !/[0-9]/.test(e.key) && e.preventDefault()}

                name="value"
                placeholder="how would you imagine and express a world peace?"
              />
              {/* <div className="checkbox">
                including ref? {refIncluded} <input
                  type="checkbox"
                  checked={refIncluded}
                  onChange={(e) => handleRefToggle(e.target.checked)}
                />
              </div> */}
              <button>sign</button>
            </form>
          </div>
        </section>
      ) : (
        <></>
      )}

      <footer>
        <div className="container">
          please do not refresh the page <br></br> until your expression is
          signed.
          {/* {gasPrice} gwei &bull; {blockNumber} */}
        </div>
      </footer>
    </div>
  );
};

export default App;

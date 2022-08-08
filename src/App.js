import { useState } from "react";
import { ethers } from "ethers";

// import "dotenv/config"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
import "./App.css";
import ExpressionOfPeace from "./artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace.json";

// will initiate all chains with their test networks.
// first, ethereum's rinkeby test network.
// later, we'll deploy contracts in the other test networks as well.
// all here. https://en.wikipedia.org/wiki/List_of_blockchains

// NOTE: Make sure to change this to the contract address you deployed
const expressionOfPeaceAddress = "0x6d584295790d2C9f7F2D4249B6CAebC15b1DA682";
// ABI so the web3 library knows how to interact with our contract
const expressionOfPeaceABI = ExpressionOfPeace;
const CHAIN_ID = 4; // rinkeby testnet @ ethereum

// NOTE: checkout the API for ethers.js here: https://docs.ethers.io/v5/api/
// TIP: Remember to console.log something if you are unsure of what is being returned

const App = () => {
  // const [provider, setProvider] = useState();
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("...");
  // const [blockNumber, setBlockNumber] = useState("0");
  // const [gasPrice, setGasPrice] = useState("0");
  const [account, setAccount] = useState("");
  // const [balance, setBalance] = useState("");
  const [currentChainId, setCurrentChainId] = useState(null);
  const [connected, setConnected] = useState(false);
  // const [assetTransfers, setAssetTransfers] = useState([]);
  // const [refIncluded, setRefIncluded] = useState(false);

  // Will run once everytime a user connects to the dapp
  // useEffect(() => {
  //   // check if ethereum is provided by something like Metamask
  //   if (typeof window.ethereum !== "undefined") {
  //     // console.log("ethereum is available");

  //     // get provider injected by metamask
  //     const provider = new ethers.providers.Web3Provider(window.ethereum);

  //     // Set some data like block number and gas price provided, you can find more options in the API docs
  //     // const setBlockchainData = async () => {
  //     //   setBlockNumber(await provider.getBlockNumber());
  //     //   let gasPrice = await provider.getGasPrice();
  //     //   // formats a returned big number as gwei where 1,000,000,000 gwei is 1 ether
  //     //   // you can read about more denominations here: https://ethdocs.org/en/latest/ether.html
  //     //   gasPrice = Math.trunc(ethers.utils.formatUnits(gasPrice, "gwei"));
  //     //   setGasPrice(gasPrice);
  //     // };

  //     // Set aquired blockchain data as state to use in our frontend
  //     // setBlockchainData();

  //     // Set provider so we can use it in other functions
  //     setProvider(provider);
  //   } else {
  //     console.log("install metamask");
  //   }
  // }, []);

  // useEffect(() => {

  // }, [connected, currentChainId, asdf]);

  // handles setting account and balance
  const accountHandler = async (account) => {
    setAccount(account);

    // const balance = await provider.getBalance(account);
    // notice that we use format ether here, uncomment the following console.log and see what happens if we don't
    // setBalance(ethers.utils.formatEther(balance));
  };

  const networkHandler = async (networkId) => {
    function dec2hex(i) {
      return `0x${i.toString(16)}`;
    }
    async function requestSwitchNetwork() {
      try {
        const hexChainId = dec2hex(CHAIN_ID);
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: hexChainId }],
        });
      } catch (switchError) {
        // This error code indicates that the chain has not been added to MetaMask.
        if (switchError.code === 4902) {
          console.log(
            "This network is not available in your metamask, please add it"
          );
        }
        console.log("Failed to switch to the network");
      }
    }

    const provider = new ethers.providers.Web3Provider(window.ethereum);

    if (provider) {
      if (window.ethereum && currentChainId !== Number(CHAIN_ID)) {
        // setNetworkValid(false);
        console.log("switching to network: ", CHAIN_ID);
        requestSwitchNetwork();
      } else {
        console.log("wallet already connected to rinkeby");
      }
    } else {
      console.log("no provider");
    }
  };
  // handles connecting account
  const connectHandler = async () => {
    console.log("checking network status ...");
    const provider = new ethers.providers.Web3Provider(window.ethereum);

    await networkHandler();

    console.log("connecting..");
    // MetaMask requesting permission to connect users accounts if it is first time of an account.
    await provider.send("eth_requestAccounts", []);
    const accountList = await provider.listAccounts();
    // console.log(accountList);
    accountHandler(accountList[0]);
    console.log("connected to dapp with account: " + accountList[0]);

    // MetaMask requires requesting permission to connect users accounts
    const network = await provider.getNetwork();
    console.log(`network (chainid): ${network.chainId}`);
    setCurrentChainId(network.chainId);
    setConnected(true);
  };

  const disconnectHandler = async () => {
    console.log("disconnecting wallet");
    setConnected(false);
  };
  // const handleRefToggle = async () => {
  //   setRefIncluded(!refIncluded);
  // }

  // handles submit button
  // add textual version  of the expression
  const handleSubmit = async (e) => {
    // stops page from refreshing
    e.preventDefault();

    const provider = new ethers.providers.Web3Provider(window.ethereum);
    networkHandler();

    // create instance of contract using our contract address, abi, and provider
    const contract = new ethers.Contract(
      expressionOfPeaceAddress,
      expressionOfPeaceABI,
      provider
    );

    // a signer is necessary when we want to write to blockchain
    // a wallet doesn't need to sign/spend any gas to read from blockchain
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    console.log(await contractWithSigner.set(inputValue));
  };

  const handleRetrieveData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    networkHandler();
    console.log("retreiving data..");
    const expressionOfPeaceContract = new ethers.Contract(
      expressionOfPeaceAddress,
      expressionOfPeaceABI,
      provider
    );

    //get last expression value, stored as current_expression.
    // we can use 'get' here because the abi provides us with a reference to the methods defined in our smart contract
    const expressionTxt = await expressionOfPeaceContract.get();
    setValue(expressionTxt);
  };

  return (
    <div className="layout">
      <header className="navbar">
        <div className="container">
          <div className="logo">
            <a href="https://expressionsofpeace.org">
            Expressions of Peace
            </a> 
            </div>
        </div>
      </header>
      {connected ? (
        <section className="cards">
          <div className="last-expression-card">
            <h2>last expression</h2>
            <button onClick={handleRetrieveData}>read</button>

            <p>{value}</p>
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
        <section className="expressions">
          <h2>
            {" "}
            <span>what </span> is this?
          </h2>
          <p>
            {" "}
            This is an open sourced and minded tool to illustrate and make{" "}
            <strong>a World Peace</strong>, catayzed via tech and creativity.
          </p>
          <p>
            {" "}
            Expressions of Peace, extend the Freedom of Expression; as a right
            to experience, as a multi-generation civilisation:{" "}
            <strong>#GenerationPeace</strong>.
          </p>

          <h2>what can we observe with this app? </h2>
          <p>
            this way, any individual can express their imagination and their way
            of peace-making in the scale of billions.{" "}
          </p>
          <div className="express-yourself">
            <iframe
              width="80%"
              height="640"
              src="https://www.youtube.com/embed/jW4VZ5J0fNQ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe>
          </div>
          <br></br>
          <h2>what it takes do use this tool? </h2>
          <p>
            all one needs is a browser, {""}
            <a
              className="metamask-link"
              href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
              rel="noreferrer"
              target="_blank"
            >
              a metamask wallet,
            </a>{" "}
            and a few clicks to sign and confirm what you wanted to express.
          </p>
          <p><span style={{fontStyle: "italic"}}> ~ a better guide will be added soon.</span></p>

          <div className="centered">
            {connected ? (
              <div className="after-connect">
                {/* <label>
                {`${Number.parseFloat(balance).toPrecision(4)} ETH`}
              </label> */}
                hi,
                <button className="account-button" onClick={disconnectHandler}>
                  {account.substring(0, 5)}...
                  {account.substring(account.length - 4)}
                </button>
              </div>
            ) : (
              <button className="connect-button" onClick={connectHandler}>
                connect metamask
              </button>
            )}
          </div>
<br></br>
          <h2>
            <span>why </span> blockchain is core part of it?{" "}
          </h2>
          <p>
            afterall, these are letters, from you, to the rest of the world.
          </p>
          <p>
            smart contracts, are mailboxes {"("}to be available{")"}{" "}
            <a
              href="https://en.wikipedia.org/wiki/List_of_blockchains"
              target={"_blank"}
              rel="noreferrer"
            >
              in each network
            </a>{" "}
            for this purpose. 
          </p>
          <p>we have initiated the first mailbox contract on the rinkeby testnet. </p>
          <p>Learn more about test networks and mainnet <a href="https://blog.logrocket.com/mainnet-vs-testnet-environments-explained/" target={"_blank"} rel="noreferrer">
          here. </a> </p>
          <p>
            - based on a distributed consensus algorithm,
            <br></br>- transparent, immutable, open-source
            <br></br>- cannot be censored or shut down <strong>*</strong>
            <br></br>- equally accessible to everyone <strong>**</strong>
            <br></br>- anonymity is guaranteed<strong> by design.</strong>
            {/* <br></br><span style={{paddingLeft: "30%"}}></span */}
          </p>
          <hr></hr>
          <p>
            <strong>*</strong>more research and development needed in the
            personhood/uniqueness/did
            <br></br> <br></br>
            <strong>**</strong>there are still accessibility issues possible,
            but there are ways to overcome.
          </p>
        </section>
      )}

      <footer>
        <div className="container">
          <a
            className="license-link"
            href="https://creativecommons.org/licenses/by-sa/2.0/"
            rel="noreferrer"
            target="_blank"
          >
            <img
              src="https://mirrors.creativecommons.org/presskit/buttons/88x31/svg/by-sa.svg"
              alt="creative commons shareAlike"
            ></img>
          </a>
          <a
            className="contract-at-rinkeby"
            href="https://rinkeby.etherscan.io/address/0x6d584295790d2c9f7f2d4249b6caebc15b1da682"
            rel="noreferrer"
            target="_blank"
          >
            all expressions
          </a>
          <a
            className="source-code"
            href="https://github.com/demo-verse/expressions-editor-react"
            rel="noreferrer"
            target="_blank"
          >
            source code
          </a>

          <a
            className="get-fake-eth"
            href="https://faucet.rinkeby.io/"
            rel="noreferrer"
            target="_blank"
          >
            get test eth
          </a>
          {/* {gasPrice} gwei &bull; {blockNumber} */}
        </div>
      </footer>
    </div>
  );
};

export default App;

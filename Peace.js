import { useEffect, useState } from "react";
import { ethers } from "ethers";

// import "dotenv/config"; // see https://github.com/motdotla/dotenv#how-do-i-use-dotenv-with-import
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

  const [account, setAccount] = useState("");
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    // check if ethereum is provided by something like Metamask
    if (typeof window.ethereum !== "undefined") {
      // get provider injected by metamask
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      if (provider) {
        console.log("setting provider");
        setProvider(provider);
      }
    }
  }, []);

  useEffect(() => {
    const switchNetwork = async () => {
      if (provider) {
        const network = await provider.getNetwork();
        if (network.chainId === 4) {
          await provider.send("eth_requestAccounts");
        } else {
          await provider.send("eth_switchNetwork", [4]);
        }
      }
    }
    switchNetwork();
  }
  , [connected]);

  // write a function that checks if the user is connected to the network chainid 4 (rinkeby)
  const connectedToRinkeby = async () => {
    if (provider) {
      const connected = await provider.getNetwork().then((network) => {
        if (network.chainId === 4) {
          return true;

        } else {
          return false;
        }
      });

      console.log("connected: ", connected);
    }
  };
  // write a function that gets the user's account address
  const getAccount = async () => {
    if (provider) {
      const account = await provider.listAccounts();
      setAccount(account[0]);
    }
  };
  // write a function that gets the balance of the user's account
  // const getBalance = async () => {
  //   if (provider) {
  //     const balance = await provider.getBalance(account);
  //     return balance;
  //   }}

  // write a function that switches network on metamask to rinkeby network
 


  // write a function to connect with metamask if not already connected
  const connectHandler = async () => {
    if (provider) {
      await provider.connect();
      const _connected = await connectedToRinkeby();
      if(_connected) {
        setConnected(_connected);
      }
      // await getAccount();
      // await getBalance();
      // console.log("connected", connected);
      // console.log("account", account);
      // console.log("balance", balance);
    }
  };

  // write a function to disconnect from metamask
  const disconnectHandler = async () => {
    if (provider) {
      await provider.disconnect();
      setConnected(false);
    }
  }


  // write a function to retrieve the last 5 transactions from contract addres: 0x6d584295790d2C9f7F2D4249B6CAebC15b1DA682
  const getAllTx = async () => {
    if (provider) {
      const contract = new ethers.Contract(
        expressionOfPeaceAddress,
        expressionOfPeaceABI,
        provider
      );
      const data = await contract.getPastEvents("ExpressionOfPeace", {
        fromBlock: 11111368,
        toBlock: "latest",
      });
      console.log("data", JSON.stringify(data));
      return data;
    }

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

      // a signer is necessary when we want to write to blockchain
      // a wallet doesn't need to sign/spend any gas to read from blockchain
      const signer = provider.getSigner();
      const contractWithSigner = contract.connect(signer);
      console.log(await contractWithSigner.set(inputValue));
    };

    const handleRetrieveData = async () => {
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
            <div className="logo">Expressions of Peace</div>
            {connected ? (
              <div>
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
                connect
              </button>
            )}
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
              In this context, expressions of peace, extend freedom of
              expression; as a global human right to experience.
            </p>

            <h2>
              <span>why </span> would I use this tool?{" "}
            </h2>
            <p>
              this way, any individual can express their imagination and their
              way of peace-making in the scale of billions.{" "}
            </p>

            <h2>
              <span>how </span> do I use this tool?{" "}
            </h2>
            <p>
              all you need is a browser, {""}
              <a
                className="metamask-link"
                href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
                rel="noreferrer"
                target="_blank"
              >
                a metamask wallet,
              </a>{" "}
              connected to (currently) rinkeby testnet and a few clicks. .
            </p>

            <h2>
              <span>why </span> blockchain is at core?{" "}
            </h2>
            <p>
              - decentralized, distributed
              <br></br>- transparent, immutable
              <br></br>- cannot be censored or shut down
              <br></br>- equally accessible to everyone
              <br></br>- anonymity is guaranteed<strong> by design.</strong>
              {/* <br></br><span style={{paddingLeft: "30%"}}></span */}
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
              className="source-code"
              href="https://github.com/demo-verse/expressions-editor-react"
              rel="noreferrer"
              target="_blank"
            >
              source code
            </a>
            <a
              className="contract-at-rinkeby"
              href="https://rinkeby.etherscan.io/address/0x6d584295790d2c9f7f2d4249b6caebc15b1da682"
              rel="noreferrer"
              target="_blank"
            >
              contract
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
};

export default App;

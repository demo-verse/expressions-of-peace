import { useState } from "react";
import { ethers } from "ethers";
import Expressions from "./Expressions";

const CHAIN_ID_GOERLI = 5; // goerli testnet @ ethereum
const Toolkit = () => {
  const [account, setAccount] = useState("");
  // const [balance, setBalance] = useState("");
  // const [currentChainId, setCurrentChainId] = useState(null);
  const [connected, setConnected] = useState(false);

  // handles setting account and balance
  const accountHandler = async (account) => {
    setAccount(account);
    // setBalance(ethers.utils.formatEther(balance));
  };

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
  // handles connecting account

  const disconnectHandler = async () => {
    console.log("disconnecting account");
    setAccount("");
    setConnected(false);
    // setValue("");
  };
  // const handleRefToggle = async () => {
  //   setRefIncluded(!refIncluded);
  // }

  // handles submit button
  // add textual version  of the expression

  const connectHandler = async () => {
    // window.scrollTo(0, 0);

    console.log("therefore connecting to network ...");
    // MetaMask requesting permission to connect users accounts if it is first time of an account.
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);
    const accountList = await provider.listAccounts();
    // console.log(accountList);
    accountHandler(accountList[0]);
    console.log("checking network status ...");
    const network = await provider.getNetwork();
    console.log(`current network (chainid): ${network.chainId}`);

    await networkHandler();

    console.log("connected to dapp with account: " + accountList[0]);

    // MetaMask requires requesting permission to connect users accounts
    console.log(`connected as: ${account}`);
    setConnected(true);

    // we set desiredChainId as the
  };
  return (
    <div className="centered">
      {/* <h2
        style={{
          fontSize: "1.8rem",
          marginTop: "20px",
          lineHeight: "2.4rem",
        }}
      >
        {" "}
        
      </h2> */}

      {/* <div className="centered">
          <img
            width={"80%"}
            alt="Last expression"
            // src="a_world_peace_is_imminent.png"
            src="the_peacemaker_w_joanna_s_expression.png"
          ></img>
        </div> */}

     
{/* 
      <button
        className="install-metamask-button"
        style={{
          backgroundColor: "white",
          color: "black",
        }}
      >
        <a
          href="https://www.youtube.com/watch?v=Af_lQ1zUnoM"
          target={"_blank"}
          rel="noreferrer"
        >
          install metamask wallet to sign{" "}
        </a>
      </button>

      <button
        className="install-metamask-button"
        style={{
          backgroundColor: "white",
          color: "black",
        }}
      >
        <a href="https://goerlifaucet.com" target={"_blank"} rel="noreferrer">
          get testnet ethereum to write on blockchain{" "}
        </a>
      </button> */}
   
   <div className="centered" style={{marginTop: "42px", background: "black", paddingRight:"40px", paddingLeft:"40px"}}>
          <h1 style={{color: "white", marginTop: "20px"}}>Browse'em all:</h1>
            <button
            className="ack-contract-button-goerli"
            style={{
              backgroundColor: "white",
              color: "black",
              marginBottom: "32px",
              marginTop: "12px",
            }}
          >
            <a
              className="expr-contract-at-goerli-v2"
              href="https://goerli.etherscan.io/address/0x82e4afb4c80f84ffa2c95af29293c538f96f726e"
              rel="noreferrer"
              target="_blank"
            >
              Expressions
            </a>
          </button>

          <button
            className="ack-contract-button-goerli"
            style={{
              backgroundColor: "white",
              color: "black",
              marginBottom: "32px",
              marginTop: "12px",
            }}
          >
            <a
              className="expr-contract-at-goerli-v2"
              href="https://goerli.etherscan.io/address/0x84d1c5e0915887f83e366219fb50afe06afd97be"
              rel="noreferrer"
              target="_blank"
            >
              Acknowledgements
            </a>
          </button>
        </div>
      {connected ? (
        <Expressions />
      ) : (
        <div style={{ alignSelf: "center", marginTop: "2rem" }}>
        <button style={{borderRadius: "50%"}} className="enter-dapp-button" onClick={connectHandler}>
          express yourself
        </button>
      </div>
      )}
         {!connected ? null : (
       <>
        <div style={{ alignSelf: "center", marginTop: "2rem" }}>
          <button style={{ backgroundColor: "black", color:"red", borderRadius: "50%"}} className="enter-dapp-button" onClick={disconnectHandler}>
            I'm good.
          </button>


          
        </div>
        </>
      )}
    </div>
  );
};

export default Toolkit;

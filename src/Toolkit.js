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
        <br></br>
         <button
              className="read-guide-button"
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              <a
                href="https://www.canva.com/design/DAFJb1m8MxA/olzSyTC7tGyGkbUrSBhMfQ/edit?utm_content=DAFJb1m8MxA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton"
                target={"_blank"}
                rel="noreferrer"
              >
                install{" "}
              </a>
            </button>
         {!connected ? null : (
            <div style={{ alignSelf: "center", marginTop:"2rem" }}>
              <button className="enter-dapp-button" onClick={disconnectHandler}>
                close
              </button>
            </div>
          )}
        {connected? (<Expressions/>): (
<div>
         
  
          <button className="dapp-button" onClick={connectHandler}>
            open app
          </button>
         </div>
        )}
        </div>
      
  );
};

export default Toolkit;
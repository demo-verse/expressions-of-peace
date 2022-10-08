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
      <h2
        style={{
          fontSize: "2.2rem",
          marginTop: "20px",
          lineHeight: "2.4rem",
        }}
      >
        {" "}
        Introducing the Peacemaker: <br></br>a toolkit for peer-to-peer
        diplomacy
      </h2>

      <p
        style={{
          marginBottom: "4rem",
          marginLeft: "10%",
          marginRight: "10%",
          textAlign: "left",
        }}
      >
        As a proof of concept; a decentralized app launched on Ethereum
        blockchain's{" "}
        <a
          href="https://blog.logrocket.com/mainnet-vs-testnet-environments-explained/"
          target={"_blank"}
          rel="noreferrer"
        >
          <u>test networks.</u>
        </a>
        <br></br>
        <br></br>
        {"Watch the making of "}{" "}
        <a
          href="https://www.youtube.com/watch?v=SaqKac-3ncM"
          target={"_blank"}
          rel="noreferrer"
        >
          <span
            style={{
              backgroundColor: "turquoise",
              // paddingBlock: "1.2rem",
              fontWeight: "bolder",
            }}
          >
            {" "}
            {">> "} expressions
          </span>{" "}
        </a>{" "}
        {" and "}
        <a
          href="https://www.youtube.com/watch?v=Z_9rQ6zqh1Q"
          target={"_blank"}
          rel="noreferrer"
        >
          <span
            style={{
              backgroundColor: "turquoise",
              color: "white",
              background: "rgb(183, 76, 163)",
              fontWeight: "bolder",
            }}
          >
            {" "}
            acknowledgements {" <<"}
          </span>{" "}
        </a>
        {
          "  in action. After reading guide below and then following the other steps, you're set for making (textual) expressions and acknowledgements on blockchain."
        }{" "}
        <br></br><br></br>
        Note that, currently Acknowledgements of Peace are manually done via referring to an existing
        expression's transaction hash, via directly interacting with the smart contract on etherscan. (see it in action, above)
        <br></br><br></br> When you are all set, just click <strong>open app </strong>
        button near the end of this section.
        <br></br>
        <br></br>
        <div className="centered">
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
              read your guide here{" "}
            </a>
          </button>
        </div>
        <br></br>
        
        <br></br>
        In this project, using your human right to stand equal on peacemaking, via expressing and acknowledging peace will never cost something of a real value. <br></br> It mainly and basically
        requires free will, and more to that, generosity, awareness and common
        sense.
        <br></br>
        <br></br>
        Software developers of blockchain-based applications use these test
        environments before taking their systems to main networks. We care about its tech, but also care about the financial capacities and incentives that would bring to the table. <br></br>{" "}
        <br></br> 
         So far made efforts to design an initial solution and a roadmap{" "}
        <strong>*</strong> with blockchain technology, because of its{" "}
        <strong>distributed, resilient and transparent nature</strong>, and our
        passion to start the foundations of Peace Economies.
        <br></br>
        <br></br>
        <div className="centered">
          <iframe
            width="100%"
            height="500"
            src="https://www.youtube.com/embed/SaqKac-3ncM?start=15"
            title="Making of an Expression of Peace"
            frameborder="0" 
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen={true}
          ></iframe>
        </div>

        <br></br>
        On this project, we still need better accessibility to the
        technology and education, especially in themes around decentralized
        technologies, peace and climate change. <br></br> <br></br>
        <i>
          {" "}
          We're happy that, this year's United Nations General Assembly had a
          resolution around introducing Peace and Climate Change related
          subjects into the curriculums at school, globally. Afterall, quality
          education and its accessibility will be among the requirements and as
          well, outcomes of a World Peace. <br></br>
          <br></br>
        </i>
       
        <strong>
          Here, we provide free and open sourced and minded tools. <br></br> & the
          product is not you, {">> "}it is a World Peace, by Equality. {" << "}
          <i>thanks to you.</i>
        </strong>
      </p>

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
      </button>
      {!connected ? null : (
        <div style={{ alignSelf: "center", marginTop: "2rem" }}>
          <button className="enter-dapp-button" onClick={disconnectHandler}>
            close
          </button>
        </div>
      )}
      {connected ? (
        <Expressions />
      ) : (
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

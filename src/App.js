import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
// import { makeNFT } from "./NFTMaker";
// import ExpressionOfPeace from "./artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace_Rinkeby.json";
// import expressionOfPeace_GoerliV2 from "./artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace_GoerliV2.json";

import Footer from "./Footer";
import Outro from "./Outro";
import Reasoning from "./Reasoning";
import Questions from "./Questions";
import Expressions from "./Expressions";
import Intro from "./Intro";
import HumanRight from "./HumanRight";

// const CHAIN_ID_RINKEBY = 4; // rinkeby testnet @ ethereum
const CHAIN_ID_GOERLI = 5; // goerli testnet @ ethereum

const App = () => {
 
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
  const connectHandler = async () => {
    window.scrollTo(0, 0);

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
  
  return (
    <div className="layout">
      <header className="navbar">
        <div className="container columns">
          <div className="logo">
            <a href="https://expressionsofpeace.org">Expressions of Peace</a>
          </div>
          {/* <div>
            <img width={"20%"}></img>
          </div> */}
          {!connected ? null : (
            <div style={{ alignSelf: "flex-end" }}>
              <button className="enter-dapp-button" onClick={disconnectHandler}>
                close
              </button>
            </div>
          )}
        </div>
      </header>
      {connected ? (
        <Expressions />
      ) : (
        <section className="expressions centeed">
          <Intro />

          <HumanRight />
          <hr></hr>
          <h1
            style={{
              textAlign: "center",
              marginTop: "2rem",
              fontSize: "2.2rem",
              marginBottom: "2rem",
            }}
          >
            ? you may wonder;
          </h1>
          <Questions />
          <div className="columns">
            <p
              style={{
                // marginRight: "6%",
                marginLeft: "8%",
                marginRight: "8%",
                color: "black",
                padding: "40px",
                // backgroundColor: "#BBE6B6",

                textAlign: "center",
                fontSize: "1.6rem",
              }}
            >
              As a proof of concept; a peer-to-peer diplomacy tool launched on
              Ethereum blockchain's{" "}
              <a
                href="https://blog.logrocket.com/mainnet-vs-testnet-environments-explained/"
                target={"_blank"}
                rel="noreferrer"
              >
                <u>test networks.</u>
              </a>{" "}
              <br></br> <br></br>
              <span
                style={{
                  backgroundColor: "yellow",
                  color: "black",
                  paddingLeft: "4px",
                  paddingRight: "4px",
                }}
              >
                <i>
                  It's an experience, that is priceless; more about being, than
                  having.
                </i>
              </span>{" "}
              {/* 
              <br></br> for
              <strong>
                {" "}
                freely imagining, expressing, <br></br> co-signing and sealing a
                World Peace, together {"&"} undeniably. <br></br> <br></br>It's
                an experience, that is priceless.
              </strong> */}
            </p>
          </div>
          {/* <br></br> */}
          {/* <a
            className="metamask-link"
            href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
            rel="noreferrer"
            target="_blank"
          >
            {" "}
            install metamask.
          </a>{" "} */}
          <div className="centered columns">
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
                read guide{" "}
              </a>
            </button>

            <button
              className="watch-demo-button"
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              <a
                href="https://www.youtube.com/watch?v=mYwuYeqp6a0"
                target={"_blank"}
                rel="noreferrer"
              >
                watch demo{" "}
              </a>
            </button>
          </div>
          <br></br>
          <div className="columns">
            <p
              style={{
                textAlign: "center",
                fontSize: "1.6rem",
                marginRight: "22px",
              }}
            >
              after completing the web3 guide above, <br></br> now you are ready
              to Express yourself on #web3!
            </p>
            <button className="dapp-button" onClick={connectHandler}>
              open app
            </button>
          </div>
          {/* <div className="columns" style={{ margin: "2rem" }}>
            <p
              style={{
                backgroundColor: "gray",
                marginLeft: "10%",
                color: "white",
                padding: "22px",
                textAlign: "left",
                fontSize: "1.6rem",
              }}
            >
              It takes free will, and a feeling of responsibility and
              generousity in giving out an assurance, which to become our
              promise, our legacy, undeniably.
            </p>
            <p
              style={{
                // backgroundColor: "black",
                // marginRight: "6%",
                marginLeft: "8%",
                marginRight: "10%",
                color: "black",
                padding: "22px",
                backgroundColor: "#afeeee",

                textAlign: "left",
                fontSize: "1.6rem",
              }}
            >
              {" "}
              Tech is an optional tool; to catalyze a World Peace, via an
              accessible, inclusive, transparent and legit process and
              environment, together.
            </p>

      
          </div> */}
          <br></br>
          <br></br>
          <hr></hr>
          <h2
            style={{
              fontSize: "2rem",
              marginTop: "60px",
              marginBottom: "60px",
              lineHeight: "2.4rem",
            }}
          >
            Expressions as <br></br> Pseudo-transactions:
          </h2>
          <p
            style={{
              textAlign: "center",
              fontSize: "1.6rem",
              marginLeft: "10%",
              marginRight: "10%",
            }}
          >
            <a
              href="https://github.com/demo-verse/expressions-of-peace"
              rel="noreferrer"
              target="_blank"
            >
              <u>Here</u>
            </a>{" "}
            is how to read each expession, embedded in the transaction history
            of each social smart contracts we deploy to test networks.
          </p>
          <div className="centered columns">
            <button
              className="connect-button"
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              <a
                className="contract-at-goerli"
                href="https://goerli.etherscan.io/address/0xe563950e3d97c1cf11665163d4b14ead092c503c"
                rel="noreferrer"
                target="_blank"
              >
                @Görli
              </a>
            </button>
            <br></br>
            <button
              className="connect-button"
              style={{
                backgroundColor: "white",
                color: "black",
              }}
            >
              <a
                className="contract-at-rinkeby"
                href="https://rinkeby.etherscan.io/address/0x6d584295790d2c9f7f2d4249b6caebc15b1da682"
                rel="noreferrer"
                target="_blank"
              >
                @Rinkeby
              </a>
            </button>

            {/* <button className="connect-button" onClick={connectHandler}>
                    open app
                  </button> */}
          </div>
          <br></br>
          <br></br>
          <hr></hr>
          <h2
            style={{
              fontSize: "2rem",
              marginTop: "100px",
              lineHeight: "2.2rem",
            }}
          >
            <span>Why </span> blockchain @ solution design?{" "}
          </h2>
          <div className="columns">
            <p
              style={{
                backgroundColor: "yellow",
                textAlign: "start",
                fontSize: "1.6rem",
                padding: "2rem",
              }}
            >
              {"> "}transparent/undeniable, 
              <br></br> {"> "}immutable, open-sourced
              <br></br> {"> "}censorship-resistant
              <br></br> {"> "} (almost) equally accessible
              <br></br> {"> "}allowing anonymity<strong>*</strong>
            </p>

       
          </div>
          <p
            style={{
              fontSize: "1.6rem",
              marginTop: "40px",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            Expressions of Peace are letters, from you, to the rest of the
            world.
            <br></br> <br></br>
            <strong> Tech, in fact, is an optional tool;</strong> imagined to
            catalyze a World Peace, via an accessible, inclusive, transparent,
            resilient and legitimate process and environment, altogether.{" "}
         
           
            <br></br> <br></br>
            <a
              href="https://en.wikipedia.org/wiki/Smart_contract"
              target={"_blank"}
              rel="noreferrer"
            >
              <u>Smart contracts</u>
            </a>
            {"  "}
            on test networks, in this context, act as global, public mail boxes,
            yet to become social consensus contracts of a petition, where we
            would sign, without requiring money with real value.
            <br></br> <br></br>

          
            <div className="blockchain-img">
            <img
              alt="Nelson Mandela encouraging us to make peace"
              src="blockchain-img.png"
            ></img>
            </div>
            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <h3 style={{ lineHeight: "2.4rem", fontSize:"2.2rem" }}>
              Not a matter of legitimacy, but time.
            </h3>
            <br></br>
            We truly believe that Peace should not be brought up as a resolution
            of voting or people given environment or processes, where they
            hesitate on generousity, exclude one another, by the separation,
            biases inherited, since ages.
            <br></br> <br></br>

            <Reasoning />
            <br></br>
            <br></br>
            <hr></hr>
            <br></br>
            <Outro />
            <strong>* </strong>
            <span style={{ fontStyle: "italic" }}>
              in case people cannot express or acknowledge peace for security
              reasons, they'd keep their anonymity as long as they needed.{" "}
              <br></br> ( until their uniqueness in the system proven at some
              point in the future. This is called{" "}
              <a
                href="https://en.wikipedia.org/wiki/Proof_of_personhood"
                target={"_blank"}
                rel="noreferrer"
              >
                <u>Proof of Personhood</u>
              </a>
              )
            </span>
          </p>
          <hr></hr>

          <br></br>
          <br></br>
          <div className="express-yourself">
            {/* Our Dance - Wax Tailor ft. Charlotte Savary */}
            <iframe
              width="80%"
              height="640"
              src="https://www.youtube.com/embed/-QtqhPR7d0I"
              title="YouTube video player"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
};

export default App;

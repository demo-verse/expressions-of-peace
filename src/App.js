import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";
// import { makeNFT } from "./NFTMaker";
// import ExpressionOfPeace from "./artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace_Rinkeby.json";
import ExpressionOfPeace_Goerli from "./artifacts/contracts/ExpressionOfPeace.sol/ExpressionOfPeace_Goerli.json";

// will initiate all chains with their test networks.
// first, ethereum's rinkeby test network.
// later, we'll deploy contracts in the other test networks as well.
// all here. https://en.wikipedia.org/wiki/List_of_blockchains

// NOTE: Make sure to change this to the contract address you deployed
// const expressionOfPeaceAddress = "0x6d584295790d2C9f7F2D4249B6CAebC15b1DA682";
const expressionOfPeaceAddress_Goerli =
  "0xe563950E3d97c1CF11665163D4B14EAD092C503C";

// ABI so the web3 library knows how to interact with our contract
// const expressionOfPeaceABI = ExpressionOfPeace;
const expressionOfPeaceABI_Goerli = ExpressionOfPeace_Goerli;
// const CHAIN_ID_RINKEBY = 4; // rinkeby testnet @ ethereum
const CHAIN_ID_GOERLI = 5; // goerli testnet @ ethereum

const App = () => {
  // const [provider, setProvider] = useState();
  const [inputValue, setInputValue] = useState("");
  const [value, setValue] = useState("...");
  // const [blockNumber, setBlockNumber] = useState("0");
  // const [gasPrice, setGasPrice] = useState("0");
  // const [desiredChainId, setDesiredChainId] = useState(null);
  // const [desiredContractAddress, setDesiredContractAddress] = useState("");

  const [account, setAccount] = useState("");
  // const [balance, setBalance] = useState("");
  // const [currentChainId, setCurrentChainId] = useState(null);
  const [connected, setConnected] = useState(false);
  // const [nftGenerarated, setNftGenerarated] = useState(false);
  // const [alreadySigned, setAlreadySigned] = useState(false);
  // const generateNFT = async () => {
  //   console.log("generateNFT");
  //   const result = makeNFT(inputValue);
  //   setNftGenerarated(true);
  //   console.log(result);
  // };
  // handles setting account and balance
  const accountHandler = async (account) => {
    setAccount(account);

    // const balance = await provider.getBalance(account);
    // notice that we use format ether here, uncomment the following console.log and see what happens if we don't
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

    setConnected(true);

    // we set desiredChainId as the
  };

  const disconnectHandler = async () => {
    console.log("disconnecting account");
    setAccount("");
    setConnected(false);
    setValue("");
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
      expressionOfPeaceAddress_Goerli,
      expressionOfPeaceABI_Goerli,
      provider
    );

    // a signer is necessary when we want to write to blockchain
    // a wallet doesn't need to sign/spend any gas to read from blockchain
    const signer = provider.getSigner();
    const contractWithSigner = contract.connect(signer);
    await contractWithSigner.set(inputValue);
    // setAlreadySigned(true);
  };

  const handleRetrieveData = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    networkHandler();
    console.log("retreiving data..");
    const expressionOfPeaceContract = new ethers.Contract(
      expressionOfPeaceAddress_Goerli,
      expressionOfPeaceABI_Goerli,
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
      ) : (
        <section className="expressions center">
          <div className="columns">
            <div style={{ marginLeft: "10%" }}>
              <h1 style={{ fontSize: "2rem", marginTop: "1rem" }}>
                start, a world peace.
              </h1>
              <h1
                style={{ fontSize: "2rem", marginTop: "1rem", color: "purple" }}
              >
                express yourself!
              </h1>
              .
              {/* <h1>
                <a
                  href="https://www.youtube.com/watch?v=2lK4LrD8Ii4"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  {"&"} go all the way
                </a>
              </h1> */}
            </div>
            <div>
              <p
                // style={{ fontSize: "2rem", margin: "100px" }}

                style={{
                  // backgroundColor: "black",
                  // marginRight: "6%",
                  marginLeft: "10%",
                  marginRight: "8%",
                  color: "white",
                  padding: "30px",
                  backgroundColor: "#4B6D8B",

                  textAlign: "right",
                  fontSize: "1.6rem",
                }}
              >
                {" "}
                Expressions of Peace, extend the Freedom of Expression;{" "}
                <span
                  style={{
                    backgroundColor: "yellow",
                    color: "black",
                    paddingLeft: "4px",
                    paddingRight: "4px",
                  }}
                >
                  to experience,
                </span>{" "}
                as a civilisation. <strong>#GenerationPeace</strong>
              </p>
            </div>
          </div>

          {/* <p>
            {" "}
            this is an open sourced and minded tool to illustrate and make{" "}
            <strong>a World Peace</strong>, that is catalyzed with creativity,
            generousity and technology incorporating the solutions optionally
            along the way.
          </p>
          <p>
            <strong>
              Expressions of Peace, are hopefully be observed as: a
              civilisation, self-manifesting and claiming itself as part of
              starting and sealing a World Peace.
            </strong>
            <br></br>
            <br></br>
            We hope, this would be a new perspective, where any individual can
            express their imagination and their way of peace-making, empowering
            the rest, including their states, to seal a world peace.
          </p> */}
          <br></br>
          {/* <div className="morpheus">
            <img
              src="https://www.demover.se/images/morpheus.png"
              alt="creative commons shareAlike"
            ></img>
          </div>{" "} */}
          <h2
            className="centered"
            style={{ fontSize: "2.2rem", lineHeight: "2.6rem" }}
          >
            let technology serve peace, <br></br> sincerely{" "}
          </h2>
          <div className="columns">
            <p
              style={{
                backgroundColor: "black",
                marginLeft: "10%",
                color: "white",
                padding: "40px",

                textAlign: "left",
                fontSize: "1.6rem",
              }}
            >
              {/* this is our first tool, using blockchain tech. web3 components for
              transparency and resiliency.
              <br></br> */}
              {/* <br></br>
            we got some reasonings as using tech in our first method of
            expressions and acknowledgements. we'll be oracles, architechs and
            makers of peace, as a civilisation. It is to have access to a human
            right and accessible universal experience.
            <br></br>
            <br></br>
            In all that, this tech, or digital versions of them are not the only
            way, just one of solutions that are scalable. All could work with a
            letter/directly. all you need is a browser, {""}
            and a few clicks to sign and confirm what you want to express.
            <br></br> */}
              It takes free will, responsibility and generousity in giving out
              an assurance, which to become your promise, your legacy.
              {/* <br></br>
              <br></br>
              it is all about experiencing this right to express and acknowledge
              for the world. */}
            </p>
            <p
              style={{
                // backgroundColor: "black",
                // marginRight: "6%",
                marginLeft: "8%",
                marginRight: "8%",
                color: "black",
                padding: "40px",
                backgroundColor: "#BBE6B6",

                textAlign: "right",
                fontSize: "1.6rem",
              }}
            >
              {" "}
              tech is an optional, catalyzing tool of reflection and resilience;
              where individuals'initiation of a world peace in a
              multi-stakeholder, inclusive and transparent process and
              environment.
            </p>

            {/* <p>
            <br></br> . As a proof of concept, and
            part of futher research and development, <br></br>
            Expressions of Peace were initiated on blockchain. <br></br>
          </p> */}
          </div>

          {/* <h2>what can we observe with this app? </h2>
          <p>
            this way, any individual can express their imagination and their way
            of peace-making scale of billions.
          </p> */}
          <p
            style={{
              // marginRight: "6%",
              marginLeft: "8%",
              marginRight: "8%",
              color: "black",
              padding: "40px",
              // backgroundColor: "#BBE6B6",

              textAlign: "left",
              fontSize: "1.6rem",
            }}
          >
            as a proof of concept; a peer-to-peer diplomacy tool, started on
            blockchain (
            <a
              href="https://blog.logrocket.com/mainnet-vs-testnet-environments-explained/"
              target={"_blank"}
              rel="noreferrer"
            >
              testnets{") "}
            </a>
            making use of crypto-wallets to declare and seal a world peace*
            together.
          </p>
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

          {!connected ? (
            <div className="centered columns">
              <button
                className="connect-button"
                style={{
                  backgroundColor: "yellow",
                  color: "black",
                }}
              >
                <a href="https://www.canva.com/design/DAFJb1m8MxA/olzSyTC7tGyGkbUrSBhMfQ/edit?utm_content=DAFJb1m8MxA&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton">
                  web3 guide{" "}
                </a>
              </button>
              <br></br>
              <button
                className="connect-button"
                style={{
                  backgroundColor: "#C29B8D",
                  color: "black",
                }}
              >
                <a
                  href="https://www.youtube.com/watch?v=mYwuYeqp6a0"
                  target={"_blank"}
                  rel="noreferrer"
                >
                  demo video{" "}
                </a>
              </button>

              {connected ? (
                <div className="after-connect">
                  {/* <label>
                {`${Number.parseFloat(balance).toPrecision(4)} ETH`}
              </label> */}
                  hi,
                  <button
                    className="account-button"
                    onClick={disconnectHandler}
                  >
                    {account.substring(0, 5)}...
                    {account.substring(account.length - 4)}
                  </button>
                </div>
              ) : (
                <>
                  <br></br>
                  <button className="connect-button" onClick={connectHandler}>
                    app
                  </button>
                </>
              )}
            </div>
          ) : null}

          <h2 style={{ fontSize: "2rem", marginTop: "100px" }}>
            <span>why </span> blockchain tech is @ design?{" "}
          </h2>
          <p
            style={{
              fontSize: "1.6rem",
              marginTop: "40px",
              paddingLeft: "10%",
              paddingRight: "10%",
            }}
          >
            expressions are letters, from you, to the rest of the world. smart
            contracts here in this solution/version, act as global, public mail
            boxes.
            <br></br>
            <br></br>
            <strong>anonymity {"|>"} </strong> in case people cannot express a peacemaking request physically,
            they'd to this way. including the rest of the people and their
            groups and entities.
          </p>
          {/* <p style={{ backgroundColor: "yellow" }}>
            a blockchain, is a distributed ledger technology, that is:
            <br></br>
            <br></br> - based on a distributed consensus algorithm,
            <br></br>- transparent, immutable, open-source
            <br></br>- cannot be censored or shut down <strong>*</strong>
            <br></br>- equally accessible to everyone <strong>**</strong>
            <br></br>- anonymity is guaranteed<strong> by design.</strong>
          </p> */}
          <hr></hr>
          {/* <p>
            <span style={{ fontStyle: "italic" }}>
              Learn more about test networks and mainnet{" "}
              <a
                href="https://blog.logrocket.com/mainnet-vs-testnet-environments-explained/"
                target={"_blank"}
                rel="noreferrer"
              >
                here.{" "}
              </a>{" "}
            </span>
          </p> */}
          {/* <p>
            <strong>*</strong>there are still accessibility issues possible, but
            there are ways to overcome. <br></br> test network shutdowns are
            curable, and by design, one live contract per version on a network
            will be guaranteed. <br></br>
            <br></br> all expressions in different networks aggregated and
            distributed data will be available to everyone. we'll deploy this
            app to IPFS and Internet Computer, and add guide on how to customize
            network settings for metamask.
            <br></br> <br></br>
            as of August 2022, this decentralized app/dapp is accessible
            globally, unless https://expressionsofpeace.org is blocked.
            <br></br> <br></br>
            <strong>**</strong>more research and development needed in the proof
            of personhood, uniqueness {" & "}{" "}
            <a
              href="https://www.google.com/search?client=firefox-b-d&q=decentralized+identity+technology"
              target={"_blank"}
              rel="noreferrer"
            >
              decentralized iddentities
            </a>
          </p> */}
          {/* <br></br> */}
          {/* <p>
            <span style={{ fontStyle: "italic" }}>
              {" "}
              ~ a full multimedia guide will be added soon. for now, check the
              code
              <a
                href="https://github.com/demo-verse/expressions-of-peace"
                target={"_blank"}
                rel="noreferrer"
              >
                {" "}
                repository on github{" "}
              </a>
              to see more details around reading expressions other than the last
              one. we are working on it. <br></br>
              <br></br> Let us know if you need any help.
            </span>
          </p>
          <br></br>
          <br></br> */}
          <br></br>
          <br></br>
          <div className="express-yourself">
            {/* <iframe
              width="90%"
              height="640"
              src="https://www.youtube.com/embed/ymNFyxvIdaM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe> */}

            <iframe
              width="80%"
              height="640"
              src="https://www.youtube.com/embed/cLnkQAeMbIM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>

            {/* <iframe
              width="80%"
              height="640"
              src="https://www.youtube.com/embed/jW4VZ5J0fNQ"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
            ></iframe> */}
          </div>
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
          expressions:
          <a
            className="contract-at-rinkeby"
            href="https://rinkeby.etherscan.io/address/0x6d584295790d2c9f7f2d4249b6caebc15b1da682"
            rel="noreferrer"
            target="_blank"
          >
            @Rinkeby
          </a>
          <a
            className="contract-at-goerli"
            href="https://goerli.etherscan.io/address/0xe563950e3d97c1cf11665163d4b14ead092c503c"
            rel="noreferrer"
            target="_blank"
          >
            @Goerli
          </a>
          faucets:
          <a
            className="faucet-rinkeby"
            href="https://faucet.rinkeby.io/"
            rel="noreferrer"
            target="_blank"
          >
            $Rinkeby
          </a>
          <a
            className="faucet-goerli"
            href="https://goerlifaucet.com/"
            rel="noreferrer"
            target="_blank"
          >
            $Goerli
          </a>
          <a
            className="source-code-link"
            href="https://github.com/demo-verse/expressions-of-peace"
            rel="noreferrer"
            target="_blank"
          >
            {"|> "} source code
          </a>
          {/* {gasPrice} gwei &bull; {blockNumber} */}
        </div>
      </footer>
    </div>
  );
};

export default App;

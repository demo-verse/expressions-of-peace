import "./App.css";
import { useState } from "react";
import { ethers } from "ethers";

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
      expressionOfPeaceAddress_Goerli,
      expressionOfPeaceABI_Goerli,
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
        <div className="container">
          <div className="logo">
            <a href="https://expressionsofpeace.org">Expressions of Peace</a>
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
            <strong>a World Peace</strong>, catalyzed via tech and creativity.
          </p>
          <p>
            {" "}
            Expressions of Peace, extend the Freedom of Expression; as a right
            to experience, as a multi-generation civilisation:{" "}
            <strong>#GenerationPeace</strong>.
          </p>
          <br></br>
          <h2>what can we observe with this app? </h2>
          <p>
            this way, any individual can express their imagination and their way
            of peace-making in the scale of billions.{" "}
          </p>
          <br></br>
          <div className="morpheus">
            <img
              width="40%"
              src="https://www.demover.se/images/morpheus.png"
              alt="creative commons shareAlike"
            ></img>
          </div>{" "}
          <br></br>
          <br></br>
          <h2>what it takes do use this tool? </h2>
          a metamask wallet with a good new account is essential. first,  <a
              className="metamask-link"
              href="https://metamask.zendesk.com/hc/en-us/articles/360015489531-Getting-started-with-MetaMask"
              rel="noreferrer"
              target="_blank"
            >
            {" "} install metamask.
            </a>{" "}
          <p style={{backgroundColor: "black", color:"white"}}>
            all you need is a browser, {""}
          
            and a few clicks to sign and confirm what you want to express. 
          
          <br></br>
            <br></br>

            first of all, it takes free will, responsibility and generousity in giving out this assurance.
<br></br><br></br>
            it is all about experiencing this right to express and acknowledge
            for the world.
          </p>
          <p>
            <strong>
              Expressions of Peace, are hopefully be: a civilisation
              self-manifesting and claiming itself as part of starting and
              sealing/recognizing a World Peace.
            </strong>
          </p>
          <p>
            <span style={{ fontStyle: "italic" }}>
              {" "}
              ~ a full guide will be added soon. for now, check the code
              <a
                href="https://github.com/demo-verse/expressions-of-peace"
                target={"_blank"}
                rel="noreferrer"
              >
                {" "}
                repository on github{" "}
              </a>
              to see more details around reading expressions other than the last one. we are working on it.{" "}
            </span>
          </p>
          <br></br>
          <br></br>
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

          <p>
            we have initiated the first mailbox contract on rinkeby and goerli testnets. 
            <br></br> <br></br>currently, rinkeby faucet is offline and network will be closed in October. 
            {/* <br></br><br></br> Currently we're developing to support multiple chains, next week we'll do it in more than 3 networks and will get Rinkeby back as well. */}
            
            <br></br><br></br> You can always manually write or fork this app to use in your purpose, with your contracts anytime. 
            
            <br></br><br></br>
            Let us know if you need help.
          <a
            className="contract-at-rinkeby"
            href="https://rinkeby.etherscan.io/address/0x6d584295790d2c9f7f2d4249b6caebc15b1da682"
            rel="noreferrer"
            target="_blank"
          >
            Rinkeby
          </a>
          {" & "}
          <a
            className="contract-at-goerli"
            href="https://rinkeby.etherscan.io/address/0x6d584295790d2c9f7f2d4249b6caebc15b1da682"
            rel="noreferrer"
            target="_blank"
          >
            Goerli 
          </a> {" "}test networks. 
          </p>

          
          <p style={{backgroundColor: "yellow"}}>
            a blockchain, is a distributed ledger technology, that is:
          <br></br><br></br>  - based on a distributed consensus algorithm, 
            <br></br>- transparent, immutable, open-source
            <br></br>- cannot be censored or shut down <strong>*</strong>
            <br></br>- equally accessible to everyone <strong>**</strong>
            <br></br>- anonymity is guaranteed<strong> by design.</strong>
            {/* <br></br><span style={{paddingLeft: "30%"}}></span */}
          </p>
          <hr></hr>
 
          <p>
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
          </p>
          <p>
            <strong>*</strong>more research and development needed in the
            proof of personhood, uniqueness {" & "}decentralized iddentities
            <br></br> <br></br>
            <strong>**</strong>there are still accessibility issues possible,
            but there are ways to overcome. we'll deploy this app to IPFS and Internet Computer, and add guide on how to customize network settings for metamask. but right now it should be accessible globally.
          </p>
          <div className="express-yourself">
            <iframe
               width="90%"
               height="640"
              src="https://www.youtube.com/embed/ymNFyxvIdaM"
              title="YouTube video player"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
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
        
          {/* {gasPrice} gwei &bull; {blockNumber} */}
        </div>
      </footer>
    </div>
  );
};

export default App;

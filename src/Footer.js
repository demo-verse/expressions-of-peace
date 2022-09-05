import { React } from "react";
const Footer = () => {
return (
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
          {/* expressions:
          <a
            className="contract-at-goerli"
            href="https://goerli.etherscan.io/address/0xe563950e3d97c1cf11665163d4b14ead092c503c"
            rel="noreferrer"
            target="_blank"
          >
            @Görli
          </a>
          <a
            className="contract-at-rinkeby"
            href="https://rinkeby.etherscan.io/address/0x6d584295790d2c9f7f2d4249b6caebc15b1da682"
            rel="noreferrer"
            target="_blank"
          >
            @Rinkeby
          </a>
          faucets:
          <a
            className="faucet-goerli"
            href="https://goerlifaucet.com/"
            rel="noreferrer"
            target="_blank"
          >
            $Görli
          </a>
          <a
            className="faucet-rinkeby"
            href="https://faucet.rinkeby.io/"
            rel="noreferrer"
            target="_blank"
          >
            $Rinkeby
          </a> */}
          <a
            className="source-code-link"
            href="https://github.com/demo-verse/expressions-of-peace"
            rel="noreferrer"
            target="_blank"
            style={{fontSize: "1.2rem"}}
          >
            sourceCode
          </a>

       
          {/* {gasPrice} gwei &bull; {blockNumber} */}
        </div>

        <div className="columns">
  
        <a
            // className="source-code-link"
            href="https://demover.se"
            rel="noreferrer"
            target="_blank"
            style={{fontSize: "1.2rem"}}
          >
             <img src="demoVerse-logo.png" width={"100px"} height="42px">
          </img>
          </a>
<strong>{"&"}</strong>
           <a
            // className="source-code-link"
            href="https://stateful.art"
            rel="noreferrer"
            target="_blank"
            style={{fontSize: "1.2rem"}}
          >
             <img src="start-logo.png" width={"100px"} height="32px">
          </img>
          </a>
        </div>
      </footer>
);
}

export default Footer;
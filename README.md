# Expressions of Peace

Expressions of Peace are sincere ways of resiliently, simply, expressing peace, being the core civil component of an undeniable, resilient World Peace. 

That is, observed as a potentially viable one, with a simple editor and the use of blockchain technology; to be co-imaginable, claimable and experienced, as a global human right; extending the freedom of speech.

---
This tool's purpose is making a World Peace observable and sustainable. 

![Paulette Walker](https://i.imgur.com/SLjgN6p.png)

![Yoko Ono](https://i.imgur.com/mmO7xDx.png)


Right now, it is based on a very simple contract, where only the last expression written to that contract is stored on-chain, as a string field. (needs input sanitization).



Here is that contract deployed on Rinkeby testnet. You can check `contracts` folder.
https://rinkeby.etherscan.io/address/0x6d584295790d2c9f7f2d4249b6caebc15b1da682


One can simply check transaction hashes to display each expressions made with each set operation on the contract.

For example, this transaction:
https://rinkeby.etherscan.io/tx/0xa7df107d235becf0d5d8c891c8a8d5be01eff05a406b1b330549fbbb23dc69c2


to try it yourselves.  

for an an arbitrary transaction, go below the page and `click to see more` ..
at the end, you'll see a window of Input data. 
![Raw](https://i.imgur.com/mOV8Lqp.png)

There's a button for `decode input data`. click to that, then you can see it as a readable, string.

like this:
![readable](https://i.imgur.com/TChqc1D.png)


Of course, we'll be doing all this within the dapp :)

Hope this gives a hint for what's next, it is acknowledgements. 

We've found that easiest way is referring/quoting from another expression, with its transactionHash on the ledger.

Special thanks to [@ChristianChiarulli](https://github.com/ChristianChiarulli) for open sourcing their web3 knowledge, stack and especially well use of the ethers library [on this repo](https://github.com/ChristianChiarulli/intro-fullstack-ethereum), resulting we decided building on top of that code, seperating hardhat logic to another repository for now, to be added soon. 

**Bests, in Peace**

## Our stack

- [Solidity](https://docs.soliditylang.org) (To write our smart contract)
- [React](https://reactjs.org/) (Create our frontend)
- [Metamask](https://metamask.io/) (Web Wallet that will allow us to interact with the ethereum blockchain)
- [Ethers](https://docs.ethers.io) (web3 library for interacting with the blockchain and our smart contract)

## Installing a web wallet

Before getting started make sure you have a web wallet installed, I recommend [Metamask](https://metamask.io/download/). It is essentially just a browser extension that will allow us to interact with the ethereum blockchain. Just follow the instructions provided in the link to install and make sure not to use the same seed phrase for development for real ethereum/money.

### Our Smart Contract

```
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract ExpressionOfPeace {
    string current_expression;

    constructor(string memory _expression) {
        current_expression = _expression;
    }

    function set(string memory _expression) public {
        current_expression = _expression;
    }

    function get() public view returns (string memory) {
        return current_expression;
    }
}
```

This contract is very simple. When the contract is deployed it is instantiated with a value called `current_expression`, after deploying the contract you have the ability to `get` the data or `set` the data.

to install dependencies and get the project locally up and running, execute the following command on your shell:

`npm install && npm start`

# Expressions of Peace

Expressions of Peace are sincere attempts on resiliently, undeniebly and simply, expressing peace, and happening to be core, civil component of an undeniable World Peace. 

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
- [Hardat](https://hardhat.org/) (build, test and deployment framework)
- [React](https://reactjs.org/) (Create our frontend)
- [Metamask](https://metamask.io/) (Web Wallet that will allow us to interact with the ethereum blockchain)
- [Ethers](https://docs.ethers.io) (web3 library for interacting with the blockchain and our smart contract)

## Installing a web wallet

Before getting started make sure you have a web wallet installed, I recommend [Metamask](https://metamask.io/download/). It is essentially just a browser extension that will allow us to interact with the ethereum blockchain. Just follow the instructions provided in the link to install and make sure not to use the same seed phrase for development for real ethereum/money.

## Environment

First head over to the hardhat [website](https://hardhat.org/), we're going to be doing most of what is covered in the tutorial section as well as some of the documentation.

Make sure you have nodejs installed, if you don't then follow the setup [here](https://hardhat.org/tutorial/setting-up-the-environment.html)

## Create a new project

To get your project started:

```
mkdir intro-fullstack-ethereum
cd intro-fullstack-ethereum
npm init --yes
npm i --save-dev hardhat
```

In the same directory where you installed Hardhat run:

```
npx hardhat
```

A menu will appear, for this tutorial we will be selecting `Create an empty hardhat.config.js`

Make sure these packages are installed, you may have been asked to install them when initializing the project.

```
npm install --save-dev @nomiclabs/hardhat-ethers ethers @nomiclabs/hardhat-waffle ethereum-waffle chai
```

## Create our Contract

Let's create our contract, it will be very simple, the contract will only read from and write to the blockchain. I wanted to keep the contract simple since this will be a comprehensive look at all of the tools necessary to create a fullstack dapp.

First we will need to create a directory for our contract, hardhat expects them to be in a directory called `contracts/` so:

```
mkdir contracts
cd contracts
touch ExpressionOfPeace.sol
```

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


### Compiling the contract

We can now use `hardhat` to compile our contract with

```
npx hardhat compile
```

## Shorthand commands

Instead of typing out `npx hardhat <command>` we can install `hardhat-shorthand` and use the `hh` command

```
npm i -g hardhat-shorthand
```

We can also get tab completion by running the command:

```
hardhat-completion install
```

Choose to install the autocompletion for your shell and you should now get tab completion after typing `hh` as long as you are in a hardhat project directory.

Try compiling your contract now with:

```
hh compile
```

## Testing

It is very import since money is often on the line when it comes to smart contracts. I will show you how to create a simple test for our `ExpressionOfPeace` contract.

It is also important to note that hardhat comes with it's own network so when we run our tests hardhat will spin up a local network where we can deploy our contract to and test.

First create a directory called `test/` and create a file called `simple-storage-test.js`

```
mkdir test
touch simple-storage-test.js
```

Here are our simple tests:

```
const { expect } = require('chai')

describe('ExpressionOfPeace contract', function () {
  it('test deployment', async function () {
    const ExpressionOfPeace = await ethers.getContractFactory('ExpressionOfPeace')

    const ExpressionOfPeace = await ExpressionOfPeace.deploy(123)

    const storedValue = await ExpressionOfPeace.get()

    expect(storedValue).to.equal(123)
  })

  it('test set new value', async function () {
    const ExpressionOfPeace = await ethers.getContractFactory('ExpressionOfPeace')

    const ExpressionOfPeace = await ExpressionOfPeace.deploy(123)

    await ExpressionOfPeace.set(456)

    const storedValue = await ExpressionOfPeace.get()

    expect(storedValue).to.equal(456)
  })
})
```

You will always be able to call the `deploy` method on your contract even if you didn't define a method called `deploy` essentially it just calls your constructor.

We have defined two tests here one just deploys the contract with an initial value and checks that it was deployed properly, the other does the same except we set a new value using the `set` method defined in our smart contract.

Before we can run our test we will need to `require` `hardhat-waffle` this will make the `ethers` variable available in global scope

So add the following line to the top of your `hardhat.config.js` file:

```
require("@nomiclabs/hardhat-waffle");
```

Ok now we are ready to run our test:

```
$ hh test # or npx hardhat test

  ExpressionOfPeace contract
    ✓ test deployment (366ms)
    ✓ test set new value (52ms)


  2 passing (420ms)
```

You will notice the text that we added to the test is printed out when the test runs

**NOTE** Another good example test: [link](https://hardhat.org/tutorial/testing-contracts.html)

### console.log in solidity

When running contracts inside of the hardhat network we can make use of a special logging function provided by hardhat, here is an example of how to add it to your contract:

```
// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

import "hardhat/console.sol";

contract ExpressionOfPeace {
    uint256 current_expression;

    constructor(uint256 _current_expression) {
        console.log("Deployed by: ", msg.sender);
        console.log("Deployed with value: %s", _current_expression);
        current_expression = _current_expression;
    }

    function set(uint256 x) public {
        console.log("Set value to: %s", x);
        current_expression = x;
    }

    function get() public view returns (uint256) {
        console.log("Retrieved value: %s", current_expression);
        return current_expression;
    }
}
```



## Deploying our contract

Now we are ready to deploy our contract, hardhat provides a local blockchain for testing so that we don't need to setup a node or use a third party provider to deploy to a testnet. We will first deploy to the local network and then optionally I will show you how to deploy to a testnet.

### Deployment script

Before we can deploy our contract we will need a deployment script so that `hardhat` knows how to instantiate the contract.

- First create a directory called `scripts/` and a file inside called `deploy.js`:

```
mkdir scripts/
touch scripts/deploy.js
```

- Here is some example code we can use to deploy our contract:

```
async function main() {
  // We get the contract to deploy
  const ExpressionOfPeace = await ethers.getContractFactory("ExpressionOfPeace");
  const greeter = await ExpressionOfPeace.deploy("Express yourself!");

  // NOTE: All Contracts have an associated address
  console.log("ExpressionOfPeace deployed to:", greeter.address);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
```

### Local deployment

- Start a local node

```
hh node # or npx hardhat node
```

You should see that 20 accounts are created with 10000 ETH each.

- In another terminal deploy the contract:

```
npx hardhat run --network localhost scripts/deploy.js
```

**NOTE** Notice the `console.log` section, we can utilize the builtin logging functionality whenever our contract is deployed on the `hardhat` network, this is not just available in testing.

**NOTE** The Contract address will be useful later when we want to interact with our contract

## Creating a frontend

We will be using [React](https://reactjs.org/) since it is by far the most popular framework used to create frontends for dapps.

If you need to brush up on your React skills I recommend checking out this tutorial: [React Tutorial](https://www.youtube.com/watch?v=j942wKiXFu8&list=PL4cUxeGkcC9gZD-Tvwfod2gaISzfRiP9d)

Make sure you are in the root of our project (in the `intro-fullstack-ethereum` directory) and run:

```
npx create-react-app frontend
```

Make sure you can start your frontend by entering the `frontend` directory and running:

```
npm start
```

### Accessing the contract

Before we get started writing any code for the frontend we will need to have access to our contracts `ABI` or Application Binary Interface, which is basically just a JSON file containing the functions, permissions and other information about our smart contract. Normally this would be found under the `./artifacts/contracts/ExpressionOfPeace.sol` directory and be called: `ExpressionOfPeace.json`, but we want to move this somewhere that our frontend will be able to access it. so that `ethers.js` will know what functions are available for example.

Instead of moving this file somewhere our frontend can find it. I think it would be better if every time we compile our contract the file is automatically placed in `frontend/src/artifacts`. We can achieve this by adding the `paths` option to our `hardhat.config.js` file:

```
module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './frontend/src/artifacts',
  },
}
```

Now whenever we run `hh compile` the `ABI` is placed in `./frontend/src/artifacts`

## Metamask Hardhat Local Blockchain Fix

Before we can use metamask with our local blockchain we also need to add the following to `hardhat.config.js`:

```
module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './frontend/src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
  },
}
```

[Metamask chainId issue](https://hardhat.org/metamask-issue.html)

## Interacting with the Blockchain (using ethers.js)

Ok so now that we've created our smart contract, tested it, deployed it, and obtained the ABI, we are now ready to interact with our contract and create our dapp.

To begin remove all of the code in `src/App.js` and replace it with the code found at the following link: [App.js](https://github.com/ChristianChiarulli/intro-fullstack-ethereum/blob/master/frontend/src/App.js)

Instead of explaining all of the code here, the file is heavily commented and should explain everything you need to know.

Also get the deployed contract address from earlier and set in `App.js`:

```
const ExpressionOfPeaceAddress = '0x6d584295790d2c9f7f2d4249b6caebc15b1da682'
```

### Connect Metamask to Local Blockchain

Open up your Metamask extension, click on the top where it says `mainnet` and choose `Localhost 8545`.

I also recommend importing one of the accounts into Metamask so that you have 10,000 ether to play with. You can import by private key in metamask so just grab one of the private keys from the terminal where you started your node.

### Interact with the Dapp

You should now be able to interact with the dapp. Try getting the value and observe that it is the same value passed to the deploy function in out deploy script. After clicking the connect button you will be able to spend some ether and update the value in the smart contract.

**NOTE:** Remember changing values on chain cost ether, reading values from the blockchain is free.

## Styling

If you want to be a **fullstack** blockchain developer then you cannot escape learning `css` and how to create a solid UI/UX for your users, or investors. There are solutions like [bootstrap](https://getbootstrap.com/) available, but I would recommend at least knowing the basics including `flexbox`, `css-grid` and how to make your site responsive.

Here are some good resources to learn `css`

- [Flexbox](https://www.youtube.com/watch?v=3YW65K6LcIA)
- [CSS Grid](https://www.youtube.com/watch?v=moBhzSC455o)
- [Build a Responsive Website](https://www.youtube.com/watch?v=p0bGHP-PXD4)
- [Complete Guide](https://www.udemy.com/course/css-the-complete-guide-incl-flexbox-grid-sass/learn/lecture/9654188?start=15#content)

Remove all of the code in `src/App.css` and replace it with the code found at the following link: [App.css](https://github.com/ChristianChiarulli/intro-fullstack-ethereum/blob/master/frontend/src/App.css)

A basic understanding of `css` and `flexbox` is all you will need to understand the code found at that link. For frontend styling idea/inspiration I recommend heading over to a site like [coingecko](https://www.coingecko.com/), and click on a token you're interested, for most of them you should see a site associated with the token where you can checkout their dapp for instance here is a link to [uniswap](https://app.uniswap.org/#/swap)

## Testnet deployment (Optional)

In order to deploy your contract to a testnet you will need to edit the `hardhat.config.js` to include networks other than `localhost`.

You will need to set up an account with a node provider (you could do this without one but it will be much more complicated) for this tutorial I set one up at [alchemy.io](https://www.alchemy.com/)

We'll also need to install another package called `dotenv` so we can get secrets like the *private key* and *node url* from environment variables, that way you don't need to worry about committing them to source control.

```
cd frontend

npm i dotenv
```

For the environment variable: `RINKEBY_PRIVATE_KEY` replace it with your Rinkeby account private key. To export your private key from Metamask, open Metamask and go to **Account Details** > **Export Private Key**.

***WARNING:*** Don't use the private associated with an account you keep any real ether in!

For the environment variable: `RINKEBY_URL` replace it with the *http* key after setting up a rinkeby app in alchemy.

```
# Replace with your values
export RINKEBY_URL=https://eth-rinkeby.alchemyapi.io/v2/XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
export RINKEBY_PRIVATE_KEY=XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
```

Here is an example of adding the `Rinkeby` testnet to our list of networks:

```
require('@nomiclabs/hardhat-waffle')
require("dotenv").config();

// Replace this with a URL generated after setting up and account
// with a node provider e.g. alchemy.io
const RINKEBY_URL = process.env.RINKEBY_URL

const RINKEBY_PRIVATE_KEY = process.env.RINKEBY_PRIVATE_KEY

module.exports = {
  solidity: '0.8.4',
  paths: {
    artifacts: './frontend/src/artifacts',
  },
  networks: {
    hardhat: {
      chainId: 1337,
    },
    rinkeby: {
      url: `${RINKEBY_URL}`,
      accounts: [`${RINKEBY_PRIVATE_KEY}`],
    },
  },
}
```

After adding the new entry you will need to deploy your contract using the same deployment script and command as before

```
npx hardhat run --network rinkeby scripts/deploy.js
```

After running this command copy the address for your deployed contract and head over to [rinkeby.etherscan.io](https://rinkeby.etherscan.io/) and click on the `Contract` tab and `Verify and Publish` your contract. For this tutorial you can select `Solidity (Single file)` for `Compile Type`, `0.8.4` for the `Compiler Version` and `MIT` for `License Type`

You will also need to update the contract address in `App.js`, example:

```
const ExpressionOfPeaceAddress = '0xde4De608C284709E8980212C7A48B8bcA5b570A2'
```

### Get Test Ether

Make sure you're connected to the Rinkeby Network in Metamask before you get started. After that all you will need to do is paste your public address into the form, solve a captcha and get your ether.

[Rinkeby Faucet](https://faucets.chain.link/rinkeby) 

### Interact with Contract Deployed on Testnet

You should now be able to interact with the contract deployed to the rinkeby testnet in the same way you did with the local deployment.

### Deploy to Netlify

Finally we can deploy our dapp to a hosting site like Netlify.

To get started head over to [netlify.com](https://www.netlify.com/) and create an account.

You will also need to install `netlify-cli` via `npm`

```
npm i -g netlify-cli
```

Now we can build our application and deploy.

```
cd frontend/

npm run build

netlify deploy
```

Follow the command line prompts and choose yes for a new project and `./build` as your deploy folder.

const ethers = require('ethers');
require("dotenv").config();

// continue this with below guides.
// https://www.showwcase.com/show/14647/how-to-listen-to-pending-transactions-using-ethersjs
//https://www.showwcase.com/show/14799/how-to-decode-transactions-data-using-ethersjs

const connectWSS = () => {
    console.log(`[${(new Date).toLocaleTimeString()}] Connecting via WebSocket...`);
    const provider = new ethers.providers.WebSocketProvider(process.env.RINKEBY_WEBSOCKET_URL);
    let network = provider.getNetwork()
    network.then(res => console.log(`[${(new Date).toLocaleTimeString()}] Connected to chain ID ${res.chainId}`));
}

const listenPendingTx = (connect, answers, callback) => {
    let i = 0;
    provider.on("pending", (txHash) => {
        if (txHash) {
            process.stdout.write(`[${(new Date).toLocaleTimeString()}] Scanning transactions: ${txHash} \r`);
        }
    });
};
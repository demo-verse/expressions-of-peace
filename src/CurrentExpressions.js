const CurrentExpressions = () => {
  return (
    <div className="centered">
     
      {/* <div className="columns"> */}
        <button
          className="expr-contract-button-goerli-v2"
          style={{
            backgroundColor: "white",
            color: "black",
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
<br></br>
        <button
          className="ack-contract-button-goerli"
          style={{
            backgroundColor: "white",
            color: "black",
          }}
        >
          <a
            className="ack-contract-at-goerli"
            href="https://goerli.etherscan.io/address/0x84d1c5e0915887f83e366219fb50afe06afd97be"
            rel="noreferrer"
            target="_blank"
          >
            Acknowledgements
          </a>
        </button>
      </div>
    // </div>
  );
};

export default CurrentExpressions;

const CurrentTransactions = () => {
  return (
    <div style={{width:"80%", marginLeft: "10%"}}>
            <h2
        style={{
          fontSize: "2.2rem",
          marginTop: "42px",
          lineHeight: "2.4rem",
        }}
      >
        Browse the happenings <br></br> on blockchain
      </h2>

      <p>
        Currently, in our app, we're displaying only the last Expression of Peace, that's the only one stored at a time. <br></br> <br></br> The rest, is on each contract's transaction history, cannot be altered aka. immutable. <br></br>
        Acknowledgements of Peace are manually done via referring to an existing
        expression's transaction hash.
        <br></br>
        <br></br>{" "}
        <div className="centered">
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
          marginBottom: "32px",
          marginTop: "12px"
        }}
      >
      Acknowledgements
      </button>

   </div>
        <i>
          To discover all the expressions and
          acknowledgements, choose one pseudo-transaction from list and dig into its data. <br></br> We are working on displaying them here, on a dasboard and map. For now, we need your patience for a few weeks.
         
        </i>
      </p>
      <br></br>
      {/* <div className="columns"> */}
 
    </div>
    // </div>
  );
};

export default CurrentTransactions;

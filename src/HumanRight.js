import "./human-right.css";
const HumanRight = () => {
  return (
    <div className="human-right">
      <h3
        style={{
          fontSize: "2rem",
          lineHeight: "2.4rem",
          marginTop: "2rem",
          // marginBottom: "1rem",
          textAlign: "center",
          paddingTop: "20px",
        }}
      >
        <strong style={{ fontSize: "2rem", color: "red" }}>Generation</strong>        <strong style={{ fontSize: "2rem" }}>{" "} Peace!</strong>

      </h3>
      <p
        className="centered"
        style={{
          fontSize: "1.8rem",
          lineHeight: "2.4rem",
          paddingLeft: "40px",
          paddingRight: "40px",
          backgroundColor: "turquoise",
          paddingBlock: "20px",
          color: "black",
        }}
      >
        How would you imagine a World Peace, and make one? 
      </p>

      <p
        className="centered"
        style={{
          fontSize: "1.8rem",
          lineHeight: "2.6rem"
          
        }}
      >
        <strong>Introducing a new human right:</strong> <br></br>
        <span
          style={{
            backgroundColor: "yellow",
            color: "black",
            paddingRight: "6px",
            justifyContent: "center",
            paddingLeft: "6px",
                      paddingBlock: "20px",
                      fontWeight:"500"

          }}
        >
          Everyone is equally significant on being co-signers and sealers of
          a World Peace treaty, and shall be legitimately as powerful as their states, on this matter, in the 21st century.
        </span>{" "}
        <br></br>
       
      </p>
      <p>
        <i style={{ fontSize: "1.8rem" }}>
          * Introducing a 21st century,{" "}
            <span
              style={{  backgroundColor: "red", color: "black" }}
            >
              {" "}
              peer to peer diplomacy
            </span>  paradigm on {" "}
          <span
            style={{ backgroundColor: "aqua", color: "black" }}
          >
            blockchain,
          </span>
          <br></br> through a synthesis of two doctrines:{" "}
          <br></br> <br></br>
          -Mutual Assured Destruction <br></br> X <br></br>
          +Mutual Assured Regeneration <br></br>||
          <br></br>
          <strong>
            <span
              style={{
                padding: "3px",
                backgroundColor: "yellow",
                color: "black",
              }}
            >
              {" "}
              ~ Peace by Equality 
            </span>
          </strong>
          <br></br>
        </i>
        <br></br>
      </p>

      {/* <div className="centered" style={{ marginTop: "40px" }}>
        <img
          alt="express yourself!"
          // height={"100px"}
          src="envelope.jpg"
          width={"42%"}
        ></img>
      </div>{" "} */}
      {/* <p
        className="centered"
        style={{
          fontSize: "1.6rem",
          lineHeight: "2.6rem",
          marginTop: "40px",
          mar
          
          ginRight: "8%",
          marginLeft: "8%",
        }}
      >
        a technology can sincerely and effectively help peace and trust making
        in the 21st century and forwards.
      </p> */}
    </div>
  );
};

export default HumanRight;

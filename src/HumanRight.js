import "./human-right.css";
const HumanRight = () => {
  return (
    <div className="human-right">
      <img
        alt="Nelson Mandela encouraging us to make peace"
        src="Nelson_Mandela_GenerationPeace.png"
      ></img>
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
        <strong>#GenerationPeace!</strong>
      </h3>
      <p
        className="centered"
        style={{
          fontSize: "1.8rem",
          lineHeight: "2.6rem",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        How would you imagine, express, acknowledge and make a World Peace?
      </p>

      <p
        className="centered"
        style={{
          fontSize: "1.8rem",
          lineHeight: "2.6rem",
          paddingLeft: "40px",
          paddingRight: "40px",
        }}
      >
        <strong>Introducing a new human right:</strong>{" "}
  

        <span
          style={{
            backgroundColor: "yellow",
            color: "black",
            paddingRight: "6px",
            paddingLeft: "6px",
          }}
        >
          Individuals are equally significant
        </span>{" "}
        on being co-signers and sealers of a world peace treaty*, <br></br>
        and shall be legitimately as powerful as their states on this matter, in the 21st
        century.
      </p>
      <p>
      <i>* Introducing a p2p diplomacy doctrine: <br></br>  a mutual assured regeneration aka. Art of Peace.</i>
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

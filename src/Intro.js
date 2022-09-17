const Intro = () => {
  return (
    <div style={{ textAlign: "center" }}>

<img
              alt="Peace symbol, colorful"
              src="colorful-peace.png"
              width={"22%"}
            ></img>
      <h1
        style={{
          fontSize: "2rem",
          marginTop: "1rem",
          lineHeight: "1.6rem",
        }}
      >
        start, a World Peace.
      </h1>
      <a
        href="https://www.youtube.com/watch?v=jW4VZ5J0fNQ"
        target={"_blank"}
        rel="noreferrer"
      >
        <h1
          style={{
            fontSize: "2rem",
            marginTop: "1rem",
            color: "purple",
            lineHeight: "2.2rem",
          }}
        >
          <u>express yourself!</u>
        </h1>
      </a>
      .
      <div>
        <p
          style={{
            marginLeft: "10%",
            marginRight: "10%",
            color: "black",
            padding: "20px",

            backgroundColor: "#afeeee",

            textAlign: "center",
            fontSize: "1.6rem",
          }}
        >
          {" "}
          Expressions of Peace, extend the Freedom of Expression; <br></br>
          <span
            style={{
              backgroundColor: "yellow",
              color: "black",
              paddingLeft: "4px",
              paddingRight: "4px",
            }}
          >
            to experience
          </span>{" "}
          a World Peace, as a civilisation.
        </p>
      </div>
    </div>
  );
};

export default Intro;

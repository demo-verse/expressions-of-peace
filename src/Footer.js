import { React } from "react";
const Footer = () => {
  return (
    <footer>
      <div className="centered">
      <div className="centered" style={{fontSize: "1.2rem",textAlign: "center", marginBlock: "0.2rem"}}>
     <div style={{marginTop:"2rem"}}>
     <img
        alt="Peace symbol, colorful"
        src="colorful-peace.png"
        width={"16%"}
      ></img>
     </div>
        <p style={{marginBlock: "1.4rem", marginLeft:"4rem", marginRight:"4rem", fontSize:"1.4rem"}}>
          This human right, concept, perspective and notion shall be a canvas; on which our
          kind making <span style={{color: "black", backgroundColor: "turquoise"}}>Art of Peace,</span> {" together."}
        </p>
      </div>

        <a
          className="source-code-link"
          href="https://miro.com/app/board/uXjVOX94E5k=/?invite_link_id=638195022576"
          rel="noreferrer"
          target="_blank"
          style={{marginTop:"0.2rem", fontSize: "1.2rem" }}
        >
        {"> "}  imagination {" <"}
        </a>
        <br></br>
      </div>
      <div className="columns">
        <a
          className="source-code-link"
          href="https://discord.gg/CfGzp3st3k"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          community
        </a>

        <a
          className="source-code-link"
          href="https://github.com/demo-verse/expressions-of-peace"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          sourceCode
        </a>

        {/* {gasPrice} gwei &bull; {blockNumber} */}
      </div>
      <br></br>
      <div className="centered columns">
        <a
          className="source-code-link"
          href="https://app.dework.xyz/demoverse/expressions-of-peace/view/board-l821cjm7"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          bounties
        </a>
        <a
          className="source-code-link"
          href="https://crowdin.com/project/worldpeace"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          translationsHub
        </a>
      </div>
      <br></br>
      <div className="columns">
        <a
          className="source-code-link"
          href="https://twitter.com/demoversal"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          twitter
        </a>
{/* 
        <a
          className="source-code-link"
          href="https://github.com/demo-verse/expressions-of-peace"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          github
        </a> */}

        <a
          className="source-code-link"
          href="https://www.youtube.com/channel/UCqtm34_hfBCSnFr03KgqUSg/featured"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          youtube
        </a>
      </div>

      <br></br>
      <br></br>
      <div className="columns">
        <a
          // className="source-code-link"
          href="https://demover.se"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          <img
            src="demoVerse-logo.png"
            width={"100px"}
            height="38px"
            alt="demoVerse"
          ></img>
        </a>

        <a
          // className="source-code-link"
          href="https://stateful.art"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          <img
            src="start-logo.png"
            width={"100px"}
            height="38px"
            alt="stateful.art"
          ></img>
        </a>
      </div>
      <br></br>
      <div className="centered columns">
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
        <a
          className="license-link"
          href="https://mit-license.org/"
          rel="noreferrer"
          target="_blank"
        >
          <img
            src="mit-license.png"
            alt="mit license"
            width={"60px"}
            height={"60px"}
          ></img>
        </a>
      </div>
      <hr></hr>
      <div className="centered">
        <p  style={{ fontSize: "1.2rem", marginTop:"1rem" }}>contact@stateful.art</p>
        <p  style={{ fontSize: "1.2rem" }}> {"<| "}<span style={{color: "turquoise"}}>all rights acknowledged</span> {" |>"}</p>

      </div>
    
    </footer>
  );
};

export default Footer;

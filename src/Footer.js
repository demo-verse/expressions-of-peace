import { React } from "react";
const Footer = () => {
  return (
    <footer>
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
          tasksOfpeace
        </a>
        <a
          className="source-code-link"
          href="https://github.com/demo-verse/expressions-of-peace"
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

        <a
          className="source-code-link"
          href="https://github.com/demo-verse/expressions-of-peace"
          rel="noreferrer"
          target="_blank"
          style={{ fontSize: "1.2rem" }}
        >
          github
        </a>

        {/* {gasPrice} gwei &bull; {blockNumber} */}
      </div>

    <br></br><br></br>
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
    </footer>
  );
};

export default Footer;

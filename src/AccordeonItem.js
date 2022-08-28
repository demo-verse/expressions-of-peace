import { useRef, useEffect, useState } from "react";
const AccordeonItem = ({ questionTxt, answerTxt, bgColor, txtColor }) => {
  const [active, setActive] = useState(false);

  const contentRef = useRef(null);

  useEffect(() => {
    contentRef.current.style.maxHeight = active
      ? `${contentRef.current.scrollHeight}px`
      : "0px";
  }, [contentRef, active]);

  const toggleAccordion = () => {
    setActive(!active);
  };

  return (
    <div className="faq-accordeon">
      <button
        className={`question-section ${active}`}
        style={{ fontSize: "1.6rem" }}
        onClick={toggleAccordion}
      >
        <div style={{ backgroundColor: bgColor }}>
          <div className="question-align">
            <h2
              className="question-style"
              style={{ color: txtColor, paddingLeft: "4rem" }}
            >
              {questionTxt}
            </h2>
            {/* <FiPlus
                  className={active ? `question-icon rotate` : `question-icon`}
                /> */}
          </div>
          <div
            ref={contentRef}
            className={active ? `answer answer-divider` : `answer`}
          >
            <p style={{ textAlign:"start", color: txtColor, fontSize: "1.8rem", paddingLeft: "0.rem", paddingTop: "0.2rem" }}>{answerTxt}</p>
          </div>
        </div>
      </button>
    </div>
  );
};

export default AccordeonItem;

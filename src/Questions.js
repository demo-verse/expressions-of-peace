import AccordeonItem from "./AccordeonItem";

const Questions = () => {
return(
    <div>
            <AccordeonItem
              txtColor={"white"}
              bgColor={"black"}
              questionTxt={"what"}
              // answerTxt={
              //   "A global, peer-to-peer diplomacy and consensus, of the world residents: a progressive World Peace vision, challenge and a historical change. The scope is clear: ending direct and indirect/proxied conflicts and wars between the member states of the Charter of the United Nations; while reallocating the future investments on war industries to regeneration: 2030 Sustainable Development Goals. (eg. by making tax for national defense eventually unnecessary, as citizens of states proactively sealing those multi-lateral assurances with their peers with the Acknowledgements of Peace and there emerging a united army of all nations, securing all, equally.)"
              // }
              answerTxt={
                "A global, peer-to-peer diplomacy and consensus, of the world residents: a progressive World Peace vision, challenge and a historical change. The scope is clear: ending direct and indirect/proxied conflicts and wars between the member states of the Charter of the United Nations; while eventually reallocating the future investments of defense and warfare to regeneration, globally: namingly, 2030 UN Sustainable Development Goals. "
              }
            />
            <AccordeonItem
              txtColor={"black"}
              bgColor={"yellow"}
              questionTxt={"why"}
              answerTxt={
                "Making common sense and meaning is needed to solve global problems. A World Peace is a consensus, that needs consensus in the first place, to sincerely and effectively move away with the problems that caused by a senseless competition, resulting with sustained conflicts, wars, inequalities and climate change."
              }
            />
            <AccordeonItem
              txtColor={"black"}
              bgColor={"#fac2d6"}
              questionTxt={"who"}
              answerTxt={
                "This is a multi-stakeholder scenario; including every individual, their states, NGOs and corporations. In short, altogether. Gotta be a holistic, diverse and inclusive cooperation, by design. "
              }
            />
            <AccordeonItem
              txtColor={"black"}
              bgColor={"orange"}
              questionTxt={"how"}
              answerTxt={
                "We will figure out together and develop multiple, evolving solutions and social contracts as imagination, research and developments proceed. Here, social contracts, in core, helping us making a World Peace via expressions, acknowledgements and hence assurances to the world. We are hopeful, that intentionality will overcome impressions and biases. Overall, the experience should feel like a small step for each individual, and a big one for our kind and the rest."
              }
              // answerTxt={
              //   "We'll figure out together. Here, contracts, in core, technical tools of reflections; helping us making a World Peace via expressions, demands, acknowledgements and hence assurances to the rest of the world, undeniably. This well may be in forms of, writing social and environmental contracts, that are writing a future, from now."
              // }
            />
            <AccordeonItem
              txtColor={"black"}
              bgColor={"#afeeee"}
              questionTxt={"when "}
              answerTxt={
                'An ultimate world peace, is our legacy, to be. An effective use of this emerging right, in fact, should suffice, even when considered as a  "once in a lifetime experience" of the 21st century and forwards.'
              }
            />
            <AccordeonItem
              txtColor={"white"}
              bgColor={"black"}
              questionTxt={"lastly"}
              answerTxt={
                'This human right, design, notion and perspective shall be a canvas, on which our kind making Art of Peace, together. Future generations, beholders, will be learning from our efforts and remember us as "aware, courageous, artful and peaceful enough" on empowering ourselves, each other and our states, via accumulation and observation of legitimate and sincere, will and intentions. Trust that, a World peace, initiated by citizens, is not a matter of legitimacy, but matter of time in its observation and accomplishment. Power and violence shall be seperated so well.'
              }
            />
          </div>
)
}

export default Questions;
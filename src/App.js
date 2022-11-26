import "./App.css";
import Footer from "./Footer";
import Outro from "./Outro";
import Questions from "./Questions";
import Intro from "./Intro";
import HumanRight from "./HumanRight";
import CurrentTransactions from "./CurrentTransactions";
import Toolkit from "./Toolkit";
import HybridTheory from "./HybridTheory";
import ExtendIt from "./ExtendIt";

const App = () => {
  return (
    <div className="layout">
      <header className="navbar">
        <div className="container columns">
          <div className="logo">
            <a href="https://expressionsofpeace.org">Peacemaker</a>
          </div>
        </div>
      </header>

      <section className="expressions centeed">
      <Toolkit/>
      </section>
     

      <Footer />
    </div>
  );
};

export default App;

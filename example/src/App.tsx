import React from "react";
import InfiniteTextReel from "react-infinite-text-reel";
import "./App.css";

function App() {
  return (
    <div>
      <div className="big">Scroll down</div>
      <InfiniteTextReel
        reelTexts={["Vineet"]}
        affectOnScrollArr={[true]}
        directionArr={[1]}
        duration={[30]}
      />
      <div className="big">Scroll up</div>
    </div>
  );
}

export default App;

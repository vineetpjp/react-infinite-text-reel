import React from "react";
import InfiniteTextReel from "react-infinite-text-reel";
import "./App.css";

function App() {
  return (
    <div>
      <div className="big" />
      <InfiniteTextReel
        reelTexts={["Vineet"]}
        affectOnScrollArr={[true]}
        directionArr={[1]}
        duration={[30]}
      />
      <div className="big" />
    </div>
  );
}

export default App;

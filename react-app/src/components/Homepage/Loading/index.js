import React from "react";
import "./index.css";

function Loading() {
  let block = [];
  for (let i = 1; i <= 20; i++) {
    block.push(i);
  }
  return (
    <div className="main-inner">
      <div className="grid">
        {block.map((i) => (
          <div className="flex-column" key={i}>
            <div className="mb-12">
              <div className="l-img-block"></div>
            </div>
            <div className="lb-bottom">
              <div className="lb-left">
                <div className="l-left-block"></div>
                <div className="l-left-block"></div>
                <div className="l-left-block"></div>
              </div>
              <div className="lb-right">
                <div className="l-right-block"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Loading;

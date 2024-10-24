import React from "react";
import "./index.css";

function LoadingBlock() {
  return (
    <div className="full-vh">
      <div className="spinner" id="spinner"></div>
      <div className="spin-text">Loading...</div>
    </div>
  );
}

export default LoadingBlock;

import React from "react";
import Header from "../../Homepage/Header";
import "./index.css";

function SpotLoading() {
  return (
    <>
      <div className="main-inner">
        <div className="sdl-top">
          <div className="sdlt-top"></div>
          <div className="sdlt-bottom"></div>
        </div>
        <div className="sdl-mid">
          <div className="sdlm-left"></div>
          <div className="sdlm-right">
            <div className="sdlm-block"></div>
            <div className="sdlm-block btrr-12"></div>
            <div className="sdlm-block"></div>
            <div className="sdlm-block bbrr-12"></div>
          </div>
        </div>
        <div className="sdl-bottom">
          <div className="sdlb-left">
            <div className="sdlb-left-top"></div>
            <div className="sdlb-left-bottom"></div>
          </div>
          <div className="sdlb-right">
            <div className="sdlb-right-left">
              <div className="sdlb-rl-img"></div>
            </div>
            <div className="sdlb-right-right">
              <div className="sdlb-rr-top"></div>
              <div className="sdlb-rr-bottom"></div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default SpotLoading;

import React from "react";
import { useTag } from "../../../context/tag";
import "./index.css";

function Banner() {
  const {
    all,
    setAll,
    camp,
    setCamp,
    cabin,
    setCabin,
    aview,
    setAview,
    setType,
  } = useTag();

  return (
    <div className="banner-box">
      <div className="flex">
        <div className="bb-left mr-20">
          <div className="flex center">
            <button
              className={`bb-bt ${all ? "highlight" : ""}`}
              onClick={() => {
                setType("");
                setAll(true);
                setCabin(false);
                setAview(false);
                setCamp(false);
                window.scrollTo(0, 0);
              }}
            >
              <div className="flex-column center gap-8">
                <img
                  className="bb-img saturate"
                  src="https://a0.muscache.com/pictures/1d477273-96d6-4819-9bda-9085f809dad3.jpg"
                  alt="all"
                  onError={(e) => {
                    e.currentTarget.src = "/default.JPG";
                  }}
                />
                <div className="bb-text">
                  <span>All</span>
                </div>
              </div>
            </button>
            <button
              className={`bb-bt ${camp ? "highlight" : ""}`}
              onClick={() => {
                setType("camping");
                setAll(false);
                setCabin(false);
                setAview(false);
                setCamp(true);
                window.scrollTo(0, 0);
              }}
            >
              <div className="flex-column center gap-8">
                <img
                  className="bb-img"
                  src="https://a0.muscache.com/pictures/ca25c7f3-0d1f-432b-9efa-b9f5dc6d8770.jpg"
                  alt="all"
                  onError={(e) => {
                    e.currentTarget.src = "/default.JPG";
                  }}
                />
                <div className="bb-text">
                  <span>Camping</span>
                </div>
              </div>
            </button>
            <button
              className={`bb-bt ${cabin ? "highlight" : ""}`}
              onClick={() => {
                setType("cabins");
                setAll(false);
                setCabin(true);
                setAview(false);
                setCamp(false);
                window.scrollTo(0, 0);
              }}
            >
              <div className="flex-column center gap-8">
                <img
                  className="bb-img"
                  src="https://a0.muscache.com/pictures/732edad8-3ae0-49a8-a451-29a8010dcc0c.jpg"
                  alt="cabins"
                  onError={(e) => {
                    e.currentTarget.src = "/default.JPG";
                  }}
                />
                <div className="bb-text">
                  <span>Cabins</span>
                </div>
              </div>
            </button>
            <button
              className={`bb-bt ${aview ? "highlight" : ""}`}
              onClick={() => {
                setType("amazing views");
                setAll(false);
                setCabin(false);
                setAview(true);
                setCamp(false);
                window.scrollTo(0, 0);
              }}
            >
              <div className="flex-column center gap-8">
                <img
                  className="bb-img"
                  src="https://a0.muscache.com/pictures/3b1eb541-46d9-4bef-abc4-c37d77e3c21b.jpg"
                  alt="amazing views"
                  onError={(e) => {
                    e.currentTarget.src = "/default.JPG";
                  }}
                />
                <div className="bb-text">
                  <span>Amazing views</span>
                </div>
              </div>
            </button>
          </div>
        </div>
        <div className="bb-right"></div>
      </div>
    </div>
  );
}

export default Banner;

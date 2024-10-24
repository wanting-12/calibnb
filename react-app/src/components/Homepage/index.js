import React from "react";
import Banner from "./Banner";
import Footer from "./Footer";
import Header from "./Header";
import AllSpots from "./Spots";
import "./index.css";

function Homepage() {
  return (
    <div className="homepage-container">
      <Header />
      <div className="banner-container">
        <Banner />
      </div>
      <div className="map-container grid"></div>
      <div className="main-container">
        <AllSpots />
      </div>
      <Footer />
    </div>
  );
}

export default Homepage;

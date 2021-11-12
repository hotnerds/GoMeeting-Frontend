import React from "react";
import { HashRouter } from "react-router-dom";
import Navigation from "./Navigation";
import HomeMyInfo from "./HomeMyInfo";
const Home = () => {
  return (
    <section className="navigatior">
      <HashRouter>
        <Navigation />
      </HashRouter>
      <HomeMyInfo />
    </section>
  );
};

export default Home;

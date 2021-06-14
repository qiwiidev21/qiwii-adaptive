import React from "react";
import "./styles.css";
import Header from "../../components/Header";
import Hero from "../../components/Hero";

import launchImage from "../../assets/images/header-qiwii-launch.png";

const Schedule = (props) => {
  return (
    <div>
      <Header back title="Pilih Jadwal" />
      <Hero url={launchImage} alt="Qiwii" customStyle="content-bg-hero" />
    </div>
  );
};

export default Schedule;

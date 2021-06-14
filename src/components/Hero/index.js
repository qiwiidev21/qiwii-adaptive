/*
 * Hero Component
 */

import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

function Hero({ url, alt, customStyle }) {
  return (
    <div className="customStyle.content-bg-hero content-bg d-flex justify-content-center align-content-center">
      <img src={url} alt={alt} className="img-fluid" />
    </div>
  );
}

Hero.propTypes = {
  alt: PropTypes.string,
  url: PropTypes.string.isRequired,
};

Hero.defaultProps = {
  alt: "",
  url: "",
};

export default Hero;

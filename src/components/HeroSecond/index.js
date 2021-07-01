/*
 * Hero Component
 */

import React from "react";
import "./styles.css";
import PropTypes from "prop-types";

function Hero({ url, alt, customStyle }) {
  return (
    <div className="content-bg-second d-flex justify-content-center align-content-center">
      <img
        src={url}
        alt={alt}
        className="img-fluid"
        height="100px"
        width="60%"
      />
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

/*
 * Hero Component
 */

import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";

function Hero({ url, alt, customStyle }) {
  return (
    <Carousel
      autoPlay
      width={"100%"}
      centerMode={false}
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      dynamicHeight
    >
      {url.map((it) => (
        <img
          src={it.promo_large_link}
          alt={it.promo_link}
          className="img-fluid img-custom"
        />
      ))}
    </Carousel>
  );
}

Hero.propTypes = {
  alt: PropTypes.string,
  url: PropTypes.arrayOf(PropTypes.object),
};

Hero.defaultProps = {
  alt: "",
  url: "",
};

export default Hero;

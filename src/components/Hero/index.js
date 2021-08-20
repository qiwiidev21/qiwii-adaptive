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
    <div className="hero">
      <Carousel
        autoPlay
        width={"100%"}
        verticalSwipe={"natural"}
        centerMode
        showThumbs={false}
        showStatus={false}
        centerSlidePercentage={100}
      >
        {url.map((it, index) => (
          <img
            key={index}
            src={it.promo_large_link}
            alt={it.promo_link}
            className="img-fluid img-custom"
          />
        ))}
      </Carousel>
    </div>
  );
}

Hero.propTypes = {
  alt: PropTypes.string,
  url: PropTypes.arrayOf(PropTypes.object),
};

Hero.defaultProps = {
  alt: "",
  url: [],
};

export default Hero;

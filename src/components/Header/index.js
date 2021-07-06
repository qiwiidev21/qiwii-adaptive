/*
 * Header Component
 */

import React, { useEffect, useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import Logo from "../../assets/images/header-logo.png";
import { ArrowLeft, Bell } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import _ from "lodash";

function Header({ back, title, profile }) {
  let history = useHistory();

  const [bgColor, setBGColor] = useState();

  useEffect(() => {
    if (profile) {
      if (!_.isEmpty(profile)) {
        setBGColor(profile.display.config.main_color);
      }
    }
  }, [profile]);

  const renderBack = () => {
    return (
      <button
        className="btn btn-primary-outline"
        onClick={() => history.goBack()}
      >
        <ArrowLeft color="white" size={24} />
      </button>
    );
  };

  return (
    <header
      className="navbar navbar-expand-md navbar-dark"
      style={{ backgroundColor: bgColor ? `${bgColor}` : "#8F1619" }}
    >
      <nav className="container">
        {back ? renderBack() : <div className="px-2" />}
        <div className="navbar-brand">
          {title ? (
            <h4 className="title">{title}</h4>
          ) : (
            <img
              src={Logo}
              alt=""
              width="90"
              height="45"
              className="img-fluid"
            />
          )}
        </div>
        <div>
          <Bell color="white" size={20} />
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string,
};

Header.defaultProps = {
  back: false,
  title: "",
};

export default Header;

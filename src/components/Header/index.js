/*
 * Header Component
 */

import React from "react";
import "./styles.css";
import PropTypes from "prop-types";
import Logo from "../../assets/images/header-logo.png";
import { ArrowLeft, Bell } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";

function Header({ back, title }) {
  let history = useHistory();

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
    <header className="navbar navbar-expand-md navbar-dark bg-primary">
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

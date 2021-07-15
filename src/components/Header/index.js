/*
 * Header Component
 */

import React, { useEffect, useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import Logo from "../../assets/images/header-logo.png";
import { ArrowLeft, Bell, PersonCircle } from "react-bootstrap-icons";
import { useHistory } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";

function Header(props) {
  let history = useHistory();

  const [bgColor, setBGColor] = useState();

  useEffect(() => {
    if (props.profile) {
      if (!_.isEmpty(props.profile)) {
        setBGColor(props.profile.display.config.main_color);
      }
    }
  }, [props.profile]);

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
        {props.back ? renderBack() : <div className="px-2" />}
        <div className="navbar-brand">
          {props.title ? (
            <h4 className="title">{props.title}</h4>
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
          {_.isEmpty(props.dataSession) ? (
            <Bell color="white" size={20} />
          ) : (
            <PersonCircle color="white" size={20} />
          )}
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

const mapStateToProps = (state) => ({
  dataSession: state.dataSession,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);

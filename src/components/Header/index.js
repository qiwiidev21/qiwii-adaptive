/*
 * Header Component
 */

import React, { useEffect, useState, forwardRef } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import Logo from "../../assets/images/header-logo.png";
import {
  ArrowLeft,
  PersonCircle,
  BoxArrowInRight,
  ThreeDotsVertical,
} from "react-bootstrap-icons";
import { Link, useHistory, useRouteMatch } from "react-router-dom";
import _ from "lodash";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import Dropdown from "react-bootstrap/Dropdown";

const CustomToggle = forwardRef(({ children, onClick }, ref) => (
  <button
    ref={ref}
    className="btn btn-primary-outline"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </button>
));

const CustomMenu = forwardRef(
  ({ children, style, className, "aria-labelledby": labeledBy }, ref) => {
    const [value, setValue] = useState(""); // eslint-disable-line no-unused-vars

    return (
      <div
        ref={ref}
        style={style}
        className={className}
        aria-labelledby={labeledBy}
      >
        <ul className="list-unstyled">
          {React.Children.toArray(children).filter(
            (child) =>
              !value || child.props.children.toLowerCase().startsWith(value)
          )}
        </ul>
      </div>
    );
  }
);

function Header(props) {
  let history = useHistory();

  const { url } = useRouteMatch();

  const [bgColor, setBGColor] = useState();
  const [sessionStored, setSessionStored] = useState({});

  useEffect(() => {
    if (props.profile) {
      if (!_.isEmpty(props.profile)) {
        setBGColor(props.profile.display.config.main_color);
      }
    }
  }, [props.profile]);

  useEffect(() => {
    getSession();
  }, []);

  function getSession() {
    const user = sessionStorage.getItem("user");
    setSessionStored(JSON.parse(user));
  }

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
          {_.isEmpty(sessionStored) ? (
            <div className="row">
              <button
                className="btn btn-primary-outline"
                onClick={() => history.push(`${url}login`)}
              >
                <BoxArrowInRight color="white" size={20} />
              </button>
            </div>
          ) : (
            <div className="row">
              <div className="row">
                <button
                  className="btn btn-primary-outline"
                  onClick={() => history.push(`${url}profile`)}
                >
                  <PersonCircle color="white" size={20} />
                </button>
                <Dropdown>
                  <Dropdown.Toggle
                    as={CustomToggle}
                    id="dropdown-custom-components"
                  >
                    <ThreeDotsVertical color="white" size={20} />
                  </Dropdown.Toggle>
                  <Dropdown.Menu as={CustomMenu}>
                    <Dropdown.Item eventKey="1">
                      <Link to={"/profile"}>Profil</Link>
                    </Dropdown.Item>
                    <Dropdown.Item eventKey="2">
                      <Link to={"/antrian"}>Antrian Saya</Link>
                    </Dropdown.Item>
                    <div className="dropdown-divider"></div>
                    <Dropdown.Item eventKey="3">
                      <button
                        className="btn-custom btn-primary-outline"
                        onClick={async () => {
                          await sessionStorage.removeItem("user");
                          await sessionStorage.removeItem("token");
                          await sessionStorage.removeItem("unique_identifier");
                          await history.push("/");
                        }}
                      >
                        Keluar
                      </button>
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
              </div>
            </div>
          )}
        </div>
      </nav>
    </header>
  );
}

Header.propTypes = {
  back: PropTypes.bool,
  title: PropTypes.string,
  onClick: PropTypes.func,
};

Header.defaultProps = {
  back: false,
  title: "",
  onClick: () => {},
};

const mapStateToProps = (state) => ({
  dataSession: state.dataSession,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);

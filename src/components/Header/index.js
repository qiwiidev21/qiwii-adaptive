/*
 * Header Component
 */

import React, { useEffect, useState, forwardRef } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import Logo from "../../assets/images/header-logo.png";
import { ArrowLeft, List } from "react-bootstrap-icons";
import { useHistory, useRouteMatch } from "react-router-dom";
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

  // const [bgColor, setBGColor] = useState();
  const [sessionStored, setSessionStored] = useState({});

  // useEffect(() => {
  //   if (props.profile) {
  //     if (!_.isEmpty(props.profile)) {
  //       setBGColor(props.profile.display.config.main_color);
  //     }
  //   }
  // }, [props.profile]);

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
    <>
      <header
        className="d-flex navbar navbar-expand-lg navbar-dark sticky-top"
        style={{ backgroundColor: "#8F1619" }}
      >
        <nav className="container">
          <div className="pl-2">
            {props.back ? (
              renderBack()
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

          {!props.search && props.title && (
            <div className="navbar-brand navbar-custom">
              <h4 className="title">{props.title}</h4>
            </div>
          )}

          <div className="px-4">
            {_.isEmpty(sessionStored) ? (
              <div className="row">
                <div className="navbar-brand navbar-custom">
                  {props.search && (
                    <button
                      className="btn-custom-slot btn-primary-outline"
                      onClick={() => props.onSearch()}
                    >
                      <input
                        value={props.value}
                        placeholder={props.placeholder}
                        className="form-control nav-form"
                        onChange={(event) => props.onChange(event)}
                      />
                    </button>
                  )}
                </div>
                <button
                  className="btn btn-primary-outline"
                  onClick={() => history.push(`${url}login`)}
                >
                  <h5 className="title">Masuk</h5>
                </button>
              </div>
            ) : (
              <div>
                <div className="row">
                  <div>
                    {props.search && (
                      <button
                        className="btn-custom-slot btn-primary-outline"
                        onClick={() => props.onSearch()}
                      >
                        <input
                          value={props.value}
                          placeholder={props.placeholder}
                          className="form-control nav-form"
                          onChange={(event) => props.onChange(event)}
                        />
                      </button>
                    )}
                  </div>
                  <Dropdown>
                    <Dropdown.Toggle
                      as={CustomToggle}
                      id="dropdown-custom-components"
                    >
                      <List color="white" size={25} />
                    </Dropdown.Toggle>
                    <Dropdown.Menu as={CustomMenu}>
                      <Dropdown.Item eventKey="1">
                        <button
                          className="btn-custom btn-primary-outline"
                          onClick={async () => await history.push("/profile")}
                        >
                          Profil
                        </button>
                      </Dropdown.Item>
                      <Dropdown.Item eventKey="2">
                        <button
                          className="btn-custom btn-primary-outline"
                          onClick={async () => await history.push("/antrian")}
                        >
                          Antrian Saya
                        </button>
                      </Dropdown.Item>
                      <div className="dropdown-divider"></div>
                      <Dropdown.Item eventKey="3">
                        <button
                          className="btn-custom btn-primary-outline"
                          onClick={async () => {
                            await sessionStorage.removeItem("user");
                            await sessionStorage.removeItem("token");
                            await sessionStorage.removeItem(
                              "unique_identifier"
                            );
                            await sessionStorage.removeItem("payment");
                            await history.push("/");
                            await window.location.reload(false);
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
      {_.isEmpty(sessionStored) && (
        <div className="tooltips">
          <h5 className="info-login">
            Silahkan masuk untuk melanjutkan pengambilan antrian Anda
          </h5>
        </div>
      )}
      {props.dataUserProfile.data &&
        props.dataUserProfile.data.verification_status !== "1" && (
          <div className="tooltips">
            <h5 className="info-login">Segera lakukan verifikasi user Anda</h5>
          </div>
        )}
    </>
  );
}

Header.propTypes = {
  back: PropTypes.bool,
  search: PropTypes.bool,
  title: PropTypes.string,
  placeholder: PropTypes.string,
  onClick: PropTypes.func,
  value: PropTypes.string,
  onChange: PropTypes.func,
};

Header.defaultProps = {
  back: false,
  search: false,
  title: "",
  value: "",
  placeholder: "",
  onClick: () => {},
  onChange: () => {},
};

const mapStateToProps = (state) => ({
  dataSession: state.dataSession,
  dataUserProfile: state.dataUserProfile,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(ActionCreators, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Header);

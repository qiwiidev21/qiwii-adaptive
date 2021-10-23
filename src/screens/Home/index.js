import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import { Link, useHistory, useLocation } from "react-router-dom";
import "./styles.css";
import PropTypes from "prop-types";
// import { useCookies } from "react-cookie";
import {Helmet} from "react-helmet";

const Home = (props) => {
  const [promo, setPromo] = useState([]);

  let history = useHistory();
  let location = useLocation();

  useEffect(() => {
    fetchMenuCategory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchMenuCategory() {
    props.fetchMenuCategory();
  }
  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(10).then((data) => {
      setPromo(data);
    });
  }

  useEffect(() => {
    fetchDataCategories();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataCategories() {
    props.getCategories();
  }

  useEffect(() => {
    fetchDataTypes();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataTypes() {
    props.getTypes();
  }

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Qiwii: Sistem antrian online untuk berbagai macam sektor industri dan berbagai macam skala usaha"
        />
      <title>Qiwii: Sistem antrian online</title>
      </Helmet>
      <Header
        onClick={() => {}}
        search
        placeholder={"Search"}
        onSearch={() => history.push(`${location.pathname}global`)}
      />

      <Hero url={promo} alt="Qiwii" />
      {/* Start Of Menu */}
      <div className="menu">
        <div className="d-flex container-custom justify-content-center flex-wrap flex-row px-2 py-3 row">
          {props.dataMenu.data &&
            props.dataMenu.data.map((item, index) => (
              <div key={index} className="card-menu col-3 shadow-sm d-flex">
                <Link to={`${item.navigate.toLowerCase()}`}>
                  <div className="justify-content-center align-items-center">
                    {item.title === "Shipping" || item.title === "Retail" ? (
                      <div className="d-flex background">
                        <img
                          src={item.icon}
                          className="img-fluid round"
                          alt={item.title}
                        />
                      </div>
                    ) : (
                      <img
                        src={item.icon}
                        className="img-fluid round"
                        alt={item.title}
                      />
                    )}

                    <h6 className="pt-3 card-title">{item.title}</h6>
                  </div>
                </Link>
              </div>
            ))}
        </div>
      </div>
      {/* End Of Menu */}
    </div>
  );
};

Home.defaultProps = {
  fetchMenuCategory: () => {},
};

Home.propTypes = {
  fetchMenuCategory: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataMenu: state.dataMenu,
  dataSession: state.dataSession,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

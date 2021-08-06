import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./styles.css";
import PropTypes from "prop-types";
// import { useCookies } from "react-cookie";

const Home = (props) => {
  const [promo, setPromo] = useState([]);

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
    <div>
      <Header onClick={() => {}} />
      <Hero url={promo} alt="Qiwii" />
      {/*  <div className="container">
          <div className="input-form form-group m-2 justify-content-center align-self-center">
            <input
              placeholder="Cari Merchant"
              className="form-control"
              onChange={() => {}}
            />
          </div>
        </div>*/}
      {/* Start Of Menu */}
      <div className="d-flex container col-sm-8 col-md-6 col-lg-5 col-xl-5 col-xs-10 flex-wrap justify-content-center my-5">
        {props.dataMenu.data &&
          props.dataMenu.data.map((item, index) => (
            <Link key={index} to={`/${item.navigate.toLowerCase()}`}>
              <div className="card-menu p-3 p-md-4 m-2 align-self-center shadow-sm">
                <div className="justify-content-center align-items-center">
                  {item.title === "Shipping" || item.title === "Retail" ? (
                    <div className="d-flex background">
                      <img
                        src={item.icon}
                        className="img-fluid round"
                        width="90"
                        height="45"
                        alt={item.title}
                      />
                    </div>
                  ) : (
                    <img
                      src={item.icon}
                      className="img-fluid round"
                      width="90"
                      height="45"
                      alt={item.title}
                    />
                  )}

                  <h6 className="pt-3 card-title">{item.title}</h6>
                </div>
              </div>
            </Link>
          ))}
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

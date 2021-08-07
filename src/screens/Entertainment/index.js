import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import { Link } from "react-router-dom";
import "./styles.css";
import PropTypes from "prop-types";

const Entertainment = (props) => {
  useEffect(() => {
    fetchEntertainmentCategory();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchEntertainmentCategory() {
    props.fetchEntertainmentCategory();
  }
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(12).then((data) => {
      setPromo(data);
    });
  }

  return (
    <div>
      <Header back title="Hiburan" />
      <Hero url={promo} alt="Qiwii" />
      {/* Start Of Menu */}
      <div className="d-flex container col-12 col-sm-12 col-md-12 col-lg-12 col-xl-12 flex-wrap justify-content-center py-5">
        {props.dataMenus.data &&
          props.dataMenus.data.map((item, index) => (
            <Link key={index} to={item.navigate.toLowerCase()}>
              <div className="card-menu p-3 p-md-4 m-2 align-self-center shadow-sm">
                <div className="justify-content-center align-items-center">
                  <img
                    src={item.icon}
                    className="img-fluid"
                    width="90"
                    height="45"
                    alt={item.title}
                  />
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

Entertainment.defaultProps = {
  fetchEntertainmentCategory: () => {},
};

Entertainment.propTypes = {
  fetchEntertainmentCategory: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataMenus: state.dataMenus,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Entertainment);

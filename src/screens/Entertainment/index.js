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
    props.getPromo(12).then(async (data) => {
      await setPromo(data);
      await props.setDataPromo(data);
    });
  }

  return (
    <div>
      <Header back title="Hiburan" />
      <Hero url={promo} alt="Qiwii" />
      {/* Start Of Menu */}
      <div className="menu">
        <div className="d-flex container-custom justify-content-center flex-wrap flex-row py-5 row">
          {props.dataMenus.data &&
            props.dataMenus.data.map((item, index) => (
              <div
                key={index}
                className="card-menu col-3 p-3 m-2 shadow-sm d-flex"
              >
                <Link to={`/${item.navigate.toLowerCase()}`}>
                  <div className="justify-content-center align-items-center">
                    {item.title.includes("Mall") ||
                    item.title.includes("Gym") ? (
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

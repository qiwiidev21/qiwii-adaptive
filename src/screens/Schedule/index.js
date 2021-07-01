import React, { useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import PropTypes from "prop-types";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import launchImage from "../../assets/images/header-qiwii-launch.png";
import { Form, Button } from "react-bootstrap";

const Schedule = (props) => {
  const { url } = useRouteMatch();

  const serviceId = typeof url == "string" ? url.substr(url.length - 3) : null;

  useEffect(() => {
    fetchDataCustomField();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataCustomField() {
    let params = {
      organization_id: 243,
      service_id: 741,
    };
    props.fetchDataCustomField(params);
  }
  return (
    <div>
      <Header back title="Pilih Jadwal" />
      <Hero url={launchImage} alt="Qiwii" customStyle="content-bg-hero" />
      <div className="container my-5">
        <Form>
          <Button variant="primary" type="submit">
            Lanjutkan
          </Button>
        </Form>
      </div>
    </div>
  );
};

Schedule.defaultProps = {
  fetchDataCustomField: () => {},
};

Schedule.propTypes = {
  dataCustomField: PropTypes.object,
  fetchDataCustomField: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataCustomField: state.dataCustomField,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

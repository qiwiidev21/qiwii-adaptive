import React, { useEffect } from "react";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import ItemService from "../../components/ItemService";
import { useRouteMatch } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import "./styles.css";

const Service = (props) => {
  const { url } = useRouteMatch();
  const serviceId = typeof url == "string" ? url.substr(url.length - 3) : null;
  const imah = "https://app.qiwii.id/files/thumb/179d7a995690b4c/720/360/fit";

  useEffect(() => {
    fetchServiceMerchant(serviceId);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchServiceMerchant(id) {
    let params = {
      show_in_mobile: 1,
      organization_show_on_mobile: 1,
    };
    props.fetchMerchantServices(id, params);
  }

  return (
    <div>
      <Header back title="Layanan" />
      <Hero url={imah} alt="Qiwii" />
      <div className="container">
        <InfiniteScroll
          dataLength={
            props.dataService.data?.length ? props.dataService.data.length : []
          }
          loader={<h4>Loading...</h4>}
        >
          {props.dataService.data &&
            props.dataService.data.map((item, index) => (
              <ItemService key={index} data={item} index={index} />
            ))}
        </InfiniteScroll>
        {props.dataService.data?.length < 1 && (
          <div className="d-flex self-center">
            <h2>Layanan sedang tidak tersedia</h2>
          </div>
        )}
      </div>
    </div>
  );
};

Service.defaultProps = {
  fetchMerchantServices: () => {},
};

Service.propTypes = {
  fetchMerchantServices: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataService: state.dataService,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);

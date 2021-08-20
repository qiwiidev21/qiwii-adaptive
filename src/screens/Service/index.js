import React, { useEffect, useState } from "react";
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
import _ from "lodash";

const Service = (props) => {
  const { url } = useRouteMatch();
  const serviceId = typeof url == "string" ? url.substr(url.length - 3) : null;
  // const [banner, setBanner] = useState(
  //   "https://dev.qiwii.id/files/thumb/179d7a995690b4c/720/360/fit"
  // );

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

  const [profile, setProfile] = useState({});

  useEffect(() => {
    if (props.dataMerchantProfile) {
      if (!_.isEmpty(props.dataMerchantProfile)) {
        setProfile(props.dataMerchantProfile.data[0]);
        // if (props.dataMerchantProfile.data[0]?.banner) {
        //   setBanner(props.dataMerchantProfile.data[0].banner);
        // }
      }
    }
  }, [props.dataMerchantProfile]);

  function renderMerchant() {
    if (props.dataMerchantProfile.data) {
      const data = props.dataMerchantProfile.data[0];
      return (
        <div className="container my-5 merchant-item p-3 shadow-sm">
          <h6 className="m-1">{data.category_name}</h6>
          <h5 className="unit-name m-1">{data.unit_name}</h5>
          <p className="address-text">{data.unit_address}</p>
        </div>
      );
    }
  }

  return (
    <div>
      <Header back title="Layanan" profile={profile} />
      <Hero url={props.dataPromo.data} alt="Qiwii" />
      <div className="container-custom menu">
        <section>{renderMerchant()}</section>
        <InfiniteScroll
          dataLength={
            props.dataService.data?.length ? props.dataService.data.length : []
          }
          loader={<h4>Loading...</h4>}
        >
          {props.dataService.data &&
            props.dataService.data.map((item, index) => (
              <ItemService
                key={index}
                data={item}
                index={index}
                onPress={(item) => props.selectedService(item)}
              />
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
  selectedService: () => {},
  dataMerchantProfile: {},
};

Service.propTypes = {
  fetchMerchantServices: PropTypes.func,
  dataMerchantProfile: PropTypes.object,
  selectedService: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataService: state.dataService,
  dataPromo: state.dataPromo,
  dataMerchantProfile: state.dataMerchantProfile,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Service);

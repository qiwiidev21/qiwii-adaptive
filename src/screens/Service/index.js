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
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Service = (props) => {
  const { url } = useRouteMatch();
  const serviceId = typeof url == "string" ? url.substr(url.length - 3) : null;
  // const [banner, setBanner] = useState(
  //   "https://dev.qiwii.id/files/thumb/179d7a995690b4c/720/360/fit"
  // );
  const { t } = useTranslation();

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
  const [serviceName, setServiceName] = useState("Merchant");

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

  useEffect(() => {
    if (!_.isEmpty(profile)) {
      setServiceName(profile.unit_name);
    }
  }, [profile]);

  function renderMerchant() {
    if (props.dataMerchantProfile.data) {
      const data = props.dataMerchantProfile.data[0];
      return (
        <div className="my-5 merchant-item p-3 shadow-sm">
          <h6 className="m-1">{data.category_name}</h6>
          <h5 className="unit-name m-1">{data.unit_name}</h5>
          <h6 className="address-text">{data.unit_address}</h6>
        </div>
      );
    }
  }

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={`Qiwii: Sistem antrian/booking online untuk berbagai layanan dari ${serviceName}`}
        />
        <title>Qiwii: {serviceName}</title>
      </Helmet>
      <Header back title={t("layanan")} profile={profile} />
      <Hero url={props.dataPromo.data} alt="Qiwii" />
      <div className="container-custom menu pl-2 px-2">
        <section className="d-flex">{renderMerchant()}</section>
        <InfiniteScroll
          dataLength={
            props.dataService.data?.length ? props.dataService.data.length : []
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataService.data &&
              props.dataService.data.map((item, index) => (
                <ItemService
                  key={index}
                  data={item}
                  index={index}
                  onPress={(item) => props.selectedService(item)}
                />
              ))}
          </div>
        </InfiniteScroll>

        {props.dataService.data?.length < 1 && (
          <div className="d-flex self-center">
            <h2>{t("serviceNotAvailable")}</h2>
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

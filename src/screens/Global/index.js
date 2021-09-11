import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ItemMerchant from "../../components/ItemMerchant";
import ItemService from "../../components/ItemService";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import "./styles.css";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import merchantNull from "../../assets/images/merchant_null.png";
import serviceNull from "../../assets/images/service_null.png";

const Salon = (props) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchGlobalMerchant(keyword);
      fetchGlobalServices(keyword);
    } else {
      const data = {
        data: [],
        page: 0,
        total: 10,
      };
      props.setDataGlobalServices(data);
      props.setDataGlobal(data);
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchGlobalMerchant(name) {
    const payload = {
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (name !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "global");
  }
  function fetchGlobalServices(name) {
    const payload = {
      pagging: 1,
      show_in_web: 1,
      organization_show_on_web: 1,
      "f-show_on_web": 1,
    };
    if (name !== "") {
      payload.name = name;
    }
    props.fetchServices(payload, "global");
  }

  function fetchMoreRetail(name) {
    const payload = {
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataGlobal.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "global");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="container">
      <Header title="" back />
      <div className="container-custom my-1 shadow-sm p-2">
        <div className="form-group mx-3 my-2">
          <input
            value={keyword}
            placeholder="Cari Nama Merchant"
            className="form-control"
            onChange={handleChange}
          />
        </div>
      </div>
      <div className="container-custom">
        <div>
          <Tabs>
            <TabList>
              <Tab className="tab-custom">Merchant</Tab>
              <Tab className="tab-custom">Layanan</Tab>
            </TabList>

            <TabPanel>
              <div className="container-custom menu pl-2 px-2">
                {props.dataGlobal?.data.length && keyword.length > 1 ? (
                  <InfiniteScroll
                    dataLength={props.dataGlobal.data.length ?? []}
                    next={fetchMoreRetail}
                    hasMore={
                      Number(props.dataGlobal.page) < props.dataGlobal.total
                        ? true
                        : false
                    }
                    loader={<h4>Loading...</h4>}
                  >
                    <div className="flatlist" style={{ flex: 1 }}>
                      {props.dataGlobal.data &&
                        props.dataGlobal.data.map((item, index) => (
                          <ItemMerchant
                            key={index}
                            data={item}
                            index={index}
                            category="retail"
                            onPress={(id) => props.fetchMerchantProfile(id)}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                ) : (
                  <img
                    src={merchantNull}
                    className="img-fluid placeholder"
                    alt="Merchant not found"
                  />
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="container-custom menu pl-2 px-2">
                {props.dataGlobal?.data.length && keyword.length > 1 ? (
                  <InfiniteScroll
                    dataLength={props.dataGlobalService.data.length ?? []}
                    next={fetchMoreRetail}
                    hasMore={
                      Number(props.dataGlobalService.page) <
                      props.dataGlobalService.total
                        ? true
                        : false
                    }
                    loader={<h4>Loading...</h4>}
                  >
                    <div className="flatlist" style={{ flex: 1 }}>
                      {props.dataGlobalService.data &&
                        props.dataGlobalService.data.map((item, index) => (
                          <ItemService
                            key={index}
                            data={item}
                            index={index}
                            category="global"
                            onPress={(item) => props.selectedService(item)}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                ) : (
                  <img
                    src={serviceNull}
                    className="img-fluid placeholder"
                    alt="Service not found"
                  />
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

Salon.defaultProps = {
  fetchOrganizations: () => {},
  fetchServices: () => {},
  selectedService: () => {},
  dataGlobal: {},
  dataGlobalService: {},
};

Salon.propTypes = {
  fetchOrganizations: PropTypes.func,
  fetchServices: PropTypes.func,
  selectedService: PropTypes.func,
  dataGlobal: PropTypes.object,
  dataGlobalService: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataGlobal: state.dataGlobal,
  dataGlobalService: state.dataGlobalService,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Salon);

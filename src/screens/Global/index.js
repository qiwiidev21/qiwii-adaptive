import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ItemMerchant from "../../components/ItemMerchant";
import Hero from "../../components/Hero";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import "./styles.css";
import PropTypes from "prop-types";
import InfiniteScroll from "react-infinite-scroll-component";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

const Salon = (props) => {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const url = "https://dev.qiwii.id/files/thumb/179d7a995690b4c/720/360/fit";

  // useEffect(() => {
  //   fetchGlobalMerchant();
  // }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchGlobalMerchant(keyword);
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchGlobalMerchant(name) {
    const payload = {
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "global");
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
    <div>
      <Header title="" back />
      <div className="container">
        <div className="my-3 shadow-sm p-2">
          <div className="form-group m-2">
            <input
              value={keyword}
              placeholder="Search"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <Tabs>
            <TabList>
              <Tab className="tab-custom">Merchant</Tab>
              <Tab className="tab-custom">Layanan</Tab>
            </TabList>

            <TabPanel>
              <div>
                {props.dataGlobal?.data && (
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
                  </InfiniteScroll>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <h2>Any content 2</h2>
            </TabPanel>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

Salon.defaultProps = {
  fetchOrganizations: () => {},
};

Salon.propTypes = {
  fetchOrganizations: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataGlobal: state.dataGlobal,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Salon);

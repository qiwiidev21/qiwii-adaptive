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

const Services = (props) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchServices();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchServices(keyword);
    } else {
      fetchServices("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchServices(name) {
    const payload = {
      "f-id_organization_category": 8,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "services");
  }

  function fetchMoreServices(name) {
    const payload = {
      "f-id_organization_category": 8,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataServices.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "services");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(8).then(async (data) => {
      await setPromo(data);
      await props.setDataPromo(data);
    });
  }
  return (
    <div>
      <Header title="Service" back />
      <Hero url={promo} alt="Qiwii" />
      <div className="container menu">
        <div className="my-3 shadow-sm p-2">
          <div className="form-group m-2">
            <input
              value={keyword}
              placeholder="Cari Nama Merchant"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={props.dataServices.data.length ?? []}
          next={fetchMoreServices}
          hasMore={
            Number(props.dataServices.page) < props.dataServices.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{flex: 1}}>
            {props.dataServices.data &&
              props.dataServices.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="services"
                  onPress={(id) => props.fetchMerchantProfile(id)}
                  />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

Services.defaultProps = {
  fetchOrganizations: () => {},
};

Services.propTypes = {
  fetchOrganizations: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataServices: state.dataServices,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Services);

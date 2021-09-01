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

const HealthCare = (props) => {
  const [keyword, setKeyword] = useState("");
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchHealthCare();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchHealthCare(keyword);
    } else {
      fetchHealthCare("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(1).then(async (data) => {
      await setPromo(data);
      await props.setDataPromo(data);
    });
  }

  function fetchHealthCare(name) {
    const payload = {
      "f-id_organization_category": 1,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "kesehatan");
  }

  function fetchMoreHealthCare(name) {
    const payload = {
      "f-id_organization_category": 1,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataHealthCare.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "kesehatan");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="container">
      <Header title="Kesehatan" back />
      <div className="container-custom my-3 shadow-sm p-2">
        <div className="form-group m-2">
          <input
            value={keyword}
            placeholder="Cari Nama Merchant"
            className="form-control"
            onChange={handleChange}
          />
        </div>
      </div>
      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu">
        <InfiniteScroll
          dataLength={props.dataHealthCare.data.length ?? []}
          next={fetchMoreHealthCare}
          hasMore={
            Number(props.dataHealthCare.page) < props.dataHealthCare.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataHealthCare.data &&
              props.dataHealthCare.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="kesehatan"
                  onPress={(id) => props.fetchMerchantProfile(id)}
                />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

HealthCare.defaultProps = {
  fetchOrganizations: () => {},
};

HealthCare.propTypes = {
  fetchOrganizations: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataHealthCare: state.dataHealthCare,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthCare);

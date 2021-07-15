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

const Salon = (props) => {
  const [keyword, setKeyword] = useState("");
  const [city, setCity] = useState("");
  const url = "https://dev.qiwii.id/files/thumb/179d7a995690b4c/720/360/fit";

  useEffect(() => {
    fetchExpedition();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchExpedition(keyword);
    } else {
      fetchExpedition("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchExpedition(name) {
    const payload = {
      "f-id_organization_type": 15,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "expedition");
  }

  function fetchMoreSalon(name) {
    const payload = {
      "f-id_organization_type": 15,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataExpedition.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "expedition");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }
  function handleChanges(event) {
    setCity(event.target.value);
  }

  return (
    <div>
      <Header title="Expedition" back />
      <Hero url={url} alt="Qiwii" />
      <div className="container">
        <div className="my-3 card-item shadow-sm p-2">
          <div className="form-group m-2">
            <input
              value={keyword}
              placeholder="Cari Nama Merchant"
              className="form-control"
              onChange={handleChange}
            />
          </div>
          <div className="form-group m-2">
            <input
              value={city}
              placeholder="Cari Lokasi"
              className="form-control"
              onChange={handleChanges}
            />
          </div>
        </div>
        <InfiniteScroll
          dataLength={props.dataExpedition.data.length ?? []}
          next={fetchMoreSalon}
          hasMore={
            Number(props.dataExpedition.page) < props.dataExpedition.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          {props.dataExpedition.data &&
            props.dataExpedition.data.map((item, index) => (
              <ItemMerchant
                key={index}
                data={item}
                index={index}
                category="expedition"
                onPress={(id) => props.fetchMerchantProfile(id)}
              />
            ))}
        </InfiniteScroll>
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
  dataExpedition: state.dataExpedition,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Salon);

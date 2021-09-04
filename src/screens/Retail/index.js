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

  useEffect(() => {
    fetchRetail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchRetail(keyword);
    } else {
      fetchRetail("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchRetail(name) {
    const payload = {
      "f-id_organization_category": 13,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "retail");
  }

  function fetchMoreRetail(name) {
    const payload = {
      "f-id_organization_category": 13,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataRetail.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "retail");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(13).then(async (data) => {
      await setPromo(data);
      await props.setDataPromo(data);
    });
  }

  return (
    <div className="container">
      <Header
        title="Retail"
        back
        search
        placeholder="Search Retail"
        onChange={handleChange}
        value={keyword}
        onSearch={() => {}}
      />
      {/*
        <div className="container-custom my-1 shadow-sm p-2">
          <div className="form-group mx-3 my-2">
            <input
              value={keyword}
              placeholder="Cari Nama Merchant"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>*/}
      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu">
        <InfiniteScroll
          dataLength={props.dataRetail.data.length ?? []}
          next={fetchMoreRetail}
          hasMore={
            Number(props.dataRetail.page) < props.dataRetail.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataRetail.data &&
              props.dataRetail.data.map((item, index) => (
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
  dataRetail: state.dataRetail,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Salon);

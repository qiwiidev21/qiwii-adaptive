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
import { Helmet } from "react-helmet";
import Undefined from "../../assets/images/layanan-undefined.jpg";

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
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Qiwii: Sistem antrian online untuk sektor kesehatan"
        />
        <title>Qiwii: Antrian sektor kesehatan</title>
      </Helmet>
      <Header
        title="Kesehatan"
        back
        search
        placeholder="Search Health Care"
        onChange={handleChange}
        value={keyword}
        onSearch={() => {}}
      />
      {/*
        <div className="container-custom my-1 shadow-sm p-3">
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
      <div className="container-custom menu pl-2 px-2">
        {props.dataHealthCare.data.length < 1 && (
          <div>
            <img
              src={Undefined}
              alt={"Data Not Found"}
              className="img-fluid img-custom"
            />
          </div>
        )}
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

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

const Government = (props) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchOrganization();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchOrganization(keyword);
    } else {
      fetchOrganization("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchOrganization(name) {
    const payload = {
      "f-id_organization_category": 5,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "pemerintahan");
  }

  function fetchMoreOrganization(name) {
    const payload = {
      "f-id_organization_category": 5,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataOrganization.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "pemerintahan");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(5).then(async (data) => {
      await setPromo(data);
      await props.setDataPromo(data);
    });
  }

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Qiwii: Sistem antrian online untuk sektor pemerintahan"
        />
        <title>Qiwii: Antrian sektor pemerintahan</title>
      </Helmet>
      <Header
        title="Pemerintahan"
        back
        search
        placeholder="Search government agencies"
        onChange={handleChange}
        value={keyword}
        onSearch={() => {}}
      />
      {/*
        <div className="container-custom my-1 shadow-sm p-2">
          <div className="form-group mx-3 my-2">
            <input
              value={keyword}
              placeholder="Cari Nama Instansi"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>*/}
      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu">
        {props.dataOrganization.data.length < 1 && (
          <div>
            <img
              src={Undefined}
              alt={"Data Not Found"}
              className="img-fluid img-custom"
            />
          </div>
        )}
        <InfiniteScroll
          dataLength={props.dataOrganization.data.length ?? []}
          next={fetchMoreOrganization}
          hasMore={
            Number(props.dataOrganization.page) < props.dataOrganization.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataOrganization.data &&
              props.dataOrganization.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="pemerintahan"
                  onPress={(id) => props.fetchMerchantProfile(id)}
                />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

Government.defaultProps = {
  fetchOrganizations: () => {},
};

Government.propTypes = {
  fetchOrganizations: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataOrganization: state.dataOrganization,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Government);

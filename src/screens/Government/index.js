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
    props.getPromo(5).then((data) => {
      setPromo(data);
    });
  }

  return (
    <div>
      <Header title="Pemerintahan" back />
      <Hero url={promo} alt="Qiwii" />
      <div className="container">
        <div className="my-3 shadow-sm p-2">
          <div className="form-group m-2">
            <input
              value={keyword}
              placeholder="Cari Nama Instansi"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
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

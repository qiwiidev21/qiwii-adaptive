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
  function handleChanges(event) {
    setCity(event.target.value);
  }

  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(13).then((data) => {
      setPromo(data);
    });
  }

  return (
    <div>
      <Header title="Retail" back />
      <Hero url={promo} alt="Qiwii" />
      <div className="container">
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
          dataLength={props.dataRetail.data.length ?? []}
          next={fetchMoreRetail}
          hasMore={
            Number(props.dataRetail.page) < props.dataRetail.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
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

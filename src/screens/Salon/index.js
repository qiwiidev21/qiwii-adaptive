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
  const url = "https://app.qiwii.id/files/thumb/179d7a995690b4c/720/360/fit";

  useEffect(() => {
    fetchSalon();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchSalon(keyword);
    } else {
      fetchSalon("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchSalon(name) {
    const payload = {
      "f-id_organization_type": 6,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "salon");
  }

  function fetchMoreSalon(name) {
    const payload = {
      "f-id_organization_type": 6,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataSalon.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "salon");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div>
      <Header title="Kecantikan" back />
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
            <select className="form-control">
              <option>Cari Lokasi</option>
            </select>
          </div>
        </div>
        <InfiniteScroll
          dataLength={props.dataSalon.data.length ?? []}
          next={fetchMoreSalon}
          hasMore={
            Number(props.dataSalon.page) < props.dataSalon.total ? true : false
          }
          loader={<h4>Loading...</h4>}
        >
          {props.dataSalon.data &&
            props.dataSalon.data.map((item, index) => (
              <ItemMerchant
                key={index}
                data={item}
                index={index}
                category="kecantikan"
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
  dataSalon: state.dataSalon,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Salon);

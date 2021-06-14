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

const PhotoStudio = (props) => {
  const [keyword, setKeyword] = useState("");
  const url = "https://app.qiwii.id/files/thumb/179d7a995690b4c/720/360/fit";

  useEffect(() => {
    fetchPhotoStudio();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchPhotoStudio(keyword);
    } else {
      fetchPhotoStudio("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchPhotoStudio(name) {
    const payload = {
      "f-id_organization_type": 7,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "photoStudio");
  }

  function fetchMorePhotoStudio(name) {
    const payload = {
      "f-id_organization_type": 7,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataPhotos.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "photoStudio");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div>
      <Header title="Keuangan" back />
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
          dataLength={props.dataPhotos.data.length ?? []}
          next={fetchMorePhotoStudio}
          hasMore={
            Number(props.dataPhotos.page) < props.dataPhotos.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          {props.dataPhotos.data &&
            props.dataPhotos.data.map((item, index) => (
              <ItemMerchant
                key={index}
                data={item}
                index={index}
                category="photoStudio"
              />
            ))}
        </InfiniteScroll>
      </div>
    </div>
  );
};

PhotoStudio.defaultProps = {
  fetchOrganizations: () => {},
};

PhotoStudio.propTypes = {
  fetchOrganizations: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataPhotos: state.dataPhotos,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(PhotoStudio);

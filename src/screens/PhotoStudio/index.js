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

const PhotoStudio = (props) => {
  const [keyword, setKeyword] = useState("");

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

  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(12).then(async (data) => {
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
          content="Qiwii: Sistem antrian online untuk sektor photo studio"
        />
        <title>Qiwii: Antrian sektor photo studio</title>
      </Helmet>
      <Header
        title="Photostudio"
        back
        search
        placeholder="Search Merchant"
        onChange={handleChange}
        value={keyword}
        onSearch={() => {}}
      />

      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu">
        {props.dataPhotos.data.length < 1 && (
          <div>
            <img
              src={Undefined}
              alt={"Data Not Found"}
              className="img-fluid img-custom"
            />
          </div>
        )}
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
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataPhotos.data &&
              props.dataPhotos.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="photoStudio"
                  onPress={(id) => props.fetchMerchantProfile(id)}
                />
              ))}
          </div>
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

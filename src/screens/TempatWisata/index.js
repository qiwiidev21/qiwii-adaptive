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
import {Helmet} from "react-helmet";

const TempatWisata = (props) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchTempatWisata();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchTempatWisata(keyword);
    } else {
      fetchTempatWisata("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchTempatWisata(name) {
    const payload = {
      "f-id_organization_category": 15,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "tempatwisata");
  }

  function fetchMoreTempatWisata(name) {
    const payload = {
      "f-id_organization_category": 15,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataTempatWisata.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "tempatwisata");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(15).then(async (data) => {
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
          content="Qiwii: Sistem antrian online untuk sektor tempat wisata"
        />
      <title>Qiwii: Antrian sektor tempat wisata</title>
      </Helmet>
      <Header
        title="Tempat Wisata"
        back
        search
        placeholder="Search Merchant"
        onChange={handleChange}
        value={keyword}
        onSearch={() => {}}
      />

      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu">
        <InfiniteScroll
          dataLength={props.dataTempatWisata.data.length ?? []}
          next={fetchMoreTempatWisata}
          hasMore={
            Number(props.dataTempatWisata.page) < props.dataTempatWisata.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataTempatWisata.data &&
              props.dataTempatWisata.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="tempatwisata"
                  onPress={(id) => props.fetchMerchantProfile(id)}
                />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

TempatWisata.defaultProps = {
  fetchOrganizations: () => {},
};

TempatWisata.propTypes = {
  fetchOrganizations: PropTypes.func,
  dataMerchantProfile: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataTempatWisata: state.dataTempatWisata,
  dataMerchantProfile: state.dataMerchantProfile,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(TempatWisata);

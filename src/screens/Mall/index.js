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

const Movies = (props) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchMovies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchMovies(keyword);
    } else {
      fetchMovies("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchMovies(name) {
    const payload = {
      "f-id_organization_type": 35,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "bioskop");
  }

  function fetchMoreMovies(name) {
    const payload = {
      "f-id_organization_type": 35,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataMovies.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "bioskop");
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
    <div>
      <Header title="Mall" back />
      <Hero url={promo} alt="Qiwii" />
      <div className="container menu">
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
          dataLength={props.dataMovies.data.length ?? []}
          next={fetchMoreMovies}
          hasMore={
            Number(props.dataMovies.page) < props.dataMovies.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{flex: 1}}>
            {props.dataMovies.data &&
              props.dataMovies.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="bioskop"
                  onPress={(id) => props.fetchMerchantProfile(id)}
                  />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

Movies.defaultProps = {
  fetchOrganizations: () => {},
};

Movies.propTypes = {
  fetchOrganizations: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataMovies: state.dataMovies,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Movies);
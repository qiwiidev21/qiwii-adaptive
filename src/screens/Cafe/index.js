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
      "f-id_organization_type": 10,
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
      "f-id_organization_type": 10,
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
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Qiwii: Sistem antrian online untuk sektor cafe"
        />
        <title>Qiwii: Antrian sektor cafe</title>
      </Helmet>
      <Header
        title="Cafe"
        back
        search
        placeholder="Search Merchant"
        onChange={handleChange}
        value={keyword}
        onSearch={() => {}}
      />

      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu">
        {props.dataMovies.data.length < 1 && (
          <div>
            <img
              src={Undefined}
              alt={"Data Not Found"}
              className="img-fluid img-custom"
            />
          </div>
        )}
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
          <div className="flatlist" style={{ flex: 1 }}>
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

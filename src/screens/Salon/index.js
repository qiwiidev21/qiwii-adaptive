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

const Salon = (props) => {
  const [keyword, setKeyword] = useState("");

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
      "f-id_organization_category": 6,
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
      "f-id_organization_category": 6,
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
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(6).then(async (data) => {
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
          content="Qiwii: Sistem antrian online untuk sektor kecantikan"
        />
        <title>Qiwii: Antrian sektor kecantikan</title>
      </Helmet>
      <Header
        title="Kecantikan"
        back
        search
        placeholder="Search Salon"
        onChange={handleChange}
        value={keyword}
        onSearch={() => {}}
      />

      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu">
        {props.dataSalon.data.length < 1 && (
          <div>
            <img
              src={Undefined}
              alt={"Data Not Found"}
              className="img-fluid img-custom"
            />
          </div>
        )}
        <InfiniteScroll
          dataLength={props.dataSalon.data.length ?? []}
          next={fetchMoreSalon}
          hasMore={
            Number(props.dataSalon.page) < props.dataSalon.total ? true : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataSalon.data &&
              props.dataSalon.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="kecantikan"
                  onPress={(id) => props.fetchMerchantProfile(id)}
                />
              ))}
          </div>
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

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
    fetchExpedition();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchExpedition(keyword);
    } else {
      fetchExpedition("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchExpedition(name) {
    const payload = {
      "f-id_organization_category": 14,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "expedition");
  }

  function fetchMoreSalon(name) {
    const payload = {
      "f-id_organization_category": 14,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataExpedition.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "expedition");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(14).then(async (data) => {
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
          content="Qiwii: Sistem antrian online untuk sektor Expedisi"
        />
        <title>Qiwii: Antrian sektor Expedisi</title>
      </Helmet>
      <Header
        title="Expedition"
        back
        search
        placeholder="Search Merchant"
        onChange={handleChange}
        value={keyword}
        onSearch={() => {}}
      />

      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu">
        {props.dataExpedition.data.length < 1 && (
          <div>
            <img
              src={Undefined}
              alt={"Data Not Found"}
              className="img-fluid img-custom"
            />
          </div>
        )}
        <InfiniteScroll
          dataLength={props.dataExpedition.data.length ?? []}
          next={fetchMoreSalon}
          hasMore={
            Number(props.dataExpedition.page) < props.dataExpedition.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataExpedition.data &&
              props.dataExpedition.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="expedition"
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
  dataExpedition: state.dataExpedition,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Salon);

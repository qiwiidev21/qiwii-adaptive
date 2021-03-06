import React, { useEffect, useState } from "react";
import Header from "../../components/Header";
import ItemMerchant from "../../components/ItemMerchant";
import Hero from "../../components/Hero";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import "./styles.css";
import PropTypes from "prop-types";
import Undefined from "../../assets/images/layanan-undefined.jpg";
import InfiniteScroll from "react-infinite-scroll-component";
import { Helmet } from "react-helmet";

const Event = (props) => {
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    fetchEvent();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchEvent(keyword);
    } else {
      fetchEvent("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchEvent(name) {
    const payload = {
      "f-id_organization_type": 13,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "events");
  }

  function fetchMoreEvent(name) {
    const payload = {
      "f-id_organization_type": 13,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataEvents.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "events");
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
          content="Qiwii: Sistem antrian online untuk sektor Event"
        />
        <title>Qiwii: Antrian sektor Event</title>
      </Helmet>
      <Header title="Events" back />
      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu">
        <div className="container-custom my-1 shadow-sm p-2">
          <div className="form-group mx-3 my-2">
            <input
              value={keyword}
              placeholder="Cari Nama Event"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
        {props.dataEvents.data.length < 1 && (
          <div>
            <img
              src={Undefined}
              alt={"Data Not Found"}
              className="img-fluid img-custom"
            />
          </div>
        )}
        <InfiniteScroll
          dataLength={props.dataEvents.data.length ?? []}
          next={fetchMoreEvent}
          hasMore={
            Number(props.dataEvents.page) < props.dataEvents.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataEvents.data &&
              props.dataEvents.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="events"
                  onPress={(id) => props.fetchMerchantProfile(id)}
                />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

Event.defaultProps = {
  fetchOrganizations: () => {},
};

Event.propTypes = {
  fetchOrganizations: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataEvents: state.dataEvents,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Event);

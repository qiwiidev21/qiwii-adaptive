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
    props.getPromo(12).then((data) => {
      setPromo(data);
    });
  }

  return (
    <div>
      <Header title="Events" back />
      <Hero url={promo} alt="Qiwii" />
      <div className="container">
        <div className="my-3 shadow-sm p-2">
          <div className="form-group m-2">
            <input
              value={keyword}
              placeholder="Cari Nama Event"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>
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

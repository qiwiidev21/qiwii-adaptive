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

const HealthCare = (props) => {
  const [keyword, setKeyword] = useState("");
  const [promo, setPromo] = useState([]);

  useEffect(() => {
    fetchHealthCare();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (keyword.length >= 3) {
      fetchHealthCare(keyword);
    } else {
      fetchHealthCare("");
    }
  }, [keyword]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    fetchDataPromo();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  function fetchDataPromo() {
    props.getPromo(16).then(async (data) => {
      if (data.length) {
        await setPromo(data);
        await props.setDataPromo(data);
      } else {
        const dummyData = [
          {
            active: "1",
            created_by: "11",
            created_on: "2020-09-30 15:18:25",
            id: "10",
            id_image: "179d7a995690b4c",
            id_organization: null,
            image_link:
              "https://cdn.eraspace.com/pub/media/wysiwyg/Produk/IMG_20210905_220127_896.jpg",
            ordering_count: "0",
            promo_always_show: "1",
            promo_end_date: null,
            promo_large_link:
              "https://cdn.eraspace.com/pub/media/wysiwyg/Produk/IMG_20210905_220127_896.jpg",
            promo_link: "https://eraspace.com/",
            promo_show_on_category: "10",
            promo_show_on_device: "mobile",
            promo_start_date: null,
            promo_text: "",
            promo_type: "image",
            unit_name: null,
            updated_by: null,
            updated_on: null,
          },
          {
            active: "1",
            created_by: "11",
            created_on: "2020-09-30 15:18:25",
            id: "10",
            id_image: "179d7a995690b4c",
            id_organization: null,
            image_link:
              "https://cdn.eraspace.com/pub/media/wysiwyg/Produk/Slider_Banner_Eraversary_1600x542px_31_Agustus_2021__3.jpg",
            ordering_count: "0",
            promo_always_show: "1",
            promo_end_date: null,
            promo_large_link:
              "https://cdn.eraspace.com/pub/media/wysiwyg/Produk/Slider_Banner_Eraversary_1600x542px_31_Agustus_2021__3.jpg",
            promo_link: "https://eraspace.com/",
            promo_show_on_category: "10",
            promo_show_on_device: "mobile",
            promo_start_date: null,
            promo_text: "",
            promo_type: "image",
            unit_name: null,
            updated_by: null,
            updated_on: null,
          },
          {
            active: "1",
            created_by: "11",
            created_on: "2020-09-30 15:18:25",
            id: "10",
            id_image: "179d7a995690b4c",
            id_organization: null,
            image_link:
              "https://cdn.eraspace.com/pub/media/wysiwyg/Produk/Slider_Banner_Apple_iPhone_x_Telkomsel_1600x542px_3_September_2021_.jpg",
            ordering_count: "0",
            promo_always_show: "1",
            promo_end_date: null,
            promo_large_link:
              "https://cdn.eraspace.com/pub/media/wysiwyg/Produk/Slider_Banner_Apple_iPhone_x_Telkomsel_1600x542px_3_September_2021_.jpg",
            promo_link: "https://eraspace.com/",
            promo_show_on_category: "10",
            promo_show_on_device: "mobile",
            promo_start_date: null,
            promo_text: "",
            promo_type: "image",
            unit_name: null,
            updated_by: null,
            updated_on: null,
          },
        ];
        await setPromo(dummyData);
        await props.setDataPromo(dummyData);
      }
    });
  }

  function fetchHealthCare(name) {
    const payload = {
      "f-id_organization_category": 16,
      "f-show_on_web": 1,
      pagging: 1,
      page: 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "erajaya");
  }

  function fetchMoreHealthCare(name) {
    const payload = {
      "f-id_organization_category": 16,
      "f-show_on_web": 1,
      pagging: 1,
      page: Number(props.dataEraJaya.page) + 1,
    };
    if (keyword !== "") {
      payload["f-name"] = name;
    }
    props.fetchOrganizations(payload, "erajaya");
  }

  function handleChange(event) {
    setKeyword(event.target.value);
  }

  return (
    <div className="container">
      <Header
        title="EraJaya"
        search
        placeholder="Search branch name"
        onChange={handleChange}
        value={keyword}
        onSearch={() => {}}
      />
      {/*
        <div className="container-custom my-1 shadow-sm p-3">
          <div className="form-group mx-3 my-2">
            <input
              value={keyword}
              placeholder="Cari Nama Merchant"
              className="form-control"
              onChange={handleChange}
            />
          </div>
        </div>*/}
      <Hero url={promo} alt="Qiwii" />
      <div className="container-custom menu pl-2 px-2">
        <InfiniteScroll
          dataLength={props.dataEraJaya.data.length ?? []}
          next={fetchMoreHealthCare}
          hasMore={
            Number(props.dataEraJaya.page) < props.dataEraJaya.total
              ? true
              : false
          }
          loader={<h4>Loading...</h4>}
        >
          <div className="flatlist" style={{ flex: 1 }}>
            {props.dataEraJaya.data &&
              props.dataEraJaya.data.map((item, index) => (
                <ItemMerchant
                  key={index}
                  data={item}
                  index={index}
                  category="kesehatan"
                  onPress={(id) => props.fetchMerchantProfile(id)}
                />
              ))}
          </div>
        </InfiniteScroll>
      </div>
    </div>
  );
};

HealthCare.defaultProps = {
  fetchOrganizations: () => {},
};

HealthCare.propTypes = {
  fetchOrganizations: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataEraJaya: state.dataEraJaya,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthCare);

/*
 * ItemService Component
 */

import React, { useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";
import moment from "moment";
import "moment/locale/id";

function ItemService({ data, index, category, onPress }) {
  const [icon, setIcon] = useState(
    data.id_icon !==
      ("https://dev.qiwii.id/system/cms/themes/ace/img/logo_alt.png" || null)
      ? Logo
      : data.id_icon
  );

  // useEffect(() => {
  //   if (data) {
  //     handleJson(data);
  //   }
  // }, [data]);

  // const handleJson = (data) => setSetting(JSON.parse(data.setting));
  let history = useHistory();
  let location = useLocation();
  return (
    <div key={index} className="flex-row mx-1 d-flex my-3 card-item shadow-sm">
      <div className="col-sm-auto card-icon bg-secondary d-flex justify-content-center align-content-center p-2">
        <img
          src={icon}
          onError={() => setIcon(Logo)}
          className="rounded-circle icon-merchant"
          alt={data.organization_name}
        />
      </div>
      <div className="btn-group-vertical p-2 card-infoQueue">
        <button
          className="btn-custom btn-primary-outline"
          onClick={() => {
            history.push(`${location.pathname}/ticket`);
            onPress(data);
          }}
        >
          <div className="unit-address">
            <h6 style={{ fontWeight: "bold" }}>
              {data.organization_name} - {data.category_name}
            </h6>
            <h6 className="unit-address">
              {moment(data.estimated_date).format("LL")}, Pukul{" "}
              {data.estimated_time}
            </h6>
            <h6 className="unit-address">
              {data.front_queue} antrian didepan Anda
            </h6>
          </div>
        </button>
      </div>
      <div className="justify-content-center align-content-center mx-2 my-4">
        <h3>{data.ticket}</h3>
      </div>
    </div>
  );
}

ItemService.propTypes = {
  data: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

ItemService.defaultProps = {
  data: {},
  category: "kesehatan",
  index: 0,
};

export default ItemService;

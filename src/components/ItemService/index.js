/*
 * ItemService Component
 */

import React, { useState, useEffect } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

function ItemService({ data, index, category }) {
  const [icon, setIcon] = useState(
    data.id_icon !==
      ("https://app.qiwii.id/system/cms/themes/ace/img/logo_alt.png" || null)
      ? Logo
      : data.id_icon
  );

  const [setting, setSetting] = useState({});

  useEffect(() => {
    if (data) {
      handleJson(data);
    }
  }, [data]);

  const handleJson = (data) => setSetting(JSON.parse(data.setting));
  let history = useHistory();
  let location = useLocation();
  return (
    <div key={index} className="flex-row mx-1 d-flex my-3 card-item shadow-sm">
      <div className="col-sm-auto card-icon bg-secondary d-flex justify-content-center align-content-center p-2">
        <img
          src={icon}
          onError={() => setIcon(Logo)}
          className="rounded-circle icon-merchant"
          alt={data.unit_name}
        />
      </div>
      <div className="btn-group-vertical p-2 card-info">
        <button
          className="btn-custom btn-primary-outline"
          onClick={() =>
            history.push(`${location.pathname}/${data.id}/schedule`)
          }
        ></button>
        <button
          className="btn-custom btn-primary-outline"
          onClick={() =>
            history.push(`${location.pathname}/${data.id}/schedule`)
          }
        >
          <h6>{data.company_name}</h6>
          <h6 className="unit-name">{data.name}</h6>
        </button>
        <button
          className="btn-custom btn-primary-outline"
          onClick={() =>
            history.push(`${location.pathname}/${data.id}/schedule`)
          }
        >
          <p className="unit-address">
            Saat ini ada{" "}
            {setting.checkin === 1
              ? data.front_queue_active.checkin
              : data.front_queue_active.new}{" "}
            orang yang mengantri
          </p>
        </button>
      </div>
    </div>
  );
}

ItemService.propTypes = {
  data: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
};

ItemService.defaultProps = {
  data: {},
  category: "kesehatan",
  index: 0,
};

export default ItemService;

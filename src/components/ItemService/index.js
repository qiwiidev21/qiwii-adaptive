/**
 * @Author: Raka Mahardika <rakamahardika>
 * @Date:   16-September-2021
 * @Last modified by:   rakamahardika
 * @Last modified time: 11-March-2022
 */

/*
 * ItemService Component
 */

import React, { useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { useHistory, useLocation } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

function ItemService({ data, index, category, onPress }) {
  const [icon, setIcon] = useState(
    `https://app.qiwii.id/files/thumb/${data.id_icon}/100/100/`
  );

  // const [setting, setSetting] = useState({});
  // useEffect(() => {
  //   if (data) {
  //     handleJson(data);
  //   }
  // }, [data]);

  // const handleJson = (data) => setSetting(JSON.parse(data.setting));
  let history = useHistory();
  let location = useLocation();
  const rata = JSON.parse(data.setting);
  return (
    <div key={index} className="card-item shadow-sm flex-row d-flex my-2">
      <div className="col-sm-auto card-icon bg-secondary d-flex justify-content-center align-content-center p-2">
        <img
          src={icon}
          onError={() => setIcon(Logo)}
          className="rounded-circle icon-merchant"
          alt={data.unit_name}
        />
      </div>
      <div className="btn-group-vertical p-2 card-info m-2 justify-content-center">
        <button
          className="btn-custom btn-primary-outline"
          onClick={() => {
            onPress(data);
            if (category === "global") {
              history.push(
                `${location.pathname}/${data.id_organization}/${data.id}`
              );
            } else {
              history.push(`${location.pathname}/${data.id}`);
            }
          }}
        >
          <h6 className="unit-name">{data.company_name}</h6>
          <h6 className="unit-name">{data.name}</h6>
          <h6 className="unit-address">
            Saat ini ada{" "}
            {rata.checkin === 1
              ? data.front_queue_active.checkin
              : data.front_queue_active.new}{" "}
            orang yang mengantri
          </h6>
        </button>
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

/**
 * @Author: Raka Mahardika <rakamahardika>
 * @Date:   16-September-2021
 * @Last modified by:   rakamahardika
 * @Last modified time: 11-March-2022
 */

/*
 * ItemMerchant Component
 */

import React, { useState, useEffect } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { useHistory, useRouteMatch } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

function ItemMerchant({ data, index, category, onPress }) {
  const [icon, setIcon] = useState();
  const { url } = useRouteMatch();

  useEffect(() => {
    if (data) {
      if (
        data.id_icon ===
          "https://app.qiwii.id/system/cms/themes/ace/img/logo_alt.png" ||
        data.id_icon ===
          "https://dev.qiwii.id/system/cms/themes/ace/img/logo_alt.png"
      ) {
        setIcon(Logo);
      } else {
        setIcon(data.id_icon);
      }
    }
  }, [data]);

  let history = useHistory();

  return (
    <div key={index} className="flex-row d-flex my-2 mx-1 card-item shadow-sm">
      <div className="col-sm-auto card-icon bg-secondary d-flex justify-content-center align-content-center p-2">
        <img
          src={icon}
          onError={() => setIcon(Logo)}
          className="rounded-circle icon-merchant"
          alt={data.unit_name}
        />
      </div>
      <div className="btn-group-vertical p-1 card-info">
        <button
          className="btn-custom btn-primary-outline"
          onClick={() => {
            onPress(data.id);
            history.push(`${url}/${data.id}`);
          }}
        >
          <h5 className="unit-name">{data.unit_name}</h5>
          <h6 className="unit-address">{data.unit_address}</h6>
        </button>
      </div>
    </div>
  );
}

ItemMerchant.propTypes = {
  data: PropTypes.object.isRequired,
  category: PropTypes.string.isRequired,
  index: PropTypes.number.isRequired,
  onPress: PropTypes.func,
};

ItemMerchant.defaultProps = {
  data: {},
  category: "kesehatan",
  index: 0,
};

export default ItemMerchant;

/*
 * ItemMerchant Component
 */

import React, { useState } from "react";
import "./styles.css";
import PropTypes from "prop-types";
import { useHistory } from "react-router-dom";
import Logo from "../../assets/images/logo.png";

function ItemMerchant({ data, index, category }) {
  const [icon, setIcon] = useState(
    data.id_icon ===
      "https://app.qiwii.id/system/cms/themes/ace/img/logo_alt.png"
      ? Logo
      : data.id_icon
  );

  let history = useHistory();

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
          onClick={() => history.push(`${category}/${data.id}`)}
        >
          <h6 className="unit-name">{data.unit_name}</h6>
        </button>
        <button
          className="btn-custom btn-primary-outline"
          onClick={() => history.push(`${category}/${data.id}`)}
        >
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
};

ItemMerchant.defaultProps = {
  data: {},
  category: "kesehatan",
  index: 0,
};

export default ItemMerchant;

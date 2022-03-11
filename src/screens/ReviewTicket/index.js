import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import PropTypes from "prop-types";
import moment from "moment";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const ReviewTicket = (props) => {
  const [profile, setProfile] = useState({});
  let history = useHistory();

  useEffect(() => {
    if (props.dataMerchantProfile) {
      if (!_.isEmpty(props.dataMerchantProfile)) {
        setProfile(props.dataMerchantProfile.data[0]);
        // if (props.dataMerchantProfile.data[0]?.banner) {
        //   setBanner(props.dataMerchantProfile.data[0].banner);
        // }
      }
    }
  }, [props.dataMerchantProfile]);

  function renderDetailAntrian() {
    if (props.dataTicket) {
      const { data } = props.dataTicket;
      return (
        <div className="container p-5">
          <h4 className="title-header">Terima kasih telah menggunakan Qiwii</h4>
          <div className="m-2">
            <h6 className="title-review">Kamu telah mengantri di</h6>
            <h6>
              {data?.layanan} - {data?.organization_name}
            </h6>
          </div>
          <div className="dropdown-divider"></div>
          <div className="mx-2">
            <h6 className="title-review">Informasi antrian telah dikirim ke</h6>
            <h6>{props.dataUserProfile.data?.email}</h6>
          </div>
          <div className="dropdown-divider"></div>
          <div className="justify-content-between row mx-1">
            <div className="mx-2">
              <h6 className="title-review">Tanggal</h6>
              <h6>{moment(data?.tanggal_daftar).format("DD MMM YYYY")}</h6>
            </div>
            <div className="mx-2">
              <h6 className="title-review">Estimasi Nomor Antrian</h6>
              <h6>{data?.antrian || data?.ticket}</h6>
            </div>
          </div>
          <div className="dropdown-divider"></div>
        </div>
      );
    }
  }

  function handleSubmit() {
    history.push(`/`);
  }

  return (
    <div className="container">
      <Header back title="Detail Ticket" profile={profile} />
      <section>{renderDetailAntrian()}</section>
      <div className="container my-5 fixed-bottom">
        <Button
          variant="primary"
          type="submit"
          className="next-button"
          onClick={handleSubmit}
        >
          Beranda
        </Button>
      </div>
    </div>
  );
};

ReviewTicket.defaultProps = {
  dataTicket: {},
  dataSelectedDate: {},
  dataSession: {},
};

ReviewTicket.propTypes = {
  dataTicket: PropTypes.object,
  dataSelectedDate: PropTypes.object,
  dataSession: PropTypes.object,
  dataCustomFieldData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataTicket: state.dataTicket,
  dataMerchantProfile: state.dataMerchantProfile,
  dataSelectedDate: state.dataSelectedDate,
  dataCustomFieldData: state.dataCustomFieldData,
  dataSlotTimes: state.dataSlotTimes,
  dataSession: state.dataSession,
  dataUserProfile: state.dataUserProfile,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewTicket);

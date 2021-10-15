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
            <p className="title-review">Kamu telah mengantri di</p>
            <p>
              {data?.layanan} - {data?.organization_name}
            </p>
          </div>
          <div className="dropdown-divider"></div>
          <div className="mx-2">
            <p className="title-review">Informasi antrian telah dikirim ke</p>
            <p>{props.dataUserProfile.data?.email}</p>
          </div>
          <div className="dropdown-divider"></div>
          <div className="justify-content-between row mx-1">
            <div className="mx-2">
              <p className="title-review">Tanggal</p>
              <p>{moment(data?.estimasi_tangal).format("DD MMM YYYY")}</p>
            </div>
            <div className="mx-2">
              <p className="title-review">Estimasi Nomor Antrian</p>
              <p>{data?.antrian || data?.ticket}</p>
            </div>
          </div>
          <div className="dropdown-divider"></div>
        </div>
      );
    }
  }

  function handleSubmit() {
    history.push(`/adaptive`);
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

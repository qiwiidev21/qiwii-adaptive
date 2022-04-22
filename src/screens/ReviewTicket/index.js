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
import axios from "axios";

const ReviewTicket = (props) => {
  const [profile, setProfile] = useState({});
  const [payment, setPayment] = useState({});
  let history = useHistory();

  useEffect(() => {
    if (props.dataPaymentService) {
      setPayment(props.dataPaymentService.data);
    }
  }, [props.dataPaymentService]);

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
          {data?.layanan && (
            <div className="m-2">
              <h6 className="title-review">Kamu telah mengantri di</h6>
              <h6>
                {data?.layanan} - {data?.organization_name}
              </h6>
            </div>
          )}
          {data?.layanan && <div className="dropdown-divider"></div>}
          <div className="mx-2">
            <h6 className="title-review">Informasi antrian telah dikirim ke</h6>
            <h6>{props.dataUserProfile.data?.email}</h6>
          </div>
          <div className="dropdown-divider"></div>
          {data?.antrian && (
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
          )}
          {data?.antrian && <div className="dropdown-divider"></div>}
          {!_.isEmpty(payment) && (
            <div>
              <div className="m-2">
                <h5
                  className="title-review"
                  style={{ marginTop: 20, marginBottom: 30 }}
                >
                  Status Pembayaran
                </h5>
                <h6>{`\n`}</h6>
              </div>
              <div className="m-2">
                <h6 className="title-review">Status Transaksi</h6>
                <h6>
                  {payment.transaction_status === "settlement"
                    ? "Pembayaran Berhasil"
                    : "Belum dibayar"}
                </h6>
              </div>
              <div className="dropdown-divider"></div>
              <div className="m-2">
                <h6 className="title-review">Tanggal Pembayaran</h6>
                <h6>{moment(payment.transaction_time).format("LLL")}</h6>
              </div>
              <div className="dropdown-divider"></div>
              <div className="m-2">
                <h6 className="title-review">Biaya Transaksi</h6>
                <h6>{payment.gross_amount}</h6>
              </div>
              <div className="dropdown-divider"></div>
            </div>
          )}
        </div>
      );
    }
  }

  function handleSubmit() {
    history.push(`/`);
  }

  async function handleCekStatus() {
    const order_id = sessionStorage.getItem("order_id");
    const windowsNew = await axios.get(
      `https://dev.qiwii.id/finance/finance/finish?order_id=${order_id}`
    );
    console.log(windowsNew.data);
    await props.setPaymentMethod(windowsNew.data);
  }

  return (
    <div className="container">
      <Header back title="Detail Ticket" profile={profile} />
      <section>{renderDetailAntrian()}</section>
      <div className="container my-5 fixed-bottom">
        {!_.isEmpty(props.dataPaymentService.data) && (
          <div className="margin-button">
            <Button
              variant="primary"
              type="submit"
              className="next-button"
              onClick={() => handleCekStatus()}
            >
              {payment.transaction_status === "settlement"
                ? "Pembayaran Berhasil"
                : "Cek Status Pembayaran"}
            </Button>
          </div>
        )}
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
  dataPaymentService: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataTicket: state.dataTicket,
  dataMerchantProfile: state.dataMerchantProfile,
  dataSelectedDate: state.dataSelectedDate,
  dataCustomFieldData: state.dataCustomFieldData,
  dataSlotTimes: state.dataSlotTimes,
  dataSession: state.dataSession,
  dataUserProfile: state.dataUserProfile,
  dataPaymentService: state.dataPaymentService,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewTicket);

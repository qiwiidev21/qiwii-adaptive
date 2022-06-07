import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import PropTypes from "prop-types";
import _ from "lodash";
import { Button } from "react-bootstrap";
import { ChevronRight } from "react-bootstrap-icons";
import { useHistory, useRouteMatch } from "react-router-dom";
import { Helmet } from "react-helmet";
import { useTranslation } from "react-i18next";

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const [data, setDataUser] = useState({});
  let history = useHistory();
  let { url } = useRouteMatch();
  const { t } = useTranslation();

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

  useEffect(() => {
    getDataUser();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getDataUser() {
    const userSession = await sessionStorage.getItem("user");
    const user = await JSON.parse(userSession);
    await props.getDataUser(user.unique_identifier, user.uuid, user.token);
  }

  useEffect(() => {
    if (!_.isEmpty(props.dataUserProfile)) {
      setDataUser(props.dataUserProfile.data);
    }
  }, [props.dataUserProfile]);

  async function handleSubmit() {
    await sessionStorage.removeItem("user");
    await sessionStorage.removeItem("token");
    await sessionStorage.removeItem("unique_identifier");
    await history.goBack();
  }

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content="Qiwii: Sistem antrian online untuk berbagai macam sektor industri dan berbagai macam skala usaha"
        />
        <title>Qiwii: Sistem antrian online</title>
      </Helmet>
      <Header back title="Profile" profile={profile} />
      <div className="container my-5">
        <div className="m-2">
          <h6 className="title-review">{t("name")}</h6>
          <h6>{data?.name}</h6>
        </div>
        <div className="dropdown-divider"></div>
        <div className="mx-2">
          <h6 className="title-review">{t("email")}</h6>
          <h6>{data?.email}</h6>
        </div>
        <div className="dropdown-divider"></div>
        <div className="mx-2">
          <h6 className="title-review">{t("phone")}</h6>
          <h6>{data?.phone}</h6>
        </div>
        <div className="dropdown-divider"></div>
      </div>
      <div className="container my-2">
        <button
          className="btn-custom-slot btn-primary-outline"
          onClick={() => history.push(`${url}/edit`)}
        >
          <div className="justify-content-between row mx-2">
            <h6 className="title-review">{t("profileSetting")}</h6>
            <ChevronRight />
          </div>
        </button>
        <div className="dropdown-divider"></div>
        {props.dataUserProfile.data &&
          props.dataUserProfile.data.verification_status === "1" && (
            <>
              <button
                className="btn-custom-slot btn-primary-outline"
                onClick={() => history.push(`${url}/otp`)}
              >
                <div className="justify-content-between row mx-2">
                  <h6 className="title-review">{t("verifyOTP")}</h6>
                  <ChevronRight />
                </div>
              </button>
              <div className="dropdown-divider"></div>
            </>
          )}
        <button
          className="btn-custom-slot btn-primary-outline"
          onClick={() => history.push(`${url}/password`)}
        >
          <div className="justify-content-between row mx-2">
            <h6 className="title-review">{t("password")}</h6>
            <ChevronRight />
          </div>
        </button>
        <div className="dropdown-divider"></div>
        <button
          className="btn-custom-slot btn-primary-outline"
          onClick={() =>
            window.open("http://qiwii.id/kebijakan-privasi/", "_blank")
          }
        >
          <div className="justify-content-between row mx-2">
            <h6 className="title-review">{t("privacyPolice")}</h6>
            <ChevronRight />
          </div>
        </button>
        <div className="dropdown-divider"></div>
        <button
          className="btn-custom-slot btn-primary-outline"
          onClick={() => window.open("http://qiwii.id/faq/", "_blank")}
        >
          <div className="justify-content-between row mx-2">
            <h6 className="title-review">FAQ</h6>
            <ChevronRight />
          </div>
        </button>
        <div className="dropdown-divider"></div>
        <button
          className="btn-custom-slot btn-primary-outline"
          onClick={() => window.open("http://bit.ly/daftarqiwii", "_blank")}
        >
          <div className="justify-content-between row mx-2">
            <h6 className="title-review">{t("iHaveBussiness")}</h6>
            <ChevronRight />
          </div>
        </button>
        <div className="dropdown-divider"></div>
      </div>
      <div className="container my-5 fixed-bottom">
        <Button
          variant="primary"
          type="submit"
          className="next-button"
          onClick={handleSubmit}
        >
          {t("logout")}
        </Button>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  dataUserProfile: {},
  dataSelectedDate: {},
  dataSession: {},
};

Profile.propTypes = {
  dataUserProfile: PropTypes.object,
  dataSelectedDate: PropTypes.object,
  dataSession: PropTypes.object,
  dataCustomFieldData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataUserProfile: state.dataUserProfile,
  dataMerchantProfile: state.dataMerchantProfile,
  dataSelectedDate: state.dataSelectedDate,
  dataCustomFieldData: state.dataCustomFieldData,
  dataSlotTimes: state.dataSlotTimes,
  dataSession: state.dataSession,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import PropTypes from "prop-types";
import _ from "lodash";
import { Button, Form } from "react-bootstrap";
// import { useHistory } from "react-router-dom";

const Profile = (props) => {
  const [profile, setProfile] = useState({});
  const [password, setPassword] = useState("");
  const [passwordBaru, setPasswordBaru] = useState("");
  // let history = useHistory();

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

  // useEffect(() => {
  //   if (!_.isEmpty(props.dataUserProfile)) {
  //   }
  // }, [props.dataUserProfile]);

  async function handleSubmit() {
    try {
      // await sessionStorage.removeItem("user");
      // await sessionStorage.removeItem("token");
      // await sessionStorage.removeItem("unique_identifier");
      // await history.goBack();
    } catch (e) {
    } finally {
    }
  }

  return (
    <div className="container">
      <Header back title="Edit Password" profile={profile} />
      <div className="container my-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Password Lama</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan password lama Anda"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Password Baru</Form.Label>
            <Form.Control
              type="password"
              placeholder="Masukkan password baru Anda"
              value={passwordBaru}
              onChange={(event) => setPasswordBaru(event.target.value)}
            />
          </Form.Group>
        </Form>
      </div>

      <div className="container my-5 fixed-bottom">
        <Button
          variant="primary"
          type="submit"
          className="next-button"
          onClick={handleSubmit}
        >
          Simpan
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

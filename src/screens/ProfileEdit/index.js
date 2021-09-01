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
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
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

  useEffect(() => {
    if (!_.isEmpty(props.dataUserProfile)) {
      setUsername(props.dataUserProfile.data.name);
      setEmail(props.dataUserProfile.data.email);
      setPhone(props.dataUserProfile.data.phone);
    }
  }, [props.dataUserProfile]);

  async function handleSubmit() {
    try {
      const userSession = await sessionStorage.getItem("user");
      const user = await JSON.parse(userSession);
      const result = await props.updateUser(
        username,
        email,
        phone,
        user.unique_identifier,
        user.uuid
      );
      console.log(result);
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
      <Header back title="Edit Profile" profile={profile} />
      <div className="container my-5">
        <Form>
          <Form.Group className="mb-3" controlId="formBasicUsername">
            <Form.Label>Username</Form.Label>
            <Form.Control
              type="text"
              placeholder="Masukkan username Anda"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              placeholder="Masukkan email Anda"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPhone">
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="number"
              placeholder="Masukkan nomor handphone Anda"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
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

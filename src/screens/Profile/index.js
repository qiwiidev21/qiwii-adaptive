import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import PropTypes, { instanceOf } from "prop-types";
import moment from "moment";
import _ from "lodash";
import { Cookies } from "react-cookie";
import { Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Profile = (props) => {
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

  function handleSubmit() {
    history.goBack();
  }

  return (
    <div>
      <Header back title="Profile" profile={profile} />
      <div className="container my-5 fixed-bottom">
        <Button
          variant="primary"
          type="submit"
          className="next-button"
          onClick={handleSubmit}
        >
          Keluar
        </Button>
      </div>
    </div>
  );
};

Profile.defaultProps = {
  dataTicket: {},
  dataSelectedDate: {},
  dataSession: {},
};

Profile.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
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
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Profile);

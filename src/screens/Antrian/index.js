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
import InfiniteScroll from "react-infinite-scroll-component";
import ItemQueue from "../../components/ItemQueue";

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

  useEffect(() => {
    getAntrian();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  async function getAntrian() {
    const userSession = await sessionStorage.getItem("user");
    const user = await JSON.parse(userSession);
    await props.getDataQueue(user.unique_identifier, user.uuid, user.token);
    await props.getDataUser(user.unique_identifier, user.uuid, user.token);
  }

  return (
    <div>
      <Header back title="Antrian" profile={profile} />
      <div className="container">
        {props.dataUserQueue.data &&
          props.dataUserQueue.data.map((item, index) => {
            return (
              <ItemQueue
                key={index}
                data={item}
                index={index}
                onPress={(item) => props.setDataTicket(item)}
              />
            );
          })}
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
  dataUserQueue: PropTypes.object,
  dataSelectedDate: PropTypes.object,
  dataSession: PropTypes.object,
  dataCustomFieldData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataUserQueue: state.dataUserQueue,
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

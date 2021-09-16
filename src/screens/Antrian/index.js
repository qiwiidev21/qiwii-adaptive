import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import PropTypes from "prop-types";
import _ from "lodash";
import ItemQueue from "../../components/ItemQueue";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";
import InfiniteScroll from "react-infinite-scroll-component";
import merchantNull from "../../assets/images/merchant_null.png";
import serviceNull from "../../assets/images/service_null.png";

const Profile = (props) => {
  const [profile, setProfile] = useState({});

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
    <div className="container">
      <Header back title="Antrian" profile={profile} />
      <div className="container-custom">
        <div>
          <Tabs>
            <TabList>
              <Tab className="tab-custom-antrian">Berlangsung</Tab>
              <Tab className="tab-custom-antrian">Reservasi</Tab>
              <Tab className="tab-custom-antrian">Selesai</Tab>
            </TabList>

            <TabPanel>
              <div className="container-custom menu pl-2 px-2">
                {props.dataUserQueue.data?.length && (
                  <InfiniteScroll
                    dataLength={props.dataUserQueue.data?.length ?? []}
                    hasMore={
                      Number(props.dataUserQueue.page) <
                      props.dataUserQueue.total
                        ? true
                        : false
                    }
                    loader={<h4>Loading...</h4>}
                  >
                    <div style={{ flex: 1 }}>
                      {props.dataUserQueue.data &&
                        props.dataUserQueue.data.map((item, index) => (
                          <ItemQueue
                            key={index}
                            data={item}
                            index={index}
                            onPress={(item) => props.setDataTicket(item)}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="container-custom menu pl-2 px-2">
                {props.dataUserQueueReservasi.data?.length && (
                  <InfiniteScroll
                    dataLength={props.dataUserQueueReservasi.data?.length ?? []}
                    hasMore={
                      Number(props.dataUserQueueReservasi.page) <
                      props.dataUserQueueReservasi.total
                        ? true
                        : false
                    }
                    loader={<h4>Loading...</h4>}
                  >
                    <div style={{ flex: 1 }}>
                      {props.dataUserQueueReservasi.data &&
                        props.dataUserQueueReservasi.data.map((item, index) => (
                          <ItemQueue
                            key={index}
                            data={item}
                            index={index}
                            onPress={(item) => props.setDataTicket(item)}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                )}
              </div>
            </TabPanel>
            <TabPanel>
              <div className="container-custom menu pl-2 px-2">
                {props.dataUserQueueFinish.data?.length && (
                  <InfiniteScroll
                    dataLength={props.dataUserQueueFinish.data?.length ?? []}
                    hasMore={
                      Number(props.dataUserQueueFinish.page) <
                      props.dataUserQueueFinish.total
                        ? true
                        : false
                    }
                    loader={<h4>Loading...</h4>}
                  >
                    <div style={{ flex: 1 }}>
                      {props.dataUserQueueFinish.data &&
                        props.dataUserQueueFinish.data.map((item, index) => (
                          <ItemQueue
                            key={index}
                            data={item}
                            index={index}
                            onPress={(item) => props.setDataTicket(item)}
                          />
                        ))}
                    </div>
                  </InfiniteScroll>
                )}
              </div>
            </TabPanel>
          </Tabs>
        </div>
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
  dataUserQueueFinish: PropTypes.object,
  dataUserQueueReservasi: PropTypes.object,
  dataSelectedDate: PropTypes.object,
  dataSession: PropTypes.object,
  dataCustomFieldData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataUserQueue: state.dataUserQueue,
  dataUserQueueReservasi: state.dataUserQueueReservasi,
  dataUserQueueFinish: state.dataUserQueueFinish,
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

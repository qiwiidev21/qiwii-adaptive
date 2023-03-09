import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import PropTypes from "prop-types";
import moment from "moment";
import { Button, Container, Form, Modal } from "react-bootstrap";
import _ from "lodash";
import { useHistory, useLocation } from "react-router-dom";
import OtpInput from "react-otp-input";
import ReactMidtrans from "../../components/Midtrans";
import { useTranslation } from "react-i18next";

const ReviewQueue = (props) => {
  let history = useHistory();
  let location = useLocation();
  const { t } = useTranslation();

  const [user, setUser] = useState({});
  const [dataTicket, setDataTicket] = useState(false);
  const [showModalSuccess, setShowModalSuccess] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [titleReport, setTitleReport] = useState("");
  const [messageReport, setMessageReport] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [modalOTP, showModalOTP] = useState(false);
  const [otp, setOTP] = useState("");
  const [payment, setPayment] = useState({});
  const [profile, setProfile] = useState({});

  useEffect(() => {
    window.addEventListener("focus", () => {
      getPayment();
    });

    return () => {
      window.removeEventListener("focus", () => {});
    };
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  // useEffect(() => {
  //   if (payment) {
  //     await setDataTicket(response.data);
  //     await props.setDataTicket(response.data);
  //     await history.push(`${location.pathname}/ticket`);
  //   }
  // }, [payment]);

  async function getPayment() {
    const payment = await sessionStorage.getItem("payment");
    if (!_.isEmpty(JSON.parse(payment))) {
      await setPayment(JSON.parse(payment));
      await setDataTicket(JSON.parse(payment));
      await props.setDataTicket(JSON.parse(payment));
      await props.setPaymentMethod(JSON.parse(payment));
      await history.push(`${location.pathname}/ticket`);
      // handleSubmitPayment(JSON.parse(payment));
    }
  }

  useEffect(() => {
    if (props.dataMerchantProfile) {
      if (!_.isEmpty(props.dataMerchantProfile)) {
        setProfile(props.dataMerchantProfile.data[0]);
        // if (props.dataMerchantProfile.data[0]?.banner) {
        //   setBanner(props.dataMerchantProfile.data[0].banner);
        // }
      }
    }
  }, [props.dataMerchantProfile]); // eslint-disable-line react-hooks/exhaustive-deps

  const [token, setToken] = useState("");

  useEffect(() => {
    if (props.dataServiceSelected?.data?.price_active === "1") {
      getToken(props.dataServiceSelected?.data?.id);
    }
  }, [props.dataServiceSelected]); // eslint-disable-line react-hooks/exhaustive-deps

  async function getToken(id) {
    try {
      let userSession = sessionStorage.getItem("user");
      let user = JSON.parse(userSession);
      if (
        _.isEmpty(user) ||
        props.dataServiceDetail.data.access_type !== "opened"
      ) {
        setShowModal(true);
      } else {
        const token = _.isEmpty(props.dataSession)
          ? user.token
          : props.dataSession.data.token;
        const uuid = _.isEmpty(props.dataSession)
          ? user.uuid
          : props.dataSession.data.uuid;
        const unique_identifier = _.isEmpty(props.dataSession)
          ? user.unique_identifier
          : props.dataSession.data.unique_identifier;
        const slot_date = props.dataSelectedDate?.data;
        const layanan_id = props.dataServiceDetail?.data?.id;
        const service_id = props.dataServiceDetail?.data?.id;
        const organization_id = props.dataServiceDetail?.data?.id_organization;
        const code = props.dataServiceDetail?.data?.code;
        const slot_time = !_.isEmpty(props.dataSlotTimes)
          ? props.dataSlotTimes?.data
          : "null";
        let formBody = [];
        formBody = formBody.join("&");
        if (props.dataCustomFieldData.data !== undefined) {
          props.dataCustomFieldData.data.forEach((item, index) => {
            formBody = formBody + `&custom_field[${index + 1}]=` + item;
          });
        }
        const payload = {
          // api_user: "root",
          // api_key: "1494ba401c74a879a386b5057d2e9a4f",
          channel: "mobile",
          id_organization: organization_id,
          id_service: service_id,
          layanan: layanan_id,
          kode: code,
          slot_date: slot_date,
        };
        payload.slot_time = slot_time;
        if (props.dataServiceDetail.data.access_type === "opened") {
          payload.email = props.dataFieldData?.data?.email;
          payload.noponsel = props.dataFieldData?.data?.phone;
        }
        if (
          !_.isEmpty(props.dataSession) &&
          props.dataServiceDetail.data.access_type !== "opened"
        ) {
          payload.token = token ?? props.dataSession.data.token;
          payload.uuid = uuid ?? props.dataSession.data.uuid;
          payload.unique_identifier =
            unique_identifier ?? props.dataSession.data.unique_identifier;
        }
        const windowsNew = await props.getTicketPayment(
          props.dataServiceDetail?.data?.id_organization,
          payload,
          props.dataCustomFieldData.data
        );
        console.log(payload);
        console.log(windowsNew);
        if (windowsNew?.data.status === "error") {
          alert(windowsNew?.data.error);
        } else {
          setToken(windowsNew.data.token);
        }
      }
      // const windowsNew = await axios.get(
      //   `https://dev.qiwii.id/finance/finance/get_token?id_service=${id}&display=1`
      // );
    } catch (e) {
      console.log(e);
      throw new Error(e);
    }
  }

  useEffect(() => {
    getCookies();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const getCookies = async () => {
    const userSession = await sessionStorage.getItem("user");
    const user = await JSON.parse(userSession);
    if (user) {
      return props.getDataUser(user.unique_identifier, user.uuid, user.token);
    } else {
      return null;
    }
  };

  function renderDetailAntrian() {
    if (props.dataServiceDetail) {
      const { data } = props.dataServiceDetail;
      // const dataPayment = props.dataPaymentService?.data;
      return (
        <div className="container p-5">
          <h4 className="title-header">{t("reviewYourQueue")}</h4>
          <div className="m-2">
            <h6 className="title-review">{t("serviceName")}</h6>
            <h6>{data?.name}</h6>
          </div>
          <div className="dropdown-divider"></div>
          <div className="mx-2">
            <h6 className="title-review">{t("merchantName")}</h6>
            <h6>{data?.company_name}</h6>
          </div>

          <div className="dropdown-divider"></div>
          <div className="justify-content-between row mx-1">
            <div className="mx-2">
              <h6 className="title-review">{t("date")}</h6>
              <h6>
                {moment(props.dataSelectedDate?.data).format("DD MMM YYYY")}
              </h6>
            </div>
            {/*
              <div className="mx-2">
                <h6 className="title-review">{t("estimateNumberQueue")}</h6>
                <h6>{data?.next_ticket}</h6>
              </div>
              */}
          </div>
          <div className="dropdown-divider"></div>
        </div>
      );
    }
  }

  async function handleSubmit() {
    const userSession = sessionStorage.getItem("user");
    // const dataServiceDetails = sessionStorage.getItem("dataServiceDetail");
    // const dataServiceDetail = JSON.parse(dataServiceDetails);
    const user = JSON.parse(userSession);
    if (
      _.isEmpty(user) &&
      props.dataServiceDetail.data.access_type !== "opened"
    ) {
      setShowModal(true);
    } else {
      const params = {
        api_user: "root",
        api_key: "1494ba401c74a879a386b5057d2e9a4f",
        channel: "mobile",
        id_organization: props.dataServiceDetail?.data?.id_organization,
        id_service: props.dataServiceDetail?.data?.id,
        layanan: props.dataServiceDetail?.data?.id,
        kode: props.dataServiceDetail?.data?.code,
        slot_date: props.dataSelectedDate?.data,
      };

      if (props.dataServiceDetail.data.access_type === "opened") {
        params.email = props.dataFieldData?.data?.email;
        params.noponsel = props.dataFieldData?.data?.phone;
      }

      if (!_.isEmpty(props.dataSlotTimes)) {
        params.slot_time = props.dataSlotTimes?.data;
      }
      if (
        !_.isEmpty(props.dataSession) &&
        props.dataServiceDetail.data.access_type !== "opened"
      ) {
        params.token = user.token ?? props.dataSession.data.token;
        params.uuid = user.uuid ?? props.dataSession.data.uuid;
        params.unique_identifier =
          user.unique_identifier ?? props.dataSession.data.unique_identifier;
      }

      await props
        .getTicket(
          props.dataServiceDetail?.data?.id_organization,
          params,
          props.dataCustomFieldData.data
        )
        .then(async (response) => {
          if (response.status === 200) {
            setShowModalSuccess(true);
            setDataTicket(response.data);
            await props.setDataTicket(response.data);
          }
        })
        .catch((err) => {
          throw new Error(err);
        });
    }
  }
  // async function handleSubmitPayment(data) {
  //   const userSession = sessionStorage.getItem("user");
  //   // const dataServiceDetails = sessionStorage.getItem("dataServiceDetail");
  //   // const dataServiceDetail = JSON.parse(dataServiceDetails);
  //   const user = JSON.parse(userSession);
  //   if (_.isEmpty(user)) {
  //     setShowModal(true);
  //   } else {
  //     const params = {
  //       api_user: "root",
  //       api_key: "1494ba401c74a879a386b5057d2e9a4f",
  //       channel: "mobile",
  //       id_organization: props.dataServiceDetail?.data?.id_organization,
  //       id_service: props.dataServiceDetail?.data?.id,
  //       layanan: props.dataServiceDetail?.data?.id,
  //       kode: props.dataServiceDetail?.data?.code,
  //       token: _.isEmpty(props.dataSession)
  //         ? user.token
  //         : props.dataSession.data.token,
  //       uuid: _.isEmpty(props.dataSession)
  //         ? user.uuid
  //         : props.dataSession.data.uuid,
  //       slot_date: props.dataSelectedDate?.data,
  //       unique_identifier: _.isEmpty(props.dataSession)
  //         ? user.unique_identifier
  //         : props.dataSession.data.unique_identifier,
  //     };
  //     if (!_.isEmpty(props.dataSlotTimes)) {
  //       params.slot_time = props.dataSlotTimes?.data;
  //     }
  //     await props
  //       .getTicket(
  //         props.dataServiceDetail?.data?.id_organization,
  //         params,
  //         props.dataCustomFieldData.data
  //       )
  //       .then(async (response) => {
  //         if (response.status === 200) {
  //           await setDataTicket(response.data);
  //           await props.setDataTicket(response.data);
  //           await history.push(`${location.pathname}/ticket`);
  //         }
  //       })
  //       .catch((err) => {
  //       });
  //     await props.setPaymentMethod(data);
  //   }
  // }

  function renderModalSuccess() {
    return (
      <Modal
        show={showModalSuccess}
        onHide={() => setShowModalSuccess(!showModalSuccess)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{t("thanksUsingQiwii")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="m-2">
              <h6 className="title-review">{t("youAreAlreadyIn")}</h6>
              <h6>
                {dataTicket?.layanan} - {dataTicket?.organization_name}
              </h6>
            </div>
            <div className="dropdown-divider"></div>
            <div className="mx-2">
              <h6 className="title-review">{t("queueInformationHasBeen")}</h6>
              <h6>
                {props.dataUserProfile.data?.email ||
                  props.dataFieldData?.data?.email ||
                  props.dataFieldData?.data?.phone}
              </h6>
            </div>
            <div className="dropdown-divider"></div>
            <div className="justify-content-between row mx-1">
              <div className="mx-2">
                <h6 className="title-review">{t("date")}</h6>
                <h6>
                  {/*moment(dataTicket?.estimasi_tangal).format("DD MMM YYYY")*/}
                  {moment(props.dataSelectedDate?.data).format("DD MMM YYYY")}
                </h6>
              </div>
              {/*
                <div className="mx-2">
                  <h6 className="title-review">{t("estimateNumberQueue")}</h6>
                  <h6>{dataTicket?.antrian}</h6>
                </div>
                */}
            </div>
            <div className="dropdown-divider"></div>
            {!_.isEmpty(payment) && (
              <div>
                <div className="m-2">
                  <h5
                    className="title-review"
                    style={{ marginTop: 20, marginBottom: 30 }}
                  >
                    {t("paymentStatus")}
                  </h5>
                  <h6>{`\n`}</h6>
                </div>
                <div className="m-2">
                  <h6 className="title-review">{t("paymentStatus")}</h6>
                  <h6>{payment.transaction_status}</h6>
                </div>
                <div className="dropdown-divider"></div>
                <div className="m-2">
                  <h6 className="title-review">{t("paymentDate")}</h6>
                  <h6>{payment.settlement_time}</h6>
                </div>
                <div className="dropdown-divider"></div>
                <div className="m-2">
                  <h6 className="title-review">{t("transactionFee")}</h6>
                  <h6>{payment.gross_amount}</h6>
                </div>
                <div className="dropdown-divider"></div>
              </div>
            )}
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={async () => {
              await setShowModalSuccess(!showModalSuccess);
              await history.push(`${location.pathname}/ticket`);
            }}
          >
            {t("detail")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function renderModal() {
    return (
      <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
        <Modal.Header closeButton>
          <Modal.Title>{t("youAreNotLoggin")}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{t("sessionEmpty")}</Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => setShowModal(!showModal)}>
            Cancel
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await setShowModal(!showModal);
              await setShowModalLogin(true);
            }}
          >
            {t("login")}
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function renderModalReport() {
    return (
      <Modal
        show={showModalReport}
        onHide={() => setShowModalReport(!showModalReport)}
      >
        <Modal.Header closeButton>
          <Modal.Title>{titleReport}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{messageReport}</Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            onClick={async () => {
              if (!_.isEmpty(user)) {
                await setShowModalReport(false);
                await sessionStorage.setItem("token", user.token);
                await sessionStorage.setItem(
                  "unique_identifier",
                  user.unique_identifier
                );
                await sessionStorage.setItem("user", JSON.stringify(user));
                await props.getDataUser(
                  user.unique_identifier,
                  user.uuid,
                  user.token
                );
              } else {
                await setShowModalReport(!showModalReport);
              }
            }}
          >
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
  function validateEmail(email) {
    let re =
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
    return re.test(email);
  }

  function setPhoneOrMail(value) {
    let email = validateEmail(value) ? value : "";
    let phone = !validateEmail(value) ? value : "";
    setUsername(email);
    setPhone(phone);
  }
  function renderModalLogin() {
    return (
      <Modal
        size="md"
        aria-labelledby="example-modal-sizes-title-lg"
        show={showModalLogin}
        onHide={() => setShowModalLogin(!showModalLogin)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">
            {registerForm ? "Register" : "Login"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {registerForm ? (
            <Form>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Email"
                  onChange={(event) => setEmail(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>Nomor Telepon</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nomor Telepon"
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
            </Form>
          ) : (
            <Form>
              <Form.Group controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  onChange={(event) => setPhoneOrMail(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  onChange={(event) => setPassword(event.target.value)}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <div className="container my-5">
            <Button
              variant="primary"
              type="submit"
              className="next-button"
              onClick={() => {
                if (registerForm) {
                  handleRegister();
                } else {
                  handleLogin();
                }
              }}
            >
              Submit
            </Button>
            <div>
              <h6 className="register-text">
                {registerForm ? "Sudah" : "Belum"} punya akun?
                <button
                  className="btn-custom btn-primary-outline"
                  onClick={() => setRegisterForm(!registerForm)}
                >
                  <h6 className="register-text-button">
                    {registerForm ? "Masuk" : "Daftar"}
                  </h6>
                </button>
              </h6>
            </div>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }

  function handleLogin() {
    props
      .loginQiwii(username, phone, password)
      .then(async (user) => {
        if (user.status === "Success") {
          await setShowModalLogin(!showModalLogin);
          await setShowModalReport(true);
          await setTitleReport(user.status);
          await setMessageReport(user.message);
          await notificationRequest();
          await setUser(user);
        } else {
          await setShowModalReport(true);
          await setTitleReport(user.status);
          await setMessageReport(user.message);
          await setShowModalLogin(!showModalLogin);
          await setUser({});
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          setShowModalReport(true);
          setTitleReport("Error");
          setMessageReport(error.message);
        }
      });
  }

  async function notificationRequest() {
    try {
      let permission = await Notification.requestPermission();
      if (permission === "granted") {
        sessionStorage.setItem("permission", permission);
      } else if (permission === "denied") {
        sessionStorage.setItem("permission", permission);
      }
    } catch (e) {
      throw new Error(e);
    }
  }

  function handleRegister() {
    props
      .registerQiwii(username, email, phone, password)
      .then(async (user) => {
        if (user.status === "Success") {
          await setShowModalLogin(!showModalLogin);
          // await setRegisterForm(!registerForm);
          // setShowModalReport(true);
          await showModalOTP(!modalOTP);
          await setUniqueIdentifier(user.unique_identifier);
          await sessionStorage.setItem(
            "unique_identifier",
            user.unique_identifier
          );
          // setTitleReport(user.status);
          // setMessageReport(user.message);
        } else {
          setShowModalReport(true);
          setTitleReport("Error");
          setMessageReport(user.message);
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          setShowModalReport(true);
          setTitleReport("Error");
          setMessageReport(error.message);
        }
      });
  }

  const handleSubmitOTP = async () => {
    await props
      .verifyCode(otp, uniqueIdentifier)
      .then(async (user) => {
        if (user.status === "Success") {
          const sessionUser = {
            message: "Selamat anda berhasil login.",
            status: "Success",
            token: user.token,
            unique_identifier: uniqueIdentifier,
            uuid: "ABCD1234",
          };
          await showModalOTP(false);
          await setOTP("");
          await sessionStorage.setItem("token", user.token);
          await sessionStorage.setItem("user", JSON.stringify(sessionUser));
          await props
            .getDataUser(uniqueIdentifier, "ABCD1234", user.token)
            .then(async (response) => {
              if (response.status === "Success") {
                await setShowModalLogin(false);
                await setShowModalReport(false);
              }
            });
        }
      })
      .catch((error) => {
        if (error.status === 401) {
          alert(error.data.message);
        }
      });
  };

  function renderModalOTP() {
    return (
      <Modal show={modalOTP} onHide={() => {}}>
        <Modal.Header closeButton>
          <Modal.Title>
            Masukkan kode verifikasi yang telah dikirim via Email Anda.
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <OtpInput
              containerStyle={{
                alignItems: "center",
                justifyContent: "center",
              }}
              inputStyle={{ margin: 10, width: 50, height: 80, fontSize: 20 }}
              placeholder={"0"}
              value={otp}
              hasErrored
              onChange={(otp) => setOTP(otp)}
              numInputs={4}
              separator={<h6>-</h6>}
            />
          </Container>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="primary"
            className="next-button"
            onClick={async () => {
              await handleSubmitOTP();
            }}
          >
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className="container">
      <Header back={false} title="Review Antrian" profile={profile} />
      <section>{renderDetailAntrian()}</section>
      <div className="container  my-5 fixed-bottom">
        {props.dataServiceDetail.data?.price_active === "1" ? (
          <div>
            <Button
              variant="primary"
              type="submit"
              className="next-button"
              style={{ marginBottom: 20 }}
              onClick={() => getToken(props.dataServiceSelected?.data?.id)}
            >
              Refresh Token
            </Button>
            <ReactMidtrans
              clientKey={"Mid-client-7nI9_hHTqtz0PAbj"}
              token={token}
            >
              <Button variant="primary" type="submit" className="next-button">
                Lanjutkan Pembayaran
              </Button>
            </ReactMidtrans>
          </div>
        ) : (
          <Button
            variant="primary"
            type="submit"
            className="next-button"
            onClick={handleSubmit}
          >
            Ambil Tiket
          </Button>
        )}
      </div>
      {renderModal()}
      {renderModalReport()}
      {renderModalLogin()}
      {renderModalOTP()}
      {renderModalSuccess()}
    </div>
  );
};

ReviewQueue.defaultProps = {
  dataServiceDetail: {},
  dataSelectedDate: {},
  dataSession: {},
};

ReviewQueue.propTypes = {
  dataServiceDetail: PropTypes.object,
  dataSelectedDate: PropTypes.object,
  dataSession: PropTypes.object,
  dataCustomFieldData: PropTypes.object,
  dataFieldData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataServiceDetail: state.dataServiceDetail,
  dataMerchantProfile: state.dataMerchantProfile,
  dataSelectedDate: state.dataSelectedDate,
  dataCustomFieldData: state.dataCustomFieldData,
  dataFieldData: state.dataFieldData,
  dataSlotTimes: state.dataSlotTimes,
  dataSession: state.dataSession,
  dataUserProfile: state.dataUserProfile,
  dataPaymentService: state.dataPaymentService,
  dataServiceSelected: state.dataServiceSelected,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewQueue);

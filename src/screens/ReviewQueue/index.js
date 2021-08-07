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

const ReviewQueue = (props) => {
  let history = useHistory();
  let location = useLocation();

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
      return (
        <div className="container">
          <h4 className="title-header">Review antrian Anda</h4>
          <div className="m-2">
            <p className="title-review">Nama Layanan</p>
            <p>{data?.name}</p>
          </div>
          <div className="dropdown-divider"></div>
          <div className="mx-2">
            <p className="title-review">Nama Merchant</p>
            <p>{data?.company_name}</p>
          </div>
          <div className="dropdown-divider"></div>
          <div className="justify-content-between row mx-1">
            <div className="mx-2">
              <p className="title-review">Tanggal</p>
              <p>
                {moment(props.dataSelectedDate?.data).format("DD MMM YYYY")}
              </p>
            </div>
            <div className="mx-2">
              <p className="title-review">Estimasi Nomor Antrian</p>
              <p>{data?.next_ticket}</p>
            </div>
          </div>
          <div className="dropdown-divider"></div>
        </div>
      );
    }
  }

  async function handleSubmit() {
    const userSession = sessionStorage.getItem("user");
    const user = JSON.parse(userSession);
    if (_.isEmpty(user)) {
      setShowModal(true);
    } else {
      const params = {
        api_user: "root",
        api_key: "1494ba401c74a879a386b5057d2e9a4f",
        channel: "mobile",
        id_organization: props.dataServiceDetail.data.id_organization,
        id_service: props.dataServiceDetail.data.id,
        layanan: props.dataServiceDetail.data.id,
        kode: props.dataServiceDetail.data.code,
        token: _.isEmpty(props.dataSession)
          ? user.token
          : props.dataSession.data.token,
        uuid: _.isEmpty(props.dataSession)
          ? user.uuid
          : props.dataSession.data.uuid,
        slot_date: props.dataSelectedDate.data,
        unique_identifier: _.isEmpty(props.dataSession)
          ? user.unique_identifier
          : props.dataSession.data.unique_identifier,
      };
      if (!_.isEmpty(props.dataSlotTimes)) {
        params.slot_time = props.dataSlotTimes?.data;
      }
      await props
        .getTicket(
          props.dataServiceDetail.data.id_organization,
          params,
          props.dataCustomFieldData.data
        )
        .then(async (response) => {
          if (response.status === 200) {
            await setShowModalSuccess(true);
            await setDataTicket(response.data);
            await props.setDataTicket(response.data);
          }
        });
    }
  }

  function renderModalSuccess() {
    return (
      <Modal
        show={showModalSuccess}
        onHide={() => setShowModalSuccess(!showModalSuccess)}
      >
        <Modal.Header closeButton>
          <Modal.Title>Terima kasih telah menggunakan Qiwii</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Container>
            <div className="m-2">
              <p className="title-review">Kamu telah mengantri di</p>
              <p>
                {dataTicket?.layanan} - {dataTicket?.organization_name}
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
                <p>
                  {moment(dataTicket?.estimasi_tangal).format("DD MMM YYYY")}
                </p>
              </div>
              <div className="mx-2">
                <p className="title-review">Estimasi Nomor Antrian</p>
                <p>{dataTicket?.antrian}</p>
              </div>
            </div>
            <div className="dropdown-divider"></div>
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
            Detail
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function renderModal() {
    return (
      <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
        <Modal.Header closeButton>
          <Modal.Title>Anda belum login.</Modal.Title>
        </Modal.Header>
        <Modal.Body>Silahkan login untuk melanjutkan!</Modal.Body>
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
            Login
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
    let re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; // eslint-disable-line no-useless-escape
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

  function handleRegister() {
    props
      .registerQiwii(username, email, phone, password)
      .then((user) => {
        if (user.status === "Success") {
          // setShowModalLogin(!showModalLogin);
          setRegisterForm(!registerForm);
          setShowModalReport(true);
          setTitleReport(user.status);
          setMessageReport(user.message);
        } else {
          setShowModalReport(true);
          setTitleReport(user.status);
          setMessageReport(user.message);
          setShowModalLogin(!showModalLogin);
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
  return (
    <div>
      <Header back title="Review Antrian" profile={profile} />
      <section>{renderDetailAntrian()}</section>
      <div className="container my-5 fixed-bottom">
        <Button
          variant="primary"
          type="submit"
          className="next-button"
          onClick={handleSubmit}
        >
          Ambil Tiket
        </Button>
      </div>
      {renderModal()}
      {renderModalReport()}
      {renderModalLogin()}
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
};

const mapStateToProps = (state) => ({
  dataServiceDetail: state.dataServiceDetail,
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

export default connect(mapStateToProps, mapDispatchToProps)(ReviewQueue);

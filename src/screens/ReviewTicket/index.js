import React, { useState, useEffect } from "react";
import "./styles.css";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import PropTypes, { instanceOf } from "prop-types";
import moment from "moment";
import { Button, Form, Modal } from "react-bootstrap";
import _ from "lodash";
import { useCookies, Cookies } from "react-cookie";
import { useHistory, useLocation } from "react-router-dom";

const ReviewQueue = (props) => {
  let history = useHistory();
  let location = useLocation();

  const [showModal, setShowModal] = useState(false);
  const [registerForm, setRegisterForm] = useState(false);
  const [showModalReport, setShowModalReport] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [titleReport, setTitleReport] = useState("");
  const [messageReport, setMessageReport] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [setUserSession] = useCookies(["user"]);

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
  }, []);

  const getCookies = async () => {
    // const dataUser = await props.cookies.get("user")
    // console.log(dataUser);
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
    if (_.isEmpty(props.dataSession)) {
      setShowModal(true);
    } else {
      const params = {
        api_user: "root",
        // api_key: "1494ba401c74a879a386b5057d2e9a4f",
        channel: "mobile",
        id_organization: props.dataServiceDetail.data.id_organization,
        id_service: props.dataServiceDetail.data.id,
        layanan: props.dataServiceDetail.data.id,
        kode: props.dataServiceDetail.data.code,
        token: props.dataSession.data.token,
        uuid: props.dataSession.data.uuid,
        slot_date: props.dataSelectedDate.data,
        unique_identifier: props.dataSession.data.unique_identifier,
      };
      if (!_.isEmpty(props.dataSlotTimes)) {
        params.slot_time = props.dataSlotTimes?.data.label.substr(0, 5);
      }
      await props
        .getTicket(
          props.dataServiceDetail.data.id_organization,
          params,
          props.dataCustomFieldData.data
        )
        .then((response) => {
          if (response.status === 200) {
            props.setDataTicket(response.data);
            history.push(`${location.pathname}/ticket`);
          }
        });
    }
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
              await setShowModalReport(!showModalReport);
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
                <Form.Label>Nomor Telepone</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Nomor Telepone"
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
              <Form.Group controlId="rePassword">
                <Form.Label>Ulangi Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Ulangi Password"
                  onChange={(event) => setRePassword(event.target.value)}
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
              onClick={() => handleLogin()}
            >
              Submit
            </Button>
            <h6 className="register-text">Belum punya akun? Daftar</h6>
          </div>
        </Modal.Footer>
      </Modal>
    );
  }

  function handleLogin() {
    const date = new Date();
    const tomorrow = new Date(date.setDate(date.getDate() + 1));
    props
      .loginQiwii(username, phone, password)
      .then((user) => {
        if (user.status === "Success") {
          setShowModalLogin(!showModalLogin);
          setShowModalReport(true);
          setTitleReport(user.status);
          setMessageReport(user.message);
          setUserSession("user", user, { expires: tomorrow });
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
    </div>
  );
};

ReviewQueue.defaultProps = {
  dataServiceDetail: {},
  dataSelectedDate: {},
  dataSession: {},
};

ReviewQueue.propTypes = {
  cookies: instanceOf(Cookies).isRequired,
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
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewQueue);

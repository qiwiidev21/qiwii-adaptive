import React, { useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import PropTypes from "prop-types";
import moment from "moment";
import { Button, Form, Modal } from "react-bootstrap";
import _ from "lodash";
import { useCookies } from "react-cookie";

const ReviewQueue = (props) => {
  const [showModal, setShowModal] = useState(false);
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showModalLogin, setShowModalLogin] = useState(false);
  const [setUserSession] = useCookies(["user"]);

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

  function handleSubmit() {
    if (_.isEmpty(props.dataSession)) {
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
        unique_identifier: props.dataSession.data.unique_identifier,
      };
      props.getTicket(
        props.dataServiceDetail.data.id_organization,
        params,
        props.dataCustomFieldData.data
      );
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
        size="lg"
        aria-labelledby="example-modal-sizes-title-lg"
        show={showModalLogin}
        onHide={() => setShowModalLogin(!showModalLogin)}
      >
        <Modal.Header closeButton>
          <Modal.Title id="example-modal-sizes-title-lg">Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="light" onClick={() => {}}>
            Register
          </Button>
          <Button variant="primary" onClick={() => handleLogin()}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function handleLogin() {
    props
      .loginQiwii(username, phone, password)
      .then((user) => {
        if (user.status === "Success") {
          setShowModalLogin(!showModalLogin);
          setUserSession("user", user, { path: "/adaptive" });
        } else {
          setShowModalLogin(!showModalLogin);
        }
      })
      .catch((error) => {
        if (error.status === 400) {
        }
      });
  }
  return (
    <div>
      <Header back title="Review Antrian" />
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
  dataServiceDetail: PropTypes.object,
  dataSelectedDate: PropTypes.object,
  dataSession: PropTypes.object,
  dataCustomFieldData: PropTypes.object,
};

const mapStateToProps = (state) => ({
  dataServiceDetail: state.dataServiceDetail,
  dataSelectedDate: state.dataSelectedDate,
  dataCustomFieldData: state.dataCustomFieldData,
  dataSession: state.dataSession,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(ReviewQueue);

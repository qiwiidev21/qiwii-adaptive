import React, { useState } from "react";
import logo from "../../assets/images/header-logo.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import { useCookies } from "react-cookie";
import { Container, Button, Form, Modal } from "react-bootstrap";
import { Link } from "react-router-dom";
import OtpInput from "react-otp-input";
import { useHistory } from "react-router-dom";

function Register(props) {
  let history = useHistory();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [rePassword, setRePassword] = useState("");
  const [modalOTP, showModalOTP] = useState(false);
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [otp, setOTP] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userSession, setUserSession] = useCookies(["user"]);

  const handleSubmit = async () => {
    await props
      .registerQiwii(username, email, phone, password)
      .then(async (user) => {
        if (user.status === "Success") {
          await sessionStorage.setItem(
            "unique_identifier",
            user.unique_identifier
          );
          await setUniqueIdentifier(user.unique_identifier);
          await showModalOTP(!modalOTP);
        }
      })
      .catch((error) => {
        if (error.status === 409) {
          alert(error.data.message);
        }
      });
  };
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
                await history.push("/");
              }
            });
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  function renderModalOTP() {
    return (
      <Modal show={modalOTP} onHide={() => showModalOTP(!modalOTP)}>
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
      <section className="bg-home d-flex bg-light align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <img src={logo} height="100" className="mx-auto d-block" alt="" />
              <div className="card login-page bg-white shadow mt-4 rounded border-0">
                <div className="card-body">
                  <h4 className="text-center">Daftar</h4>
                  <Form className="login-form mt-4">
                    <div className="row">
                      <div className="col-lg-12">
                        <div className="mb-3">
                          <Form.Label className="form-label">
                            Nama <span className="text-danger">*</span>
                          </Form.Label>
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Nama"
                            name="usename"
                            required=""
                            onChange={(event) =>
                              setUsername(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="mb-3">
                          <Form.Label className="form-label">
                            Email <span className="text-danger">*</span>
                          </Form.Label>
                          <input
                            type="email"
                            className="form-control"
                            placeholder="Email"
                            name="email"
                            required=""
                            onChange={(event) => setEmail(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="mb-3">
                          <Form.Label className="form-label">
                            Nomor telepone{" "}
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <input
                            type="number"
                            className="form-control"
                            placeholder="Nomor telepone"
                            name="phone"
                            required=""
                            onChange={(event) => setPhone(event.target.value)}
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="mb-3">
                          <Form.Label className="form-label">
                            Kata Sandi <span className="text-danger">*</span>
                          </Form.Label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Kata Sandi"
                            required=""
                            onChange={(event) =>
                              setPassword(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-12">
                        <div className="mb-3">
                          <Form.Label className="form-label">
                            Ulangi Kata Sandi{" "}
                            <span className="text-danger">*</span>
                          </Form.Label>
                          <input
                            type="password"
                            className="form-control"
                            placeholder="Ulangi Kata Sandi"
                            required=""
                            onChange={(event) =>
                              setRePassword(event.target.value)
                            }
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 mb-0">
                        <div className="d-grid">
                          <Button
                            className="btn next-button btn-primary"
                            onClick={() => handleSubmit()}
                          >
                            Daftar
                          </Button>
                        </div>
                      </div>

                      <div className="col-12 text-center">
                        <h6 className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Sudah punya akun ?
                          </small>{" "}
                          <Link to="/login">
                            <h6 className="text-dark fw-bold">Masuk</h6>
                          </Link>
                        </h6>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {renderModalOTP()}
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataSession: state.dataSession,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

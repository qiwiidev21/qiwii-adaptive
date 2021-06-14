import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import { useCookies } from "react-cookie";
import { Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");

  const [password, setPassword] = useState("");
  // eslint-disable-next-line no-unused-vars
  const [userSession, setUserSession] = useCookies(["user"]);
  const handleSubmit = () => {
    props.loginQiwii(email, password).then((user) => {
      props.history.push("/review");
      setUserSession("user", user, { path: "/" });
    });
  };

  return (
    <div>
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
                          />
                        </div>
                      </div>

                      <div className="col-lg-12 mb-0">
                        <div className="d-grid">
                          <Button
                            className="btn btn-primary"
                            onClick={() => handleSubmit()}
                          >
                            Daftar
                          </Button>
                        </div>
                      </div>

                      <div className="col-12 text-center">
                        <p className="mb-0 mt-3">
                          <small className="text-dark me-2">
                            Sudah punya akun ?
                          </small>{" "}
                          <Link to="/login">
                            <h6 className="text-dark fw-bold">Masuk</h6>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataSession: state.dataSession,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import { useCookies } from "react-cookie";
import { Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";

function Login(props) {
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [setUserSession] = useCookies(["user"]);
  // console.log(userSession);
  const handleSubmit = (event) => {
    event.preventDefault();
    props
      .loginQiwii(email, password)
      .then((user) => {
        props.history.push("/adaptive");
        setUserSession("user", user, { path: "/adaptive" });
      })
      .catch((error) => {
        if (error.status === 400) {
          if (error.data.message === "User belum terdaftar.") {
            setEmailError(error.data.message);
          } else {
            setPasswordError(error.data.message);
          }
        } else if (error.status === "Error") {
          if (error === "Maaf password yang anda berikan salah.") {
            setPasswordError(error);
          } else {
            setEmailError(error);
          }
        } else {
          alert("Internal server error");
        }
      });
  };

  return (
    <div className="container">
      <section className="bg-home d-flex bg-light align-items-center">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-lg-5 col-md-8">
              <img src={logo} height="100" className="mx-auto d-block" alt="" />
              <div className="card login-page bg-white shadow mt-4 rounded border-0">
                <div className="card-body">
                  <h4 className="text-center">Sign In</h4>
                  <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="formBasicEmail">
                      <Form.Label>Email</Form.Label>
                      <Form.Control
                        type="email"
                        placeholder="Masukkan email"
                        onChange={(event) => {
                          setEmail(event.target.value);
                          setEmailError("");
                        }}
                        isInvalid={emailError}
                      />
                      <Form.Control.Feedback type="invalid">
                        {emailError}
                      </Form.Control.Feedback>
                    </Form.Group>

                    <Form.Group controlId="formBasicPassword">
                      <Form.Label>Kata Sandi</Form.Label>
                      <Form.Control
                        type="password"
                        placeholder="Kata Sandi"
                        onChange={(event) => {
                          setPassword(event.target.value);
                          setPasswordError("");
                        }}
                        isInvalid={passwordError}
                      />
                      <Form.Control.Feedback type="invalid">
                        {passwordError}
                      </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group controlId="formBasicCheckbox">
                      <Form.Check type="checkbox" label="Ingatkan saya" />
                    </Form.Group>
                    <Button
                      variant="primary"
                      type="submit"
                      className="col-lg-12 mb-0"
                      onClick={handleSubmit}
                    >
                      Masuk
                    </Button>
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

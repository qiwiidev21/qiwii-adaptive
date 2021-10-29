import React, { useState } from "react";
import logo from "../../assets/images/logo.png";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import { Button, Form } from "react-bootstrap";
// import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";

function Login(props) {
  let history = useHistory();
  // let location = useLocation();
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");
  const [emailError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  // console.log(userSession);
  const handleSubmit = (event) => {
    event.preventDefault();
    props
      .loginQiwii(username, phone, password)
      .then((user) => {
        history.goBack();
        sessionStorage.setItem("token", user.token);
        sessionStorage.setItem("unique_identifier", user.unique_identifier);
        sessionStorage.setItem("user", JSON.stringify(user));
        props.getDataUser(user.unique_identifier, user.uuid, user.token);
        notificationRequest();
      })
      .catch((error) => {
        if (error.status === 400) {
          if (error.data.message === "User belum terdaftar.") {
            setUsernameError(error.data.message);
          } else {
            setPasswordError(error.data.message);
          }
        } else if (error.status === "Error") {
          if (error === "Maaf password yang anda berikan salah.") {
            setPasswordError(error);
          } else {
            setUsernameError(error);
          }
        }
      });
  };

  async function notificationRequest() {
    try {
      let permission = await Notification.requestPermission();
      if (permission === 'granted') {
        sessionStorage.setItem("permission", permission)
      } else if (permission === 'denied') {
        sessionStorage.setItem("permission", permission)
      }
    } catch (e) {
      console.log(e);
    }
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
                        type="text"
                        placeholder="Masukkan email"
                        onChange={(event) => {
                          setPhoneOrMail(event.target.value);
                          setUsernameError("");
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

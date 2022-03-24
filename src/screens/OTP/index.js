import React, { useState } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import Header from "../../components/Header";
import { useHistory } from "react-router-dom";
import OtpInput from "react-otp-input";
import { Container, Button } from "react-bootstrap";
import "./styles.css";

function OTPScreen(props) {
  let history = useHistory();
  const [otp, setOTP] = useState("");
  const [uniqueIdentifier, setUniqueIdentifier] = useState("");
  const [showModalLogin, setShowModalLogin] = useState(false);
  // const { url } = useRouteMatch();
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
          await setOTP("");
          await sessionStorage.setItem("token", user.token);
          await sessionStorage.setItem("user", JSON.stringify(sessionUser));
          await props
            .getDataUser(uniqueIdentifier, "ABCD1234", user.token)
            .then(async (response) => {
              if (response.status === "Success") {
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

  return (
    <div className="container">
      <Container>
        <Header back title="Masukan OTP" />
        <div className="form-container">
          <div className="align-items-center">
            <h6 className="text-center">
              Masukan kode verifikasi yang telah dikirim ke email Anda
            </h6>
          </div>
          <OtpInput
            containerStyle={{
              alignItems: "center",
              justifyContent: "center",
              paddingVertical: "5%",
            }}
            inputStyle={{ margin: 10, width: 50, height: 80, fontSize: 20 }}
            placeholder={"0"}
            value={otp}
            hasErrored
            onChange={(otp) => setOTP(otp)}
            numInputs={4}
            separator={<h6>-</h6>}
          />
        </div>
      </Container>
      <div className="container-item my-5">
        <Button
          variant="primary"
          type="submit"
          className="next-button"
          onClick={async () => {
            await handleSubmitOTP();
          }}
        >
          Lanjutkan
        </Button>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  dataSession: state.dataSession,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(OTPScreen);

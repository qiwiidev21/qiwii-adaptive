/**
 * @Author: Raka Mahardika <rakamahardika>
 * @Date:   02-October-2021
 * @Last modified by:   rakamahardika
 * @Last modified time: 11-March-2022
 */

import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import PropTypes from "prop-types";
// import ReactMidtrans from "../../components/Midtrans";
import OtpInput from "react-otp-input";
import { ScrollMenu } from "react-horizontal-scrolling-menu";
import {
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
// import axios from "axios";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
// import launchImage from "../../assets/images/header-qiwii-launch.png";
import { Container, Form, Button, Modal } from "react-bootstrap";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";
import _ from "lodash";
import { Helmet } from "react-helmet";
import moment from "moment";
import { useTranslation } from "react-i18next";

const Schedule = (props) => {
  const { url } = useRouteMatch();
  const { routeID } = useParams();
  const { t } = useTranslation();

  let history = useHistory();
  let location = useLocation();
  const date = new Date();
  const dates = new Date(date.getFullYear(), date.getMonth() + 1, 1);
  const [messageReport, setMessageReport] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const currentDate = date.getDate();
  const currentDates = dates.getDate();
  // const [token, setToken] = useState("");
  const [otp, setOTP] = useState("");
  const [user, setUser] = useState({});
  const [showModalReport, setShowModalReport] = useState(false);

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
    0
  ).getDate();
  const lastDays = new Date(
    date.getFullYear(),
    date.getMonth() + 2,
    0
  ).getDate();
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  useEffect(() => {
    getPayment();
  });

  function getPayment() {
    const payment = sessionStorage.getItem("payment");
    if (!_.isEmpty(JSON.parse(payment))) {
      handleSubmitPayment(JSON.parse(payment));
    }
  }

  useEffect(() => {
    if (props.dataSession) {
      getCookies();
    }
  }, [props.dataSession]); // eslint-disable-line react-hooks/exhaustive-deps

  const getCookies = async () => {
    const userSession = await sessionStorage.getItem("user");
    const user = await JSON.parse(userSession);
    if (user) {
      return props.getDataUser(user.unique_identifier, user.uuid, user.token);
    } else {
      return null;
    }
  };

  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const formatDay = currentDate < 10 ? `0${currentDate}` : `${currentDate}`;
  const formatMonth =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  const formatDate = new Date(
    `${date.getFullYear()}-${formatMonth}-${formatDay}`
  );

  const [uniqueIdentifier, setUniqueIdentifier] = useState("");

  const [modalOTP, showModalOTP] = useState(false);

  const [selectedDate, setSelectedDate] = useState({
    day: days[formatDate.getDay()],
    date: currentDate,
    format: `${date.getFullYear()}-${formatMonth}-${formatDay}`,
  });

  const [selectTime, setSelectTime] = useState({
    disabled: "true",
    estimated_next_called_time: "05:00:00",
    label: "05:00 - 06:00",
    order: 0,
    queues: 0,
    quota: "25",
    time: "05",
  });

  const parseUrl = typeof url === "string" ? url.split("/") : null;
  const organizationID = parseUrl[2];
  const [customFieldValue, setValCustomField] = useState([]);
  const [dataCustomField, setDataCustomField] = useState([]);
  const [dataSlotTime, setDataSlotTime] = useState([]);
  const [sessionStored, setSessionStored] = useState({});

  useEffect(() => {
    fetchServiceDetail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (organizationID && routeID) {
      fetchDataCustomField();
    }
  }, [organizationID]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (props.dataUserProfile.data) {
      getSession();
    }
  }, [props.dataUserProfile.data]);

  function getSession() {
    const user = sessionStorage.getItem("user");
    setSessionStored(JSON.parse(user));
  }

  useEffect(() => {
    if (routeID) {
      if (props.dataServiceSelected.data.slot_aktif === "1") {
        props
          .fetchSlotTime(routeID, selectedDate.format)
          .then((response) => {
            setDataSlotTime(response);
          })
          .catch((error) => {
            if (error) {
              setDataSlotTime([]);
            }
          });
      }
    }
  }, [routeID]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedDate) {
      if (props.dataServiceSelected.data?.slot_aktif === "1") {
        props
          .fetchSlotTime(routeID, selectedDate.format)
          .then((response) => {
            console.log(response, "SLOT TIME");
            setDataSlotTime(response);
          })
          .catch((error) => {
            console.log(error, "ERROR SLOT TIME");
            if (error) {
              setDataSlotTime([]);
            }
          });
      }
    }
  }, [selectedDate]); // eslint-disable-line react-hooks/exhaustive-deps

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

  const [companyName, setCompanyName] = useState("Merchant Name");

  useEffect(() => {
    if (!_.isEmpty(props.dataServiceSelected.data)) {
      setCompanyName(props.dataServiceSelected.data.company_name);
    }
  }, [props.dataServiceSelected.data]);

  async function fetchServiceDetail() {
    await props.fetchServiceDetail(routeID);
  }

  function fetchDataCustomField() {
    let params = {
      organization_id:
        organizationID.length <= 3
          ? organizationID.replace(/\/r/g, "/")
          : organizationID,
      service_id: routeID,
      "f-show_on_web": 1,
    };
    console.log(params);
    props
      .fetchDataCustomField(params)
      .then((response) => {
        console.log("CUSTOM_FIELD", response);
        setDataCustomField(response);
      })
      .catch((error) => {
        setDataCustomField([]);
      });
  }

  function renderMerchant() {
    if (props.dataServiceSelected.data) {
      const { data } = props.dataServiceSelected;
      return (
        <div className="schedule-item my-5 p-3 shadow-sm">
          <h6 className="m-1">{data.name}</h6>
          <h5 className="unit-name m-1">{data.company_name}</h5>
          <div className="row m-1">
            <div className="d-flex status-open">
              <h6 className="status-text">
                {data.buka === "00:00:00" && data.tutup === "00:00:00"
                  ? "OPEN"
                  : data.tutup <= data.buka
                  ? "CLOSE"
                  : "OPEN"}
              </h6>
            </div>
            <h6 className="time-text">
              Jam Buka:{" "}
              {data.buka === "00:00:00" && data.tutup === "00:00:00"
                ? "24 Jam"
                : data.buka + " - " + data.tutup}
            </h6>
          </div>
        </div>
      );
    }
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

  const [week, setWeek] = useState([]);

  useEffect(() => {
    loadDataWeek();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (week.length <= 30) {
      loadDataWeekTwo();
    }
  }, [week]); // eslint-disable-line react-hooks/exhaustive-deps

  function loadDataWeek() {
    const max = parseInt(props.dataServiceSelected.data?.rentang_maksimal);
    // const rentant = new Date(date.setDate(date.getDate() + max));
    const rentant = new Date(moment(date, "DD-MM-YYYY").add(max, "days"));
    for (let i = currentDate; i <= lastDay; i++) {
      const formatDay = i < 10 ? `0${i}` : `${i}`;
      const formatMonth =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      const formatDate = new Date(
        `${date.getFullYear()}-${formatMonth}-${formatDay}`
      );
      const rentang_maksimal = moment(rentant).format("YYYY-MM-DD");
      const setting =
        typeof props.dataServiceSelected.data?.setting === "string"
          ? JSON.parse(props.dataServiceSelected.data?.setting)
          : props.dataServiceSelected.data?.setting;
      const isOpen = moment(
        `${date.getFullYear()}-${formatMonth}-${formatDay}`
      ).isSameOrAfter(rentang_maksimal)
        ? false
        : days[formatDate.getDay()] === "Mon" &&
          Object.values(setting.daftar_buka)[0].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[0].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Tue" &&
          Object.values(setting.daftar_buka)[1].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[1].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Wed" &&
          Object.values(setting.daftar_buka)[2].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[2].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Thu" &&
          Object.values(setting.daftar_buka)[3].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[3].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Fri" &&
          Object.values(setting.daftar_buka)[4].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[4].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Sat" &&
          Object.values(setting.daftar_buka)[5].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[5].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Sun" &&
          Object.values(setting.daftar_buka)[6].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[6].kiosk !== "00:00"
        ? true
        : false;
      const objDate = {
        day: days[formatDate.getDay()],
        date: i,
        isOpen: isOpen,
        format: `${date.getFullYear()}-${formatMonth}-${formatDay}`,
      };
      week.push(objDate);
      setWeek(week);
    }
  }

  function loadDataWeekTwo() {
    const max = parseInt(props.dataServiceSelected.data?.rentang_maksimal);
    const rentant = new Date(moment(date, "DD-MM-YYYY").add(max, "days"));
    for (let i = currentDates; i <= lastDays; i++) {
      const formatDay = i < 10 ? `0${i}` : `${i}`;
      const formatMonth =
        dates.getMonth() + 1 < 10
          ? `0${dates.getMonth() + 1}`
          : `${dates.getMonth() + 1} `;
      const formatDate = new Date(
        `${dates.getFullYear()}-${formatMonth}-${formatDay}`
      );
      const rentang_maksimal = moment(rentant).format("YYYY-MM-DD");
      const setting =
        typeof props.dataServiceSelected.data?.setting === "string"
          ? JSON.parse(props.dataServiceSelected.data?.setting)
          : props.dataServiceSelected.data?.setting;
      const isOpen = moment(
        `${dates.getFullYear()}-${formatMonth}-${formatDay}`
      ).isSameOrAfter(rentang_maksimal)
        ? false
        : days[formatDate.getDay()] === "Mon" &&
          Object.values(setting.daftar_buka)[0].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[0].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Tue" &&
          Object.values(setting.daftar_buka)[1].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[1].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Wed" &&
          Object.values(setting.daftar_buka)[2].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[2].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Thu" &&
          Object.values(setting.daftar_buka)[3].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[3].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Fri" &&
          Object.values(setting.daftar_buka)[4].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[4].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Sat" &&
          Object.values(setting.daftar_buka)[5].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[5].kiosk !== "00:00"
        ? true
        : days[formatDate.getDay()] === "Sun" &&
          Object.values(setting.daftar_buka)[6].kiosk !== undefined &&
          Object.values(setting.daftar_buka)[6].kiosk !== "00:00"
        ? true
        : false;
      const objDate = {
        day: days[formatDate.getDay()],
        date: i,
        isOpen: isOpen,
        format: `${date.getFullYear()}-${formatMonth}-${formatDay}`,
      };
      week.push(objDate);
      setWeek(week);
    }
  }

  function renderCalendar() {
    const isDisabled =
      props.dataServiceSelected.data?.slot_aktif === "0" ? true : false;
    return (
      <div
        className="slot-card my-5 p-3 align-items-center justify-content-center"
        style={{ opacity: isDisabled ? 0.5 : 1 }}
      >
        <div>
          <div className="justify-content-center">
            <h3 className="month-text">
              {monthNames[date.getMonth()]} {date.getFullYear()}
            </h3>
          </div>
          <div>
            <ScrollMenu className="calendar">
              {week.map((item, index) => {
                return (
                  <div key={index} className="my-1">
                    <h6 className="date-text">{item.day}</h6>
                    <div
                      className="date-round mx-3 justify-content-center"
                      style={
                        item.isOpen === false
                          ? { backgroundColor: "rgba(0, 0, 0, 0.1)" }
                          : item.date === selectedDate?.date
                          ? { backgroundColor: "#8f1619" }
                          : { backgroundColor: "#ffffff" }
                      }
                    >
                      <button
                        className="btn-custom-date"
                        onClick={async () => {
                          if (item.isOpen && !isDisabled) {
                            await setSelectedDate(item);
                            await props.setSelectedDate(item.format);
                          }
                        }}
                      >
                        <h6
                          className="date-text"
                          style={
                            item.date === selectedDate?.date
                              ? { color: "#ffffff" }
                              : { color: "#333333" }
                          }
                        >
                          {item.date}
                        </h6>
                      </button>
                    </div>
                  </div>
                );
              })}
            </ScrollMenu>
          </div>
        </div>
      </div>
    );
  }

  function renderAntrian() {
    if (props.dataServiceDetail.data) {
      const { data } = props.dataServiceDetail;
      return (
        <div className="slot-card">
          <div className="justify-content-between row mx-2">
            <h6>{t("currentQueue")}</h6>
            <h6>{data.next_ticket}</h6>
          </div>
          <div className="dropdown-divider"></div>
          <div className="justify-content-between row mx-2">
            <h6>{t("averageQueue")}</h6>
            <h6>{data.rata !== null ? data.rata : "0"}</h6>
          </div>
          {data.price_active === "1" && (
            <div>
              <div className="dropdown-divider"></div>
              <div className="justify-content-between row mx-2">
                <h6>{t("price")}</h6>
                <h6>{data.price !== null ? `Rp.${data.price}` : "Rp.0"}</h6>
              </div>
            </div>
          )}
          <div className="dropdown-divider"></div>
          <div className="justify-content-between row mx-2">
            <h6>{t("estimateServiceTime")}</h6>
            <h6>{data.estimated_next_called_time}</h6>
          </div>
          <div className="dropdown-divider"></div>
        </div>
      );
    }
  }

  const [code, setCode] = useState(""); // eslint-disable-line no-unused-vars
  async function _timePressed(item, index) {
    let itemTime = item.time;
    // await this._getSlotTime()
    await setSelectTime(item);
    // await this.setState({ selectedTime: item.time, selectedTimeIndex: index })
    let status = await dataSlotTime.filter(
      // eslint-disable-line no-unused-vars
      (x) => x.time === itemTime
    );
    const timeSelect = `${status[0].time}:00`;
    await props.setSlotTime(timeSelect);

    let number = (await parseInt(dataSlotTime[index].order)) + 1;
    let queNum = await _pad(number);
    let code = await `${props.dataServiceDetail.data.code}-${queNum}`;
    // this.setState({ code: code })
    await setCode(code);
    // this.menit = (60 / parseInt(dataSlotTime[index].quota) ) * (parseInt(dataSlotTime[index].order) + 1)
  }

  function _pad(number) {
    let z = "0";
    number = number + "";
    return new Array(3 - number.length + 1).join(z) + number;
  }

  function renderSlotTime() {
    if (dataSlotTime?.length > 0) {
      return (
        <div className="container slot-card my-3">
          {dataSlotTime.map((item, index) => {
            const currentTime = new Date();

            const disableSlot =
              selectedDate.date > currentTime.getDate()
                ? false
                : currentTime.getHours() > parseInt(item.time)
                ? true
                : false;
            return (
              <div key={index}>
                <button
                  disabled={disableSlot}
                  className="btn-custom-slot btn-primary-outline"
                  onClick={async () => {
                    await _timePressed(item, index);
                    // await setSelectTime(item);
                    // await props.setSlotTime(item);
                  }}
                >
                  <div
                    className="justify-content-between row mx-2"
                    style={
                      disableSlot
                        ? { backgroundColor: "#e6e6e6" }
                        : item.label === selectTime?.label
                        ? { backgroundColor: "#8f1619" }
                        : { backgroundColor: "#ffffff" }
                    }
                  >
                    <h6
                      style={
                        disableSlot
                          ? { backgroundColor: "#e6e6e6" }
                          : item.label === selectTime?.label
                          ? { color: "#ffffff" }
                          : { color: "#333333" }
                      }
                    >
                      {item.label}
                    </h6>
                    <h6
                      style={
                        disableSlot
                          ? { backgroundColor: "#e6e6e6" }
                          : item.label === selectTime?.label
                          ? { color: "#ffffff" }
                          : { color: "#333333" }
                      }
                    >
                      {t("left")} {Number(item.quota) - Number(item.queues)}{" "}
                      {t("quota")}
                    </h6>
                  </div>
                </button>
                <div className="dropdown-divider"></div>
              </div>
            );
          })}
        </div>
      );
    }
  }

  function renderCustomField() {
    if (dataCustomField?.length) {
      return (
        <div className="container slot-card my-3">
          {dataCustomField.map((item, index) => {
            return (
              <Form key={index} onSubmit={handleSubmit}>
                {item.configuration?.input_type === "text_input" &&
                  renderInputText(item, index)}
                {item.configuration?.input_type === "radio_button" &&
                  renderRadio(item, index)}
                {item.configuration?.input_type === "checkbox" &&
                  renderCheckBox(item, index)}
                {item.configuration?.input_type === "dropdown" &&
                  renderDropDown(item, index)}
                {item.configuration?.input_type === "date" &&
                  renderDatePicker(item, index)}
              </Form>
            );
          })}
        </div>
      );
    }
  }

  function validateCustomField() {
    return new Promise((resolve, reject) => {
      if (dataCustomField.length) {
        return dataCustomField.forEach((item, index) => {
          if (
            Number(item.required_web) === 1
            // && customFieldValue[item.slot_number]
          ) {
            resolve(true);
          } else {
            reject(t("pleaseFillTheForm"));
          }
        });
      }
      resolve(true);
    });
  }

  const [showModalLogin, setShowModalLogin] = useState(false);

  const [registerForm, setRegisterForm] = useState(false);

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
            {registerForm ? "Daftar" : "Masuk"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {registerForm ? (
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username">
                <Form.Label>{t("username")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("username")}
                  onChange={(event) => setUsername(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="email">
                <Form.Label>{t("email")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("username")}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setUsernameError("");
                  }}
                  isInvalid={emailError}
                />
                <Form.Control.Feedback type="invalid">
                  {emailError}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="phone">
                <Form.Label>{t("phone")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("phone")}
                  onChange={(event) => setPhone(event.target.value)}
                />
              </Form.Group>
              <Form.Group controlId="password">
                <Form.Label>{t("password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("password")}
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
            </Form>
          ) : (
            <Form onSubmit={handleLogin}>
              <Form.Group controlId="username">
                <Form.Label>{t("username")}</Form.Label>
                <Form.Control
                  type="text"
                  placeholder={t("username")}
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
              <Form.Group controlId="password">
                <Form.Label>{t("password")}</Form.Label>
                <Form.Control
                  type="password"
                  placeholder={t("password")}
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
              {t("submit")}
            </Button>
            <div>
              <h6 className="register-text">
                {registerForm ? "Sudah" : "Belum"} punya akun?
                <button
                  className="btn-custom btn-primary-outline"
                  onClick={() => {
                    setRegisterForm(!registerForm);
                  }}
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
        if (error?.status === 400) {
          if (error.data.message === "User belum terdaftar.") {
            setUsernameError(t("userNotRegistered"));
          } else {
            setPasswordError(error.data.message);
          }
        } else {
          if (error === "Maaf password yang anda berikan salah.") {
            setPasswordError(t("passwordWrong"));
          } else {
            setUsernameError(error);
          }
        }
        // if (error.status === 400) {
        //   setShowModalReport(true);
        //   setTitleReport("Error");
        //   setMessageReport(error.message);
        // }
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
      console.log(e);
    }
  }
  const [titleReport, setTitleReport] = useState("");

  function handleRegister() {
    props
      .registerQiwii(username, email, phone, password)
      .then(async (user) => {
        if (user.status === "Success") {
          // setShowModalLogin(!showModalLogin);
          await setShowModalLogin(!showModalLogin);
          // await setRegisterForm(!registerForm);
          await showModalOTP(!modalOTP);
          await setUniqueIdentifier(user.unique_identifier);
          await sessionStorage.setItem(
            "unique_identifier",
            user.unique_identifier
          );
          // setTitleReport(user.status);
        } else {
          setTitleReport("Error");
        }
      })
      .catch((error) => {
        if (error.status === 400) {
          setTitleReport("Error");
        }
      });
  }

  const [showModal, setShowModal] = useState(false);

  function renderModal() {
    return (
      <Modal show={showModal} onHide={() => setShowModal(!showModal)}>
        <Modal.Header closeButton>
          <Modal.Title>Anda belum login.</Modal.Title>
        </Modal.Header>
        <Modal.Body>Silahkan login untuk melanjutkan!</Modal.Body>
        <Modal.Footer>
          <Button
            variant="light"
            onClick={async () => {
              await setShowModal(!showModal);
              await setShowModalLogin(true);
              await setRegisterForm(true);
            }}
          >
            Daftar
          </Button>
          <Button
            variant="primary"
            onClick={async () => {
              await setShowModal(!showModal);
              await setShowModalLogin(true);
              await setRegisterForm(false);
            }}
          >
            Masuk
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  async function handleSubmit() {
    try {
      const results = await validateCustomField();
      if (results) {
        await props.setSelectedDate(selectedDate.format);
        await props.setCustomField(customFieldValue);
        await history.push(`${location.pathname}/review`);
      }
    } catch (e) {
      alert(e);
    }
  }
  async function handleSubmitPayment(payment) {
    try {
      const results = await validateCustomField();
      if (results) {
        await props.setSelectedDate(selectedDate.format);
        await props.setCustomField(customFieldValue);
        await props.setPaymentMethod(payment);
        await history.push(`${location.pathname}/review`);
      }
    } catch (e) {
      alert(e);
    }
  }

  function setCustomField(value, index) {
    customFieldValue[index] = value;
    setValCustomField(customFieldValue);
  }

  function renderInputText(data, index) {
    return (
      <Form.Group controlId={data.field_name}>
        <Form.Label>{data.field_name}</Form.Label>
        <Form.Control
          type={data.configuration.value_type === "angka" ? "number" : "text"}
          maxLength={
            data.configuration.pembanding === "max"
              ? data.configuration.karakter1
              : data.configuration.karakter2
          }
          placeholder={data.help_text}
          onChange={(event) =>
            setCustomField(event.target.value, data.slot_number)
          }
        />
      </Form.Group>
    );
  }
  function renderRadio(data) {
    return (
      <Form.Group controlId={data.field_name}>
        <Form.Label>{data.field_name}</Form.Label>
        {data.configuration?.text_options.length &&
          data.configuration?.text_options.map((val, index) => (
            <div key={index} className="mb-3">
              <Form.Check
                inline
                name={`group-${index}`}
                type={"radio"}
                id={index}
                label={val}
              ></Form.Check>
            </div>
          ))}
      </Form.Group>
    );
  }
  function renderCheckBox(data) {
    return (
      <Form.Group controlId={data.field_name}>
        <Form.Label>{data.field_name}</Form.Label>
        {data.configuration?.text_options.length &&
          data.configuration?.text_options.map((val, index) => (
            <div key={index} className="mb-3">
              <Form.Check
                inline
                name={`group-${index}`}
                type={"checkbox"}
                id={index}
                label={val}
              ></Form.Check>
            </div>
          ))}
      </Form.Group>
    );
  }
  function renderDropDown(data) {
    return (
      <div className="mb-3">
        <Dropdown
          options={data.configuration.text_options}
          onChange={() => {}}
          placeholder={data.field_name}
        />
      </div>
    );
  }
  const [startDate, setStartDate] = useState(new Date());

  function renderDatePicker(data) {
    return (
      <div className="mb-3">
        <DatePicker
          className="date-picker"
          selected={startDate}
          onChange={(date) => setStartDate(date)}
        />
      </div>
    );
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

  return (
    <div className="container">
      <Helmet>
        <meta charSet="utf-8" />
        <meta
          name="description"
          content={`Qiwii: Sistem antrian/booking online untuk berbagai layanan dari ${companyName}`}
        />
        <title>Qiwii: {companyName}</title>
      </Helmet>
      <Header back title="Pilih Jadwal" profile={profile} />
      <Hero url={props.dataPromo.data} alt="Qiwii" />
      <div className="menu"></div>
      <section>{renderMerchant()}</section>
      <section>{renderCalendar()}</section>
      <section>{renderAntrian()}</section>
      <section>{renderSlotTime()}</section>
      <section>{renderCustomField()}</section>
      <div className="container-item my-5">
        {_.isEmpty(sessionStored) ? (
          <Button
            variant="primary"
            type="submit"
            className="next-button"
            onClick={() => setShowModal(true)}
          >
            {t("loginForTheNext")}
          </Button>
        ) : (
          <Button
            disabled={
              props.dataServiceSelected.data.slot_aktif === "1" &&
              dataSlotTime.length < 1
            }
            variant="primary"
            type="submit"
            className="next-button"
            onClick={handleSubmit}
          >
            {t("next")}
          </Button>
        )}
      </div>
      {renderModal()}
      {renderModalOTP()}
      {renderModalLogin()}
      {renderModalReport()}
    </div>
  );
};

Schedule.defaultProps = {
  fetchServiceDetail: () => {},
  fetchDataCustomField: () => {},
  setCustomField: () => {},
  setSlotTime: () => {},
};

Schedule.propTypes = {
  dataSlotTime: PropTypes.object,
  dataPromo: PropTypes.object,
  dataServiceDetail: PropTypes.object,
  dataService: PropTypes.object,
  fetchServiceDetail: PropTypes.func,
  setSlotTime: PropTypes.func,
  fetchDataCustomField: PropTypes.func,
  setCustomField: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataMerchantProfile: state.dataMerchantProfile,
  dataPromo: state.dataPromo,
  dataServiceDetail: state.dataServiceDetail,
  dataSlotTime: state.dataSlotTime,
  dataService: state.dataService,
  dataServiceSelected: state.dataServiceSelected,
  dataSession: state.dataSession,
  dataUserProfile: state.dataUserProfile,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

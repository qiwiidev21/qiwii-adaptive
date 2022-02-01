/**
 * @Author: Raka Mahardika <rakamahardika>
 * @Date:   02-October-2021
 * @Last modified by:   rakamahardika
 * @Last modified time: 01-February-2022
 */

import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import Hero from "../../components/Hero";
import PropTypes from "prop-types";
import {
  useRouteMatch,
  useParams,
  useHistory,
  useLocation,
} from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
// import launchImage from "../../assets/images/header-qiwii-launch.png";
import { Form, Button } from "react-bootstrap";
import Dropdown from "react-dropdown";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "react-dropdown/style.css";
import _ from "lodash";
import { Helmet } from "react-helmet";
import moment from "moment";
const Schedule = (props) => {
  const { url } = useRouteMatch();
  const { routeID } = useParams();
  let history = useHistory();
  let location = useLocation();
  const date = new Date();
  const currentDate = date.getDate();

  const lastDay = new Date(
    date.getFullYear(),
    date.getMonth() + 1,
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
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const formatDay = currentDate < 10 ? `0${currentDate}` : `${currentDate}`;
  const formatMonth =
    date.getMonth() + 1 < 10
      ? `0${date.getMonth() + 1}`
      : `${date.getMonth() + 1}`;
  const formatDate = new Date(
    `${date.getFullYear()}-${formatMonth}-${formatDay}`
  );

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

  const parseUrl = typeof url === "string" ? url.substr(url.length - 7) : null;
  const organizationID = parseUrl.substring(0, 3);

  const [customFieldValue, setValCustomField] = useState([]);
  const [dataCustomField, setDataCustomField] = useState([]);
  const [dataSlotTime, setDataSlotTime] = useState([]);

  useEffect(() => {
    fetchServiceDetail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (organizationID && routeID) {
      fetchDataCustomField();
    }
  }, [organizationID]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (routeID) {
      if (props.dataServiceSelected.data?.slot_aktif === "1") {
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
            setDataSlotTime(response);
          })
          .catch((error) => {
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
      organization_id: organizationID,
      service_id: routeID,
      "f-show_on_web": 1,
    };
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
              <p className="status-text">
                {data.buka === "00:00:00" && data.tutup === "00:00:00"
                  ? "OPEN"
                  : data.tutup <= data.buka
                  ? "CLOSE"
                  : "OPEN"}
              </p>
            </div>
            <p className="time-text">
              Jam Buka:{" "}
              {data.buka === "00:00:00" && data.tutup === "00:00:00"
                ? "24 Jam"
                : data.buka + " - " + data.tutup}
            </p>
          </div>
        </div>
      );
    }
  }

  function renderCalendar() {
    const week = [];
    const max = parseInt(props.dataServiceSelected.data?.rentang_maksimal);
    // const rentant = new Date(date.setDate(date.getDate() + max));
    const rentant = new Date(moment(date, "DD-MM-YYYY").add(max, "days"));
    for (let i = currentDate; i <= rentant.getDate(); i++) {
      const formatDay = i < 10 ? `0${i}` : `${i}`;
      const formatMonth =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      const formatDate = new Date(
        `${date.getFullYear()}-${formatMonth}-${formatDay}`
      );
      const setting =
        typeof props.dataServiceSelected.data?.setting === "string"
          ? JSON.parse(props.dataServiceSelected.data?.setting)
          : props.dataServiceSelected.data?.setting;

      const isOpen =
        days[formatDate.getDay()] === "Mon" &&
        Object.keys(setting.hari)[0] !== undefined &&
        Object.keys(setting.hari)[0] === "1"
          ? true
          : days[formatDate.getDay()] === "Tue" &&
            Object.keys(setting.hari)[1] !== undefined &&
            Object.keys(setting.hari)[1] === "2"
          ? true
          : days[formatDate.getDay()] === "Wed" &&
            Object.keys(setting.hari)[2] !== undefined &&
            Object.keys(setting.hari)[2] === "3"
          ? true
          : days[formatDate.getDay()] === "Thu" &&
            Object.keys(setting.hari)[3] !== undefined &&
            Object.keys(setting.hari)[3] === "4"
          ? true
          : days[formatDate.getDay()] === "Fri" &&
            Object.keys(setting.hari)[4] !== undefined &&
            Object.keys(setting.hari)[4] === "5"
          ? true
          : days[formatDate.getDay()] === "Sat" &&
            Object.keys(setting.hari)[5] !== undefined &&
            Object.keys(setting.hari)[5] === "6"
          ? true
          : days[formatDate.getDay()] === "Sun" &&
            Object.keys(setting.hari)[6] !== undefined &&
            Object.keys(setting.hari)[6] === "7"
          ? true
          : false;
      const objDate = {
        day: days[formatDate.getDay()],
        date: i,
        isOpen: isOpen,
        format: `${date.getFullYear()}-${formatMonth}-${formatDay}`,
      };
      week.push(objDate);
    }

    const isDisabled =
      props.dataServiceSelected.data?.slot_aktif === "0" ? true : false;
    return (
      <div
        className="slot-card my-5 p-3 align-items-center justify-content-center"
        style={{ opacity: isDisabled ? 0.5 : 1 }}
      >
        <div className="justify-content-center">
          <h3 className="month-text">
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </h3>
        </div>
        <div className="row-custom calendar">
          {week.map((item, index) => {
            return (
              <div key={index} className="my-1">
                <p className="date-text">{item.day}</p>
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
                    <p
                      className="date-text"
                      style={
                        item.date === selectedDate?.date
                          ? { color: "#ffffff" }
                          : { color: "#333333" }
                      }
                    >
                      {item.date}
                    </p>
                  </button>
                </div>
              </div>
            );
          })}
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
            <p>Nomor mengantri saat ini</p>
            <p>{data.next_ticket}</p>
          </div>
          <div className="dropdown-divider"></div>
          <div className="justify-content-between row mx-2">
            <p>Rata-rata lama per antrian</p>
            <p>{data.rata !== null ? data.rata : "0"}</p>
          </div>
          <div className="dropdown-divider"></div>
          <div className="justify-content-between row mx-2">
            <p>Estimasi waktu dilayani</p>
            <p>{data.estimated_next_called_time}</p>
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
      console.log(dataSlotTime);
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
                    <p
                      style={
                        disableSlot
                          ? { backgroundColor: "#e6e6e6" }
                          : item.label === selectTime?.label
                          ? { color: "#ffffff" }
                          : { color: "#333333" }
                      }
                    >
                      {item.label}
                    </p>
                    <p
                      style={
                        disableSlot
                          ? { backgroundColor: "#e6e6e6" }
                          : item.label === selectTime?.label
                          ? { color: "#ffffff" }
                          : { color: "#333333" }
                      }
                    >
                      Tersisa {Number(item.quota) - Number(item.queues)} kuota
                    </p>
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
            Number(item.required_web) === 1 &&
            customFieldValue[item.slot_number]
          ) {
            resolve(true);
          } else {
            reject("Harap mengisi form terlebih dahulu!");
          }
        });
      }
      resolve(true);
    });
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
        <Button
          variant="primary"
          type="submit"
          className="next-button"
          onClick={handleSubmit}
        >
          Lanjutkan
        </Button>
      </div>
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
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

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

const Schedule = (props) => {
  const { url } = useRouteMatch();
  const { routeID } = useParams();
  let history = useHistory();
  let location = useLocation();
  const date = new Date();
  const currentDate = date.getDate();

  // const [banner, setBanner] = useState("https://dev.qiwii.id/files/thumb/179d7a995690b4c/720/360/fit");

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

  const [customField, setValCustomField] = useState([]);

  useEffect(() => {
    fetchServiceDetail();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (routeID) {
      props.fetchSlotTime(routeID, selectedDate.format);
    }
  }, [routeID]); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (selectedDate) {
      props.fetchSlotTime(routeID, selectedDate.format);
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

  async function fetchServiceDetail() {
    await props.fetchServiceDetail(routeID);
    await fetchDataCustomField();
    await props.fetchSlotTime(routeID, selectedDate.format);
  }

  function fetchDataCustomField() {
    let params = {
      organization_id: organizationID,
      service_id: routeID,
    };
    props.fetchDataCustomField(params);
  }

  function renderMerchant() {
    if (props.dataServiceSelected.data) {
      const { data } = props.dataServiceSelected;
      return (
        <div className="container my-5 card-item p-3 shadow-sm">
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
    for (let i = currentDate; i <= lastDay; i++) {
      const formatDay = i < 10 ? `0${i}` : `${i}`;
      const formatMonth =
        date.getMonth() + 1 < 10
          ? `0${date.getMonth() + 1}`
          : `${date.getMonth() + 1}`;
      const formatDate = new Date(
        `${date.getFullYear()}-${formatMonth}-${formatDay}`
      );
      const objDate = {
        day: days[formatDate.getDay()],
        date: i,
        format: `${date.getFullYear()}-${formatMonth}-${formatDay}`,
      };
      week.push(objDate);
    }
    return (
      <div className="container my-5 align-items-center justify-content-center">
        <div className="justify-content-center">
          <h3 className="month-text">
            {monthNames[date.getMonth()]} {date.getFullYear()}
          </h3>
        </div>
        <div className="row-custom calendar">
          {week.map((item, index) => (
            <div key={index} className="my-1">
              <p className="date-text">{item.day}</p>
              <div
                className="date-round mx-3 justify-content-center"
                style={
                  item.date === selectedDate?.date
                    ? { backgroundColor: "#8f1619" }
                    : { backgroundColor: "#ffffff" }
                }
              >
                <button
                  className="btn-custom-date"
                  onClick={async () => {
                    await setSelectedDate(item);
                    await props.setSelectedDate(item.format);
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
          ))}
        </div>
      </div>
    );
  }

  function renderAntrian() {
    if (props.dataServiceDetail.data) {
      const { data } = props.dataServiceDetail;
      return (
        <div className="container">
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
    let status = await props.dataSlotTime.data.filter(
      // eslint-disable-line no-unused-vars
      (x) => x.time === itemTime
    );
    const timeSelect = `${status[0].time}:00`;
    await props.setSlotTime(timeSelect);

    let number = (await parseInt(props.dataSlotTime.data[index].order)) + 1;
    let queNum = await _pad(number);
    let code = await `${props.dataServiceDetail.data.code}-${queNum}`;
    // this.setState({ code: code })
    await setCode(code);
    // this.menit = (60 / parseInt(props.dataSlotTime.data[index].quota) ) * (parseInt(props.dataSlotTime.data[index].order) + 1)
  }

  function _pad(number) {
    let z = "0";
    number = number + "";
    return new Array(3 - number.length + 1).join(z) + number;
  }

  function renderSlotTime() {
    if (props.dataSlotTime.data?.length) {
      return (
        <div className="container my-2">
          {props.dataSlotTime.data.map((item, index) => (
            <div key={index}>
              <button
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
                    item.label === selectTime?.label
                      ? { backgroundColor: "#8f1619" }
                      : { backgroundColor: "#ffffff" }
                  }
                >
                  <p
                    style={
                      item.label === selectTime?.label
                        ? { color: "#ffffff" }
                        : { color: "#333333" }
                    }
                  >
                    {item.label}
                  </p>
                  <p
                    style={
                      item.label === selectTime?.label
                        ? { color: "#ffffff" }
                        : { color: "#333333" }
                    }
                  >
                    Tersisa {item.quota} kuota
                  </p>
                </div>
              </button>
              <div className="dropdown-divider"></div>
            </div>
          ))}
        </div>
      );
    }
  }

  function renderCustomField() {
    if (props.dataCustomField.data) {
      const { data } = props.dataCustomField;
      return (
        <div className="container">
          {data.map((item, index) => {
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

  async function handleSubmit() {
    await props.setSelectedDate(selectedDate.format);
    await props.setCustomField(customField);
    await history.push(`${location.pathname}/review`);
  }

  function setCustomField(value, index) {
    let custom_field = [];
    custom_field[index] = value;
    setValCustomField(custom_field);
  }

  function renderInputText(data, index) {
    return (
      <Form.Group controlId={data.field_name}>
        <Form.Label>{data.field_name}</Form.Label>
        <Form.Control
          type="text"
          placeholder={data.help_text}
          onChange={(event) => setCustomField(event.target.value, index)}
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
      <Header back title="Pilih Jadwal" profile={profile} />
      <Hero url={props.dataPromo.data} alt="Qiwii" />
      <div className="menu"></div>
      <section>{renderMerchant()}</section>
      <section>{renderCalendar()}</section>
      <section>{renderAntrian()}</section>
      <section>{renderSlotTime()}</section>
      <section>{renderCustomField()}</section>
      <div className="container my-5">
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
  dataCustomField: PropTypes.object,
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
  dataCustomField: state.dataCustomField,
  dataServiceDetail: state.dataServiceDetail,
  dataSlotTime: state.dataSlotTime,
  dataService: state.dataService,
  dataSlotTimes: state.dataSlotTimes,
  dataServiceSelected: state.dataServiceSelected,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

import React, { useEffect, useState } from "react";
import "./styles.css";
import Header from "../../components/Header";
import HeroSecond from "../../components/HeroSecond";
import PropTypes from "prop-types";
import { useRouteMatch, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { ActionCreators } from "../../redux/actions";
import launchImage from "../../assets/images/header-qiwii-launch.png";
import { Form, Button } from "react-bootstrap";

const Schedule = (props) => {
  const { url } = useRouteMatch();
  const { routeID } = useParams();

  const [selectedDate, setSelectedDate] = useState({});

  const parseUrl = typeof url == "string" ? url.substr(url.length - 7) : null;
  const organizationID = parseUrl.substring(0, 3);

  useEffect(() => {
    fetchDataCustomField();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

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
        format: formatDate,
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
                  onClick={() => {
                    setSelectedDate(item);
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

  return (
    <div>
      <Header back title="Pilih Jadwal" />
      <HeroSecond url={launchImage} alt="Qiwii" />
      <section>{renderMerchant()}</section>
      <section>{renderCalendar()}</section>
      <div className="container my-5">
        <Form>
          <Button variant="primary" type="submit">
            Lanjutkan
          </Button>
        </Form>
      </div>
    </div>
  );
};

Schedule.defaultProps = {
  fetchDataCustomField: () => {},
};

Schedule.propTypes = {
  dataCustomField: PropTypes.object,
  fetchDataCustomField: PropTypes.func,
};

const mapStateToProps = (state) => ({
  dataCustomField: state.dataCustomField,
  dataServiceSelected: state.dataServiceSelected,
});

const mapDispatchToProps = (dispatch) => {
  return bindActionCreators(ActionCreators, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(Schedule);

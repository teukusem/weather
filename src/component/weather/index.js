import React from "react";
import { Col, Row } from "antd";

function weatherPage(props) {
  const d = new Date();
  let date = d.getDate();
  let year = d.getFullYear();
  let month = d.toLocaleString("default", { month: "long" });
  let day = d.toLocaleString("default", { weekday: "long" });

  let time = d.toLocaleString([], {
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Row>
        <Col span={12}>
          <div className="container ms-4 mt-5 pt-5">
            <h5 className="text-light">{props.city}</h5>
            <span style={{ fontSize: "125px" }} className="text-light">
              {`${props.celcius}°`}
            </span>
            <p className="text-light">{`Min and Max temp : ${props.temp_min}°C (Min) | ${props.temp_max}°C (Max)`}</p>
            <div className="text-light d-flex">
              <i className={`fas ${props.icon} fa-3x`}></i>
              <h2 className="text-light ms-3">{props.weather}</h2>
            </div>
            <h5 className="text-light">{time}</h5>
            <h5 className="text-light">{`${day}, ${month} ${date} ${year}`}</h5>
          </div>
        </Col>
        <Col span={12}>
          <div className="wind-column ">
            <img src={props.image} height="150px" />
            <h5 className="text-light">{`${props.wind} m/s - ${props.windDirec}°`}</h5>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default weatherPage;

import React from "react";
import { Col, Row } from "antd";

function ForeCastList(props) {
  return (
    <>
      <Row style={{ marginBottom: "10px" }}>
        <Col span={12}>
          <div className="container text-light">
            <Row className=" ms-3">
              <Col span={12}>
                <i className={`fas ${props.icon} fa-3x`}></i>
              </Col>
              <Col span={12} className="fw-bold d-flex flex-column">
                <span style={{ fontSize: "10px" }}>{props.day}</span>
                <span>{props.weather}</span>
              </Col>
            </Row>
          </div>
        </Col>
        <Col span={12} style={{ display: "flex" }}>
          <div className="d-flex align-items-center ms-auto me-3">
            <span className="fw-bold text-light">{`${props.celcius}°C / ${props.celcius1}°C`}</span>
          </div>
        </Col>
      </Row>
    </>
  );
}

export default ForeCastList;

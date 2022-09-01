import React from "react";
import ForeCastList from "../forecast-list";
import { Col } from "antd";
import Logo from "../../assets/logo-weather.png";

function ForeCast(props) {
  const weatherList = (item) => {
    let emoji = null;
    const weather = item;

    if (weather == "Clouds") {
      emoji = "fa-cloud";
    } else if (weather == "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (weather == "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (weather == "Rain") {
      emoji = "fa-cloud-showers-heavy";
    } else if (weather == "Snow") {
      emoji = "fa-snowflakes";
    } else {
      emoji = "fa-smog";
    }

    return emoji;
  };

  const tempMax = (item) => {
    return (item - 273.15).toFixed(2);
  };

  const tempMin = (item) => {
    return (item - 273.15).toFixed(2);
  };

  return (
    <>
      <Col
        span={8}
        offset={1}
        style={{ backgroundColor: "#101C43", borderRadius: "20px" }}
      >
        <div className="d-flex">
          <img src={Logo} height="150px" />
          <h5 className="text-light d-flex align-items-center">
            Weather for the next few days :
          </h5>
        </div>
        {props.list.map((item, index) => {
          return (
            <ForeCastList
              key={index}
              icon={weatherList(item?.weather?.[0].main)}
              day={item.dt_txt}
              weather={item?.weather?.[0].main}
              celcius={tempMin(item?.main?.temp_min)}
              celcius1={tempMax(item?.main?.temp_max)}
            />
          );
        })}
      </Col>
    </>
  );
}

export default ForeCast;

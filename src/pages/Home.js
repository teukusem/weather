import React, { useState, useEffect } from "react";
import { Row, Col, Input } from "antd";
import { ForeCast, Weather } from "../component";
import Wind from "../assets/wind.png";
import axios from "axios";
import moment from "moment";

function Home() {
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [foreCast, setForeCast] = useState([]);
  const { Search } = Input;

  const onSearch = (value) => {
    setSearch(value);
  };

  const getInitialCoordinate = () => {
    navigator.geolocation.getCurrentPosition(async function (position) {
      const lat = position.coords.latitude;
      const log = position.coords.longitude;
      const res = await fetchDataByCoordinate(log, lat);
      setSearch(res.data.city.name);
      return setForeCast(res.data.list);
    });
  };

  useEffect(() => {
    getInitialCoordinate();
  }, []);

  useEffect(() => {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=8664937cae5cf21e68607b723864a4a0`;
    const fetchWeather = async () => {
      const response = await axios.get(url);
      setData(response.data);
      return response.data;
    };
    if (search) fetchWeather();
  }, [search]);

  const fetchDataByCoordinate = async (long, lat) => {
    const url = `http://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&appid=8664937cae5cf21e68607b723864a4a0`;
    const response = await axios.get(url, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response;
  };

  useEffect(() => {
    if (data.coord) {
      const forecast = async () => {
        const res = fetchDataByCoordinate(data?.coord?.lon, data?.coord?.lat);
        setForeCast(res.data.list);
        return res?.data?.list;
      };
      forecast();
    }
  }, [data?.coord]);

  let emoji = null;
  const weatherList = data?.weather?.[0].main;
  if (typeof data?.main != "undefined") {
    if (weatherList == "Clouds") {
      emoji = "fa-cloud";
    } else if (weatherList == "Thunderstorm") {
      emoji = "fa-bolt";
    } else if (weatherList == "Drizzle") {
      emoji = "fa-cloud-rain";
    } else if (weatherList == "Rain") {
      emoji = "fa-cloud-showers-heavy";
    } else if (weatherList == "Snow") {
      emoji = "fa-snowflakes";
    } else {
      emoji = "fa-smog";
    }
  } else {
    return <div>... Loading</div>;
  }

  const filterTime = () => {
    const convertTime = foreCast.map((item) => {
      return {
        ...item,
        dt_txt: moment(item.dt_txt).format("dddd"),
      };
    });

    const filteredArr = convertTime.reduce((acc, current) => {
      const x = acc.find((item) => item.dt_txt === current.dt_txt);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);

    return filteredArr;
  };

  const temperatur = (data?.main?.temp - 273.15).toFixed(2);
  const tempMax = (data?.main?.temp_max - 273.15).toFixed(2);
  const tempMin = (data?.main?.temp_min - 273.15).toFixed(2);

  const windDirec = (degree) => {
    if (degree > 337.5) return "Northerly";
    if (degree > 292.5) return "North Westerly";
    if (degree > 247.5) return "Westerly";
    if (degree > 202.5) return "South Westerly";
    if (degree > 157.5) return "Southerly";
    if (degree > 122.5) return "South Easterly";
    if (degree > 67.5) return "Easterly";
    if (degree > 22.5) {
      return "North Easterly";
    }
    return "Northerly";
  };

  const speedWind = (speed) => {
    return Math.ceil(Math.cbrt(Math.pow(speed / 0.836, 2)));
  };

  return (
    <div className="container">
      <Row style={{ height: "90vh", marginTop: "25px" }}>
        <Col
          span={15}
          style={{ backgroundColor: "#101C43", borderRadius: "20px" }}
        >
          <div className="d-flex justify-content-end mt-3 me-3">
            <Search
              placeholder="Search place"
              onSearch={onSearch}
              style={{
                width: 200,
              }}
            />
          </div>
          <Weather
            image={Wind}
            weather={data?.weather?.[0].main}
            city={`${data?.name}`}
            celcius={temperatur}
            windDirec={windDirec(data?.wind?.deg)}
            wind={speedWind(data?.wind?.speed)}
            temp_min={tempMin}
            temp_max={tempMax}
            icon={emoji}
          />
        </Col>

        <ForeCast list={filterTime()} />
      </Row>
    </div>
  );
}

export default Home;

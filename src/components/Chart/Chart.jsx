import React, { useState, useEffect } from "react";
import { Line, Bar } from "react-chartjs-2";

import { fetchDailyData } from "../../api";

const Chart = ({ data: { confirmed, deaths, recovered }, country }) => {
  // use Hooks
  const [dailyData, setDailyData] = useState([]); //[state, setState] = useState(initial state)

  useEffect(() => {
    //async action
    const fetchAPI = async () => {
      setDailyData(await fetchDailyData());
    };

    //console.log(dailyData);

    fetchAPI();
  }, []); //},[dependencies]);

  const lineChart = dailyData.length ? (
    <Line
      data={{
        labels: dailyData.map(({ date }) => date),
        datasets: [
          {
            data: dailyData.map(({ confirmed }) => confirmed),
            label: "Confirmed",
            borderColor: "blue",
            fill: true,
          },
          {
            data: dailyData.map(({ deaths }) => deaths),
            label: "Deaths",
            borderColor: "red",
            fill: true,
          },
        ],
      }}
    />
  ) : null;

  //console.log(confirmed, recovered, deaths);

  const barChart = confirmed ? (
    <Bar
      data={{
        labels: ["Confirmed", "Recovered", "Deaths"],
        datasets: [
          {
            label: "People",
            backgroundColor: [
              "rgba(0,0,255,0.5)",
              "rgba(0,255,0,0.5)",
              "rgba(255,0,0,0.5)",
            ],
            data: [confirmed.value, recovered.value, deaths.value],
          },
        ],
      }}
      options={{
        legend: { display: false },
        title: { display: true, text: `Current situation in ${country}` },
      }}
    />
  ) : null;

  return <div className="container">{country ? barChart : lineChart}</div>;
};

export default Chart;

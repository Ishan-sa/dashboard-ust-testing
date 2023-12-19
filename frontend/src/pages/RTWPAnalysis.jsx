import { Line, Bar, getDatasetAtEvent } from "react-chartjs-2";
import { useRef, useEffect, useState } from "react";
import { Chart, registerables } from "chart.js";

Chart.register(...registerables);

export default function RTWPAnalysis() {
  const [opexData, setOpexData] = useState([]);
  const [capexData, setCapexData] = useState([]);

  const chartRef = useRef();
  const onClick = (event) => {
    console.log(getDatasetAtEvent(chartRef.current, event));
  };

  const url = "http://localhost:8888/tmo-main";
  const options = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  };

  const fetchDataFromAPI = async () => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data", data.xPEX);

    // filter data by xPEX values, if xPEX === opex, then push to opexData, else push to capexData
    const opexData = data.filter((item) => item.xPEX === "OPEX");
    const capexData = data.filter((item) => item.xPEX === "CAPEX");

    console.log("opexData", opexData.xPEX);
    console.log("capexData", capexData.xPEX);

    setOpexData(opexData);
    setCapexData(capexData);
  };

  useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const data = {
    labels: ["Jun", "Jul", "Aug"],
    datasets: [
      {
        label: "CAPEX - Site Count",
        data: [5, 6, 7],
      },
      {
        label: "OPEX - Site Count",
        data: [3, 2, 1],
      },
    ],
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      <h1>RTWP Analysis by Week</h1>
      <div>
        <Line
          datasetIdKey="id"
          data={{
            labels: ["Jun", "Jul", "Aug"],
            datasets: [
              {
                id: 1,
                label: "",
                data: [5, 6, 7],
              },
              {
                id: 2,
                label: "",
                data: [3, 2, 1],
              },
            ],
          }}
        />
        <Bar ref={chartRef} data={data} onClick={onClick} />
      </div>
    </div>
  );
}

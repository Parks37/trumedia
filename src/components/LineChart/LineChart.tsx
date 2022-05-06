import React from "react";
import styled from "styled-components";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

import { hexToRGBA } from "@wedgekit/color";

import { Dataset, Season } from "../../types";
import { getLabels } from "./utils";
import { ChartPanel } from "../ChartPanel";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ChartWrapper = styled.div`
  background: ${hexToRGBA("#e7e7f7", 1)};
  padding: 10px;
  border-radius: 5px;
  grid-area: LineChart;
`;

const LineChart = ({ seasons }: { seasons: Season[] }) => {
  const [datasets, setDatasets] = React.useState<Dataset[]>([]);
  const [title, setTitle] = React.useState("");

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: title,
      },
    },
    maintainAspectRatio: false,
  };

  const data = {
    labels: getLabels(seasons),
    datasets,
  };

  return (
    <>
      <ChartWrapper>
        <Line data={data} options={options} />
      </ChartWrapper>
      <ChartPanel
        seasons={seasons}
        datasets={datasets}
        setDatasets={setDatasets}
        setTitle={setTitle}
      />
    </>
  );
};

export default LineChart;

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

import { Dataset, Season } from "../../../types";
import { getLabels } from "./utils";

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

const LineChart = ({
  datasets,
  seasons,
  title,
}: {
  datasets: Dataset[];
  seasons: Season[];
  title: string;
}) => {
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
    </>
  );
};

export default LineChart;

import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

import styled from "styled-components";

import { hexToRGBA } from "@wedgekit/color";
import { Dataset } from "../../../../types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ChartWrapper = styled.div`
  background: ${hexToRGBA("#e7e7f7", 1)};
  border-radius: 5px;
  flex: 1;
`;

const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top" as const,
    },
    title: {
      display: false,
      text: "Chart.js Bar Chart",
    },
  },
};

export default ({
  labels,
  datasets,
}: {
  labels: string[];
  datasets: Dataset[];
}) => {
  const data = {
    labels,
    datasets,
  };
  return (
    <ChartWrapper>
      <Bar options={options} data={data} />;
    </ChartWrapper>
  );
};

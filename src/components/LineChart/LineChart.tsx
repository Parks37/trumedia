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
import { Bar } from "react-chartjs-2";

import { hexToRGBA } from "@wedgekit/color";

import { Season } from "../../types";
import { getLabels } from "./utils";
import { ChartPanel } from "../ChartPanel";

export type DataPoint = {
  x: string;
  y: number;
};

export type Dataset = {
  label: string;
  data: DataPoint[];
  backgroundColor: string;
  borderColor: string;
};

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

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: false,
        text: "Chart.js Line Chart",
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
        <Bar data={data} options={options} />
      </ChartWrapper>
      <ChartPanel seasons={seasons} setDatasets={setDatasets} />
    </>
  );
};

export default LineChart;

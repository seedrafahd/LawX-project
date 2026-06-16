import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

const MONTHS = [
  "JAN",
  "FEB",
  "MAR",
  "APR",
  "MAY",
  "JUN",
  "JUL",
  "AUG",
  "SEP",
  "OCT",
  "NOV",
  "DEC",
];

export default function FinanceChart({ monthlyData }) {
  const data = {
    labels: MONTHS,
    datasets: [
      {
        label: "المدفوعات",
        data: monthlyData || Array(12).fill(0),
        backgroundColor: "#4F46E5",
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        ticks: {
          autoSkip: true,
          maxTicksLimit: 12,
        },
      },
    },
  };

  return <Bar data={data} options={options} />;
}

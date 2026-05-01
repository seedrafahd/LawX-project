import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(BarElement, CategoryScale, LinearScale);

export default function FinanceChart() {
  const data = {
    labels: ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"],
    datasets: [
      { label: "دخل", data: [30, 60, 40, 70, 50, 80] },
      { label: "مصروف", data: [20, 40, 30, 60, 40, 70] },
    ],
  };

  return (
    <div className=" flex justify-center bg-white p-4">
      <Bar className="w-full" data={data} />
    </div>
  );
}

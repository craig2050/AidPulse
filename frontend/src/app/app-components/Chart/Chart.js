import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { resourceRequestLabel } from "../../../chartjs/chartData/resourseRequest";

Chart.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Chart.js Bar Chart",
    },
  },
};

const resourceRequestKeys = Object.keys(resourceRequestLabel);
const resourceRequestValues = Object.values(resourceRequestLabel);

const labels = resourceRequestKeys

export const data = {
  labels,
  datasets: [
    {
      label: "Resource Category",
      data: resourceRequestValues,
      backgroundColor: "rgba(255, 99, 132, 0.5)",
    }
  ],
};

const ChartJS = () => {
    return <Bar options={options} data={data} />
//   return <>Chart</>;
};

export default ChartJS;

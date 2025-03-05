import {
  Chart,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler,
} from "chart.js";
import { Bar, Pie, Line, Doughnut, PolarArea, Radar } from "react-chartjs-2";
import { resourceRequestLabel } from "../../../chartjs/chartData/resourseRequest";
import { 
  getDisasterTypeDistribution,
  getHouseholdComposition,
  getUtilityOutages,
  getMedicalAssistanceNeeds,
  getTemporaryShelterStatus,
  getGenderDistribution
} from "../../../chartjs/chartData/disasterReliefData";

// Register ChartJS components
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  PointElement,
  LineElement,
  RadialLinearScale,
  Title,
  Tooltip,
  Legend,
  Filler
);

// Chart color palette
const colorPalette = {
  primary: [
    'rgba(66, 133, 244, 0.8)',
    'rgba(219, 68, 55, 0.8)',
    'rgba(244, 180, 0, 0.8)',
    'rgba(15, 157, 88, 0.8)',
    'rgba(171, 71, 188, 0.8)',
    'rgba(0, 172, 193, 0.8)',
    'rgba(255, 112, 67, 0.8)',
    'rgba(158, 157, 36, 0.8)',
  ],
  secondary: [
    'rgba(66, 133, 244, 0.5)',
    'rgba(219, 68, 55, 0.5)',
    'rgba(244, 180, 0, 0.5)',
    'rgba(15, 157, 88, 0.5)',
    'rgba(171, 71, 188, 0.5)',
    'rgba(0, 172, 193, 0.5)',
    'rgba(255, 112, 67, 0.5)',
    'rgba(158, 157, 36, 0.5)',
  ],
};

// Default options
export const defaultOptions = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Disaster Relief Data",
      font: {
        size: 16,
        weight: 'bold',
      },
      padding: 20,
    },
  },
};

// Resource Request Chart
const getResourceRequestData = () => {
  const resourceRequestKeys = Object.keys(resourceRequestLabel);
  const resourceRequestValues = Object.values(resourceRequestLabel);

  return {
    labels: resourceRequestKeys,
    datasets: [
      {
        label: "Resource Category",
        data: resourceRequestValues,
        backgroundColor: colorPalette.primary,
        borderWidth: 1,
      }
    ],
  };
};

// Disaster Type Distribution Chart
const getDisasterTypeData = () => {
  const disasterTypeCounts = getDisasterTypeDistribution();
  const labels = Object.keys(disasterTypeCounts);
  const data = Object.values(disasterTypeCounts);

  return {
    labels,
    datasets: [
      {
        label: "Disaster Type Distribution",
        data,
        backgroundColor: colorPalette.primary,
        borderWidth: 1,
      }
    ],
  };
};

// Household Composition Chart
const getHouseholdCompositionData = () => {
  const householdData = getHouseholdComposition();
  
  return {
    labels: Object.keys(householdData),
    datasets: [
      {
        label: "Average per Household",
        data: Object.values(householdData),
        backgroundColor: colorPalette.primary,
        borderWidth: 1,
      }
    ],
  };
};

// Utility Outages Chart
const getUtilityOutagesData = () => {
  const utilityCounts = getUtilityOutages();
  
  return {
    labels: Object.keys(utilityCounts),
    datasets: [
      {
        label: "Utility Outages",
        data: Object.values(utilityCounts),
        backgroundColor: colorPalette.primary,
        borderWidth: 1,
      }
    ],
  };
};

// Medical Assistance Chart
const getMedicalAssistanceData = () => {
  const medicalData = getMedicalAssistanceNeeds();
  
  return {
    labels: Object.keys(medicalData),
    datasets: [
      {
        label: "Medical Assistance Needs",
        data: Object.values(medicalData),
        backgroundColor: colorPalette.primary,
        borderWidth: 1,
      }
    ],
  };
};

// Shelter Status Chart
const getShelterStatusData = () => {
  const shelterData = getTemporaryShelterStatus();
  
  return {
    labels: Object.keys(shelterData),
    datasets: [
      {
        label: "Shelter Status",
        data: Object.values(shelterData),
        backgroundColor: colorPalette.primary,
        borderWidth: 1,
      }
    ],
  };
};

// Gender Distribution Chart
const getGenderData = () => {
  const genderData = getGenderDistribution();
  
  return {
    labels: Object.keys(genderData),
    datasets: [
      {
        label: "Gender Distribution",
        data: Object.values(genderData),
        backgroundColor: colorPalette.primary,
        borderWidth: 1,
      }
    ],
  };
};

// Chart component that accepts chart type as prop
const ChartJS = ({ 
  chartType = "resource", 
  height = "300px",
  options = {} 
}) => {
  // Combine default options with custom options
  const chartOptions = {
    ...defaultOptions,
    ...options,
  };

  // Get chart data based on type
  let chartData;
  let ChartComponent;

  switch (chartType) {
    case "resource":
      chartData = getResourceRequestData();
      ChartComponent = Bar;
      chartOptions.plugins.title.text = "Resource Requests";
      break;
    case "disaster":
      chartData = getDisasterTypeData();
      ChartComponent = Pie;
      chartOptions.plugins.title.text = "Disaster Type Distribution";
      break;
    case "household":
      chartData = getHouseholdCompositionData();
      ChartComponent = Bar;
      chartOptions.plugins.title.text = "Average Household Composition";
      // Set specific options for the bar chart
      chartOptions.scales = {
        y: {
          beginAtZero: true,
          title: {
            display: true,
            text: 'Average Number per Household'
          }
        },
        x: {
          title: {
            display: true,
            text: 'Household Member Type'
          }
        }
      };
      break;
    case "utility":
      chartData = getUtilityOutagesData();
      ChartComponent = Doughnut;
      chartOptions.plugins.title.text = "Utility Outages";
      break;
    case "medical":
      chartData = getMedicalAssistanceData();
      ChartComponent = PolarArea;
      chartOptions.plugins.title.text = "Medical Assistance Needs";
      break;
    case "shelter":
      chartData = getShelterStatusData();
      ChartComponent = Pie;
      chartOptions.plugins.title.text = "Temporary Shelter Status";
      break;
    case "gender":
      chartData = getGenderData();
      ChartComponent = Doughnut;
      chartOptions.plugins.title.text = "Gender Distribution";
      break;
    default:
      chartData = getResourceRequestData();
      ChartComponent = Bar;
      chartOptions.plugins.title.text = "Resource Requests";
  }

  return (
    <div style={{ height, width: "100%" }}>
      <ChartComponent options={chartOptions} data={chartData} />
    </div>
  );
};

export default ChartJS;

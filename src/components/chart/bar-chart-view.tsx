import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface Feedback {
  category: string;
  createdAt: string;
  email: string;
  feedbackDetails: string;
  name: string;
  priority: string;
  subject: string;
  updatedAt: string;
}

interface FeedbackBarChartProps {
  feedbackData: Feedback[];
}

const FeedbackBarChart: React.FC<FeedbackBarChartProps> = ({
  feedbackData,
}) => {
  const categories = feedbackData.map((item) => item.category);
  const categoryCounts = categories.reduce<Record<string, number>>(
    (acc, category) => {
      acc[category] = (acc[category] || 0) + 1;
      return acc;
    },
    {}
  );

  const chartData = {
    labels: Object.keys(categoryCounts),
    datasets: [
      {
        label: "Categories",
        data: Object.values(categoryCounts),
        backgroundColor: "rgba(75, 192, 192, 0.6)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: "top" as const,
      },
    },
  };

  return <Bar data={chartData} options={options} />;
};

export default FeedbackBarChart;

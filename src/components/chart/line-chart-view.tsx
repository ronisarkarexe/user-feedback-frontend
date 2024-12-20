import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
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

interface FeedbackLineChartProps {
  feedbackData: Feedback[];
}

const FeedbackLineChart: React.FC<FeedbackLineChartProps> = ({
  feedbackData,
}) => {
  const categories = Array.from(
    new Set(feedbackData.map((item) => item.category))
  );
  const priorities = Array.from(
    new Set(feedbackData.map((item) => item.priority))
  );

  const datasets = priorities.map((priority) => {
    const priorityData = categories.map((category) => {
      return feedbackData.filter(
        (item) => item.category === category && item.priority === priority
      ).length;
    });

    const colors: Record<string, string> = {
      High: "rgba(255, 99, 132, 1)",
      Medium: "rgba(54, 162, 235, 1)",
      Low: "rgba(153, 102, 255, 1)",
    };

    return {
      label: priority,
      data: priorityData,
      borderColor: colors[priority] || "rgba(201, 203, 207, 1)",
      backgroundColor: `${colors[priority] || "rgba(201, 203, 207, 1)"}33`,
      tension: 0.3,
      fill: false,
    };
  });

  const chartData = {
    labels: categories,
    datasets,
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
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return <Line data={chartData} options={options} />;
};

export default FeedbackLineChart;

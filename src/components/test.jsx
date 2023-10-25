import React from "react";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
  const data = {
    labels: ["Day 1", "Day 2", "Day 3", "Day 4", "Day 5", "Day 6", "Day 7"],
    datasets: [
      {
        label: "Sales",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        data: [50, 30, 45, 60, 75, 90, 80], // Replace with your sales data for the last 7 days
      },
      {
        label: "Revenue",
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        data: [500, 300, 450, 600, 750, 900, 800], // Replace with your revenue data for the last 7 days
      },
    ],
  };

  const options = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h2>Sales and Revenue for the Last Seven Days</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

import React from 'react';
import { Bar } from 'react-chartjs-2';
import { BarElement, CategoryScale, Chart as ChartJS, Legend, LinearScale, Title, Tooltip } from "chart.js";
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

const BarChart = () => {
  // Sample data for the bar chart
  const options = {
    responsive: true,
    plugins: {
      legend: {
        display: true,
        position: "chartArea",
      },
      title: {
        display: true,
        text: "Performance Chart",
      },
    },
    scales: {
        y: {
          display: false, // Remove y-axis labels
        },
      },
  };

  const data = {
    labels: ["Day", "Week", "Month", "Year"],
    datasets: [
      {
        label: "Current",
        data: [20, 30, 40, 50],
        backgroundColor: "#6179cc",
      },
      {
        label: 'Previous',
        data: [15, 20, 25, 40],
        backgroundColor: '#111a37',
      },
    ],
  };

  // Add the datalabels plugin configuration
  options.plugins.datalabels = {
    display: true,
    color: "black",
    formatter: Math.round,
    anchor: "end",
    offset: -20,
    align: "start",
  };

  return (
    <div>
      <h2>Bar Chart Example</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChart;

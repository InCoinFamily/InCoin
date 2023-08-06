import { Line, Bar } from 'react-chartjs-2';
import 'chartjs-plugin-zoom';
import 'chart.js/auto';
import './Charts.scss';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

function LineCharts({ amount, income, created, lineData, lineChart }) {
  ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
  const data = {
    labels: created,
    datasets: [
      {
        data: lineData,
        fill: false,
        borderColor: '#797B9B',
        borderWidth: 5,
        tension: 0.5,
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
    ],
  };
  const differrenceData = {
    labels: created,
    datasets: [
      {
        data: amount,
        fill: false,
        borderColor: 'blue',
        tension: 1,
        backgroundColor: 'rgba(255,111,111,0.5)',
      },
      {
        data: income,
        fill: false,
        borderColor: 'red',
        tension: 0.6,
        backgroundColor: 'rgba(111,221,142,0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    labels: false,
    maintainAspectRatio: false,
    scales: {
      y: {
        grid:{
          display: false}, // false to disable Y grid
      },
    },
    elements: {
      point: {
        radius: 10, // change point radius
        pointBackgroundColor: "transparent",
        pointBorderColor: "transparent",
        hoverRadius: 8,
        borderWidth: 0,
        hoverBorderWidth: 3,
        pointHoverBorderColor: 'rgb(0,0,0)',
      },
    },
    plugins: {
      title: {
        display: false,
      },
      legend: {
        display: false,
      },
      zoom: {
        pan: {
          enabled: true,
          mode: 'x',
        },
        zoom: {
          wheel: {
            enabled: true,
          },
          mode: 'x',
        },
      },
      tooltip: {
        bodySpacing: 15,
        bodyFontSize: 20,
        enabled: true,
        callbacks: {
          label: (context) => {
            const { dataIndex } = context;
            const incomeValue = income[dataIndex];
            const amountValue = amount[dataIndex];
            return [`Доход: ${incomeValue}`, `Расход: ${amountValue}`];
          },
          title: () => null,
        },
        multiKeyBackground: () => 'rgba(255, 255, 255, 0.8)', 
      },
    },
  };

  return (
    <div className="chart">
      {lineChart ? (
        <Line data={data} options={options} plugins={['zoom']} />
      ) : (
        <Bar data={differrenceData} options={options} />
      )}
    </div>
  );
}
export default LineCharts;

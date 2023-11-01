import React, { useEffect, useRef } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { Chart } from 'chart.js';
import dayjs from 'dayjs';

function StockDetail() {
  const chartRef = useRef(null);
  const { ticker } = useParams();

  useEffect(() => {
    axios.get(`http://localhost:5000/stock/${ticker}`)
      .then((response) => {
        const stockData = response.data;

        const labels = Object.keys(stockData).map((timestamp) => dayjs(Number(timestamp)).toDate());
        const openData = Object.values(stockData).map((data) => data.Open);
        const closeData = Object.values(stockData).map((data) => data.Close);

        const ctx = chartRef.current.getContext('2d');

        new Chart(ctx, {
          type: 'line',
          data: {
            labels: labels,
            datasets: [
              {
                label: 'Open',
                data: openData,
                borderColor: 'rgb(75, 192, 192)',
                tension: 0.1,
                fill: false
              },
              {
                label: 'Close',
                data: closeData,
                borderColor: 'rgb(255, 99, 132)',
                tension: 0.1,
                fill: false
              },
              // Add more datasets as needed
            ]
          },
          options: {
            responsive: true,
            plugins: {
              title: {
                display: true,
                text: ticker
              },
              tooltip: {
                mode: 'index',
                intersect: false
              },
              legend: {
                display: true
              }
            },
            interaction: {
              intersect: false
            },
            scales: {
              x: {
                type: 'time',
                display: true
              },
              y: {
                display: true
              }
            }
          }
        });
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, [ticker]);

  return (
    <div>
      <canvas ref={chartRef}></canvas>
    </div>
  );
}

export default StockDetail;

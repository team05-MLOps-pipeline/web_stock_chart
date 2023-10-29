// App.js
import React, { useEffect, useState } from 'react';
import Plot from 'react-plotly.js';
import axios from 'axios';

function StockChart({ ticker }) {
  const [dates, setDates] = useState([]);
  const [closingPrices, setClosingPrices] = useState([]);

  useEffect(() => {
    axios.get(`http://localhost:5000/stock/${ticker}`)
      .then((response) => {
        console.log(response.data);  // 가져온 데이터를 콘솔에 출력
        const data = response.data;
        setDates(Object.keys(data).map(date => new Date(parseInt(date))));
        setClosingPrices(Object.values(data).map(item => item.Close));
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, [ticker]);
  
  return (
    <Plot
      data={[
        {
          x: dates,
          y: closingPrices,
          type: 'scatter',
          mode: 'lines+markers',
          marker: { color: 'red' },
        },
      ]}
      layout={{ width: 720, height: 440, title: `${ticker} Stock` }}
    />
  );
}

export default function App() {
  return <StockChart ticker="AAPL" />;
}
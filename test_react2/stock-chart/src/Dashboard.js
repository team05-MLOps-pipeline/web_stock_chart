import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [tickers, setTickers] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/tickers')
      .then((response) => {
        setTickers(response.data);
      })
      .catch((error) => {
        console.error(`Error fetching data: ${error}`);
      });
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      <ul>
        {tickers.map((ticker) => (
          <li key={ticker}>
            <Link to={`/stock/${ticker}`}>{ticker}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;

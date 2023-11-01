import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Dashboard from './Dashboard';
import StockDetail from './StockDetail';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/stock/:ticker" element={<StockDetail />} />
        <Route path="/" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;

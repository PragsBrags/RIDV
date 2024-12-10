import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './HomePage';
import TablePage from './TablePage';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/table/:personId" element={<TablePage />} />
      </Routes>
    </Router>
  );
}

export default App;

import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import PropTypes from 'prop-types';
import './HomePage.css';

const DepartmentPublicationsPieChart = ({ selectedSchool }) => {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!selectedSchool) return;

    const fetchData = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await fetch(
          `http://localhost:8002/school/depart/count?school=${encodeURIComponent(selectedSchool)}`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        if (data.error) {
          throw new Error(data.error);
        }

        const totalPapers = data.reduce((sum, item) => sum + (item.paper_amt || 0), 0);
        const formattedData = data.map((item) => ({
          name: item.Dept || 'Unknown Department',
          papers: item.paper_amt || 0,
          percentage: ((item.paper_amt || 0) / totalPapers) * 100
        }));

        setChartData(formattedData);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedSchool]);

  const COLORS = [
    '#6a4c93', // Purple
    '#1982c4', // Blue
    '#8ac926', // Green
    '#ff924c', // Orange
    '#9d4edd', // Violet
    '#3a86ff', // Sky Blue
    '#333333', // Dark Gray
  ];

  return (
    <div className="chart-container">
      <h2 className="chart-title">Department Publications</h2>
      {loading && <p>Loading...</p>}
      {error && <p className="error-message">Error: {error}</p>}
      {!loading && !error && chartData.length > 0 && (
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              outerRadius={130}
              dataKey="papers"
              stroke="none"
              nameKey="name"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: '#3a86ff',
                color: '#ffffff',
                borderRadius: '8px',
                padding: '10px',
              }}
              formatter={(value, name, props) => [
                `${props.payload.percentage.toFixed(2)}%`,
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      )}
      {!loading && !error && chartData.length === 0 && <p>No data available</p>}
    </div>
  );
};

DepartmentPublicationsPieChart.propTypes = {
  selectedSchool: PropTypes.string.isRequired,
};

export default DepartmentPublicationsPieChart;

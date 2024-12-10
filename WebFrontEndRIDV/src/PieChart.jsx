import React, { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';
import './HomePage.css';

const DepartmentPublicationsPieChart = () => {
  const [chartData, setChartData] = useState([]);
  
  // Fetch paper_amt and scholar_id data from the backend
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8002/count');
        const data = await response.json();

        if (data.error) {
          console.error('Error fetching data:', data.error);
        } else {
          // Map the data to labels and paper counts
          const formattedData = data.map(item => ({
            dept: ` ${item.department}`,
            papers: item.paper_amt,
          }));

          setChartData(formattedData);
        }
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  // Sort departments by number of papers in descending order
  const sortedData = [...chartData].sort((a, b) => b.papers - a.papers);

  // Minimalist color palette
  const COLORS = [
    '#6a4c93',   // Deep purple
    '#1982c4',   // Muted blue
    '#8ac926',   // Soft green
    '#ff924c',   // Muted orange
    '#9d4edd',   // Neon purple
    '#3a86ff',   // Bright blue
    '#333333'    // Dark gray
  ];

  const total = sortedData.reduce((sum, dept) => sum + dept.papers, 0);

  const renderCustomizedLabel = ({ percent }) => {
    return `${(percent * 100).toFixed(1)}%`;
  };

  return (
    <div className="chart-container">
      <h2 className="chart-title">Department Publications</h2>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              data={sortedData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={renderCustomizedLabel}
              outerRadius={130}
              dataKey="papers"
              stroke="none"
            >
              {sortedData.map((entry, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]} 
                  style={{ transition: 'all 0.3s ease' }}
                />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ 
                backgroundColor: '#333333', 
                color: '#ffffff',
                border: 'none',
                borderRadius: '8px',
                padding: '10px'
              }}
              formatter={(value, name) => [
                `${value} papers (${((value / total) * 100).toFixed(1)}%)`, 
                name
              ]}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="legend-grid">
        {sortedData.map((dept, index) => (
          <div key={dept.dept} className="legend-item">
            <div 
              className="legend-color-dot"
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="legend-text">
              {dept.dept}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DepartmentPublicationsPieChart;

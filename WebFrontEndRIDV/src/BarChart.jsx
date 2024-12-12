import React, { useState, useEffect } from "react";
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer } from "recharts";
import './HomePage.css';

const SchoolBarGraphData = ({ selectedSchool }) => {
  const [facultyPapers, setFacultyPapers] = useState([]);

  useEffect(() => {
    if (!selectedSchool) return;

    const fetchData = async () => {
      try {
        const response = await fetch(`http://localhost:8002/school/depart/count?school=${selectedSchool}`);
        const data = await response.json();

        if (data.error) {
          console.error("Error fetching data:", data.error);
        } else {
          const formattedData = data.map(item => ({
            name: item.Dept,     // Department name
            papers: item.paper_amt  // Paper count
          }));
          setFacultyPapers(formattedData);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [selectedSchool]);


  if (facultyPapers.length === 0) {
    return (
      <div className="chart-container">
        <h3 className="chart-title">No data available</h3>
      </div>
    );
  }

  return (
    <div className="chart-container">
      <h3 className="chart-title">Research Papers Published by Department</h3>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          layout="vertical"
          data={facultyPapers}
          margin={{ left: 40, right: 20, top: 20, bottom: 50 }}
          barCategoryGap="20%"
        >
          {/* X Axis */}
          <XAxis type="number" dataKey="papers" hide={true} />
          
          {/* Y Axis - Department Names */}
          <YAxis
            type="category"
            dataKey="name"
            width={250}
            axisLine={{ stroke: '#b185db' }}
            tickLine={{ stroke: '#b185db' }}
          />
          
          {/* Tooltip for additional information */}
          <Tooltip
            contentStyle={{
              backgroundColor: '#1a1a1a',
              color: '#ffffff',
              border: '1px solid #b185db'
            }}
            labelStyle={{ color: '#b185db' }}
          />
          
          {/* Bar for displaying papers count */}
          <Bar
            dataKey="papers"
            fill="#b185db"
            barSize={30}
            radius={[0, 15, 15, 0]}
          >
            {/* Label showing paper amount */}
            <LabelList
              dataKey="papers"
              position="center"
              fill="#ffffff"
              style={{ fontWeight: 'bold' }}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SchoolBarGraphData;

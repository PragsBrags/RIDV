import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import './HomePage.css';
import DepartmentPublicationsPieChart from './PieChart';
import Hindex from './hindexdata';

const HomePage = () => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');

  const schoolDepartments = {
    'School of Engineering': [
      'Computer Science and Engineering',
      'Civil Engineering',
      'Mechanical Engineering',
      'Electrical Engineering',
      'Chemical Engineering',
      'Environmental Engineering',
      'Architecture'
    ],
    'School of Science': [
      'Physics',
      'Chemistry',
      'Mathematics',
      'Environmental Science',
      'Biotechnology',
      'Bioinformatics',

    ],
    'School of Management': [
      'Business Administration',
      'Economics',
      'Marketing'
    ],
    'School of Medical Sciences': [
      'Medicine',
      'Pharmacy',
      'Public Health'
    ],
    'School of Education': [
      'Leadership and Management',
      'Language Education',
      'Media Studies',
      'Buddhist Studies'
    ]
  };

  const facultyMembers = {
    'Computer Science and Engineering': [
      'Mr. Manoj Shakya',
      'Dr. Gajendra Sharma',
      'Mr. Sushil Shrestha',
      'Dr. Bal Krishna Bal',
      'Mr. Amrit Dahal',
      'Dr. Rabindra Bista'
    ],
    'Physics': [
      'Dr. Richard Feynman',
      'Dr. Marie Curie',
      'Prof. Neil Bohr'
    ],
  };

  const facts = [
    "Fact 1: Kathmandu University was established in 1991.",
    "Fact 2: The university offers over 100 programs.",
    "Fact 3: It has a strong focus on research and innovation.",
    "Fact 4: KU has partnerships with over 50 international universities."
  ];

  const [currentFactIndex, setCurrentFactIndex] = useState(0);
  const [key, setKey] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFactIndex((prevIndex) => (prevIndex + 1) % facts.length);
      setKey(prev => prev + 1);
    }, 5000);

    return () => clearInterval(interval);
  }, [facts.length]);

  const handleSchoolChange = (e) => {
    const school = e.target.value;
    setSelectedSchool(school);
    setSelectedDepartment('');
    setSelectedFaculty('');  // Reset faculty when school changes
  };

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    setSelectedFaculty('');  // Reset faculty when department changes
  };

  const facultyData = [
    { name: 'Mr. Manoj Shakya', papers: 10 },
    { name: 'Dr. Gajendra Sharma', papers: 15 },
    { name: 'Mr. Sushil Shrestha', papers: 8 },
    { name: 'Dr. Bal Krishna Bal', papers: 12 },
    { name: 'Mr. Amrit Dahal', papers: 5 },
    { name: 'Dr. Rabindra Bista', papers: 20 }
  ];



  const maxPapers = Math.max(...facultyData.map(f => f.papers));
  const scaleFactor = 30; // Adjust this value to control the maximum width of bars

  return (
    <div className="home-container">
      <Helmet>
        <title>Research Impact Data Visualiser</title>
        <meta name="description" content="Exploring scholarly impact of Kathmandu University faculty members" />
      </Helmet>
      <header className="header">
        <nav className="navbar">
          <div className="title-card">
            RIDV
          </div>
          <div className="dropdown">
            <select 
              value={selectedSchool}
              onChange={handleSchoolChange}
            >
              <option value="">Select School</option>
              {Object.keys(schoolDepartments).map((school, index) => (
                <option key={index} value={school}>{school}</option>
              ))}
            </select>
          </div>

          <div className="dropdown">
            <select 
              value={selectedDepartment}
              onChange={handleDepartmentChange}
              disabled={!selectedSchool}
            >
              <option value="">Select Department</option>
              {selectedSchool && schoolDepartments[selectedSchool].map((dept, index) => (
                <option key={index} value={dept}>{dept}</option>
              ))}
            </select>
          </div>

          <div className="dropdown">
            <select
              value={selectedFaculty}
              onChange={(e) => setSelectedFaculty(e.target.value)}
              disabled={!selectedDepartment}
            >
              <option value="">Select Faculty Member</option>
              {selectedDepartment && facultyMembers[selectedDepartment]?.map((faculty, index) => (
                <option key={index} value={faculty}>{faculty}</option>
              ))}
            </select>
          </div>

          <div className="search-bar">
            <input type="search" placeholder="Search..."/>
          </div>

          <div className="reset-button">
            <button>Reset</button>
          </div>
        </nav>
      </header>

      <div className="newsletter-card">
        <h2>Did You Know?</h2>
        <p key={key}>{facts[currentFactIndex]}</p>
      </div>

      <main className="main-content">
          <div className="faculty-papers-chart">
            <h3 className="chart-title">Research Papers Published</h3>
            <ResponsiveContainer width="100%" height="100%">
            <BarChart 
              layout="vertical"
              data={facultyData}
              margin={{ left: -80, right: 20, top: 20, bottom: 50 }}
              barCategoryGap="20%"
            >
              <XAxis 
                type="number" 
                dataKey="papers" 
                hide={true}
              />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={250}
                axisLine={{ stroke: '#b185db' }}
                tickLine={{ stroke: '#b185db' }}
                tick={{ 
                  fill: "#222222",
                  className: 'chart-tick',
                  style: { 
                    whiteSpace: 'nowrap', 
                    overflow: 'hidden', 
                    textOverflow: 'ellipsis',
                    maxWidth: '500px'
                  } 
                }}
              />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: '#1a1a1a', 
                  color: '#ffffff',
                  border: '1px solid #b185db'
                }}
                labelStyle={{ color: '#b185db' }}
              />
              <Bar 
                dataKey="papers"
                fill="#b185db" 
                barSize={30}
                radius={[0, 15, 15, 0]}
              >
                <LabelList 
                  dataKey="papers" 
                  position="center" 
                  fill="#ffffff" // Label color
                  style={{ fontWeight: 'bold' }} // Make the text bold for better visibility
                />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="pie-chart">
          <ResponsiveContainer width="100%" height="100%">
            <DepartmentPublicationsPieChart />
          </ResponsiveContainer>
        </div>
        <div className="hindex">
          <Hindex/>
        </div>
      </main>
    </div>
  );
};

export default HomePage;
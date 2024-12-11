import React, { useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import './HomePage.css';
import DepartmentPublicationsPieChart from './PieChart';
import Hindex from './hindexdata';
import { useNavigate } from 'react-router-dom';
import './TablePage.css';

const HomePage = () => {
  const [selectedSchool, setSelectedSchool] = useState('');
  const [selectedDepartment, setSelectedDepartment] = useState('');
  const [selectedFaculty, setSelectedFaculty] = useState('');
  const [departments, setDepartments] = useState([]);
  const [facultyMembers, setFacultyMembers] = useState([]);
  const [schoolList, setSchoolList] = useState([]);
  const [facultyPapers, setFacultyPapers] = useState([]);
  const [showTable, setShowTable] = useState(false);  // State to control when to show the table

  useEffect(() => {
    fetch('http://localhost:8002/school')
      .then(response => response.json())
      .then(data => setSchoolList(data))
      .catch(err => console.error("Error fetching schools:", err));
  }, []);

  const handleSchoolChange = (e) => {
    const school = e.target.value;
    setSelectedSchool(school);
    setSelectedDepartment('');
    setSelectedFaculty('');
    setShowTable(false); // Hide the table when school changes

    fetch(`http://localhost:8002/school/depart?school=${school}`)
      .then(response => response.json())
      .then(data => setDepartments(data))
      .catch(err => console.error("Error fetching departments:", err));
  };

  const handleDepartmentChange = (e) => {
    const department = e.target.value;
    setSelectedDepartment(department);
    setSelectedFaculty('');
    setShowTable(false); // Hide the table when department changes

    fetch(`http://localhost:8002/school/scholar?department=${department}`)
      .then(response => response.json())
      .then(data => setFacultyMembers(data))
      .catch(err => console.error("Error fetching faculty:", err));
  };

  const handleFacultyChange = (e) => {
    const faculty = e.target.value;
    setSelectedFaculty(faculty);

    fetch(`http://localhost:8002/paper/${faculty}`)
      .then(response => response.json())
      .then(data => {
        setFacultyPapers(data);
        setShowTable(true);  // Show the table when faculty papers are fetched
      })
      .catch(err => console.error("Error fetching papers:", err));
  };

  const handleReset = () => {
    setSelectedSchool('');
    setSelectedDepartment('');
    setSelectedFaculty('');
    setDepartments([]);
    setFacultyMembers([]);
    setFacultyPapers([]);
    setShowTable(false);  // Reset the table visibility
  };

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

          {/* School Dropdown */}
          <div className="dropdown">
            <select value={selectedSchool} onChange={handleSchoolChange}>
              <option value="">Select School</option>
              {schoolList.map((school, index) => (
                <option key={index} value={school.School}>{school.School}</option>
              ))}
            </select>
          </div>

          {/* Department Dropdown */}
          <div className="dropdown">
            <select value={selectedDepartment} onChange={handleDepartmentChange} disabled={!selectedSchool}>
              <option value="">Select Department</option>
              {departments.length > 0 ? (
                departments.map((dept, index) => (
                  <option key={index} value={dept.Dept}>{dept.Dept}</option>
                ))
              ) : (
                <option value="">No departments available</option>
              )}
            </select>
          </div>

          {/* Faculty Dropdown */}
          <div className="dropdown">
            <select value={selectedFaculty} onChange={handleFacultyChange} disabled={!selectedDepartment}>
              <option value="">Select Faculty Member</option>
              {facultyMembers.length > 0 ? (
                facultyMembers.map((faculty, index) => (
                  <option key={index} value={faculty.scholar_id}>{faculty.scholar}</option>
                ))
              ) : (
                <option value="">No faculty available</option>
              )}
            </select>
          </div>



          {/* Reset Button */}
          <div className="reset-button">
            <button onClick={handleReset}>Reset</button>
          </div>
        </nav>
      </header>

      <div className="newsletter-card">
        <h2>Did You Know?</h2>
        <p>Some interesting facts here...</p>
      </div>

      <main className="main-content">
        {/* Research Papers Bar Chart */}
        <div className="faculty-papers-chart">
          <h3 className="chart-title">Research Papers Published</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={facultyPapers} margin={{ left: -80, right: 20, top: 20, bottom: 50 }} barCategoryGap="20%">
              <XAxis type="number" dataKey="papers" hide={true} />
              <YAxis type="category" dataKey="name" width={250} axisLine={{ stroke: '#b185db' }} tickLine={{ stroke: '#b185db' }} tick={{ fill: "#222222", className: 'chart-tick', style: { whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '500px' }}} />
              <Tooltip contentStyle={{ backgroundColor: '#1a1a1a', color: '#ffffff', border: '1px solid #b185db' }} labelStyle={{ color: '#b185db' }} />
              <Bar dataKey="papers" fill="#b185db" barSize={30} radius={[0, 15, 15, 0]}>
                <LabelList dataKey="papers" position="center" fill="#ffffff" style={{ fontWeight: 'bold' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie chart and h-index components */}
        <div className="pie-chart">
          <ResponsiveContainer width="100%" height="100%">
            <DepartmentPublicationsPieChart />
          </ResponsiveContainer>
        </div>
        <div className="hindex">
          <Hindex />
        </div>

        {/* Display Table with Papers */}

      </main>

      {showTable && (
          <div className="papers-table">
            <h3>Faculty Publications</h3>
            <table border="1" style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr>
                  <th>Paper ID</th>
                  <th>Title</th>
                  <th>Citations</th>
                  <th>Year</th>
                  <th>Publisher</th>
                  <th>Type</th>
                  <th>URL</th>
                </tr>
              </thead>
              <tbody>
                {facultyPapers.map((paper, index) => (
                  <tr key={index}>
                    <td>{paper.paper_id}</td>
                    <td>{paper.paper_title}</td>
                    <td>{paper.citation}</td>
                    <td>{paper.p_year}</td>
                    <td>{paper.publisher}</td>
                    <td>{paper.p_type}</td>
                    <td><a href={paper.URL} target="_blank" rel="noopener noreferrer">Link</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
    </div>
  );
};

export default HomePage;

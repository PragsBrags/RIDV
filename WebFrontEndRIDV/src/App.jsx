import React, { useState, useEffect } from 'react';
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer } from 'recharts';
import './HomePage.css';
import SchoolBarGraphData from './BarChart';
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

    fetch(`http://localhost:3000/${school}`)
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
        {/* Show Bar Chart and Pie Chart based on selected school */}
        {selectedSchool && (
          <>
            <div className="faculty-papers-chart">
              <ResponsiveContainer width="100%" height="100%">
                <SchoolBarGraphData selectedSchool={selectedSchool} />
              </ResponsiveContainer>
            </div>

            <div className="pie-chart">
              <ResponsiveContainer width="100%" height="100%">
                <DepartmentPublicationsPieChart selectedSchool={selectedSchool} />
              </ResponsiveContainer>
            </div>
          </>
        )}
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
                    <td><a href={paper.URl} target="_blank" rel="noopener noreferrer">Link</a></td>
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

const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '#Venom321',
    database: 'project'
});

db.connect((err) => {
    if (err) {
        console.error('Error connecting to the database:', err);
    } else {
        console.log('Connected to the database!');
    }
});

app.get('/', (req, res) => {
    return res.json("From backend side");
});

// Fetch papers for a specific scholar
app.get('/paper/:scholarId', (req, res) => {
    const scholarId = req.params.scholarId;
    const sql = `
      SELECT p.*, a.*, pa.*
      FROM tbl_paper p
      INNER JOIN tbl_paper_author pa ON p.paper_id = pa.paper_id
      INNER JOIN tbl_scholar a ON pa.author_id = a.scholar_id
      WHERE a.scholar_id = ?
    `;
    
    db.query(sql, [scholarId], (err, data) => {
      if (err) {
        console.error('SQL error:', err);
        return res.json({ error: 'SQL error' });
      } else {
        return res.json(data);
      }
    });
});

// Fetch list of schools
app.get('/school', (req, res) => {
    const sql = `
        SELECT *
        FROM tbl_school
    `;
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error('SQL error:', err);
            return res.json({ error: 'SQL error' });
        } else {
            console.log(data);  // Log the data for debugging
            return res.json(data);  // Send the data to the frontend
        }
    });
});
// Fetch list of departments
app.get('/depart', (req, res) => {
    const sql = `
        SELECT *
        FROM tbl_department
    `;
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error('SQL error:', err);
            return res.json({ error: 'SQL error' });
        } else {
            console.log(data);  // Log the data for debugging
            return res.json(data);  // Send the data to the frontend
        }
    });
});
// Fetch list of scholars
app.get('/scholar', (req, res) => {
    const sql = `
        SELECT *
        FROM tbl_scholar
    `;
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error('SQL error:', err);
            return res.json({ error: 'SQL error' });
        } else {
            console.log(data);  // Log the data for debugging
            return res.json(data);  // Send the data to the frontend
        }
    });
});

//Selects everything from tbl_dep_count table
app.get('/dep_count', (req, res) => {
    const sql = `
        SELECT *
        FROM tbl_dep_count
    `;
    
    db.query(sql, (err, data) => {
        if (err) {
            console.error('SQL error:', err);
            return res.json({ error: 'SQL error' });
        } else {
            console.log(data);  // Log the data for debugging
            return res.json(data);  // Send the data to the frontend
        }
    });
});

// Fetch departments for a specific school
app.get('/school/depart', (req, res) => {
    const school = req.query.school;
    const sql = `
        SELECT d.*
        FROM tbl_department d
        INNER JOIN tbl_school s ON d.SID = s.SID
        WHERE s.School = ?
    `;
    
    db.query(sql, [school], (err, data) => {
        if (err) {
            console.error('SQL error:', err);
            return res.json({ error: 'SQL error' });
        } else {
            return res.json(data);
        }
    });
});

// Fetch scholars for a specific department
app.get('/school/scholar', (req, res) => {
    const department = req.query.department;
    const sql = `
        SELECT sc.scholar_id, sc.scholar
        FROM tbl_scholar sc
        INNER JOIN tbl_department d ON sc.DID = d.DID
        WHERE d.Dept = ?
    `;
    
    db.query(sql, [department], (err, data) => {
        if (err) {
            console.error('SQL error:', err);
            return res.json({ error: 'SQL error' });
        } else {
            return res.json(data);
        }
    });
});
//Fetch data for bar chart and pie chart
app.get('/school/depart/count', (req, res) => {
    const school = req.query.school;
    const sql = `
        SELECT 
            d.Dept,         
            dc.paper_amt    
        FROM 
            tbl_school s
        INNER JOIN 
            tbl_department d ON s.SID = d.SID
        INNER JOIN 
            tbl_dep_count dc ON d.DID = dc.DID
        WHERE 
            s.School = ?
    `;
    
    db.query(sql, [school], (err, data) => {
        if (err) {
            console.error('SQL error:', err);
            return res.json({ error: 'SQL error' });
        } else {
            return res.json(data);
        }
    });
});


app.listen(8002, () => {
    console.log("Listening on port 8002");
});

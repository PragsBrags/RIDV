import { createPool } from 'mysql2';

const pool = createPool({
    host: 'localhost',
    user: 'root',
    password: 'god@great123',
    database: 'test'
}).promise();

export async function schoolDetails ( school ){
    try{
        const deptNames = await getDepartment(school);
        const schoolCharts = await getSchoolChart(school);
        return [deptNames, schoolCharts];
    }
    catch (err){
        console.error("Return error: ",err);
        throw err;
    }
};

// Fetch papers for a specific scholar
export async function getPapers(ID) {
    const scholarId = ID;
    try {
        const [result] = await pool.query(`
        SELECT p.*, a.*, pa.*
        FROM tbl_paper p
        INNER JOIN tbl_paper_author pa ON p.paper_id = pa.paper_id
        INNER JOIN tbl_scholar a ON pa.author_id = a.scholar_id
        WHERE a.scholar_id = ?
        `, scholarId);
        return result;
    }
    catch (err){
        console.error("Database query error:", err);
        throw err; // Let the error propagate to the caller
    }
};

//fetch list of schools
export async function getSchool() {
    try {
        const [result] = await pool.query(`
        SELECT *
        FROM tbl_school
        `);
        return result;
    }
    catch (err){
        console.error("Database query error:", err);
        throw err; // Let the error propagate to the caller
    }
};

// Fetch departments for a specific school
export async function getDepartment(school) {
    try {
        const [result] = await pool.query(`
        SELECT d.*
        FROM tbl_department d
        INNER JOIN tbl_school s ON d.SID = s.SID
        WHERE s.School = ?
        `,[school.school]);
        return result;
    }
    catch (err){
        console.error("Database query error:", err);
        throw err; // Let the error propagate to the caller
    }
};

// Fetch scholars for a specific department
export async function getScholar(dept) {
    try {
        const [result] = await pool.query(`
        SELECT sc.scholar_id, sc.scholar
        FROM tbl_scholar sc
        INNER JOIN tbl_department d ON sc.DID = d.DID
        WHERE d.Dept = ?
        `,dept);
        return result;
    }
    catch (err){
        console.error("Database query error:", err);
        throw err; // Let the error propagate to the caller
    }
};

//Fetch data for bar chart and pie chart
export async function getSchoolChart(school) {
    try {
        console.log(school);
        const [result] = await pool.query(`
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
        `, [school.school]);
        console.log(result);
        return result;
    }
    catch (err){
        console.error("Database query error:", err);
        throw err; // Let the error propagate to the caller
    }
};

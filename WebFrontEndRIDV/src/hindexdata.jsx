import React, { useState, useEffect } from "react";
import './HomePage.css';

const Hindex = ({ selectedSchool, selectedDepartment }) => {
    const [hindexData, setHindexData] = useState({ hindex: null, citeScore: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let fetchUrl = "";
        setLoading(true);
        setError(null);

        // Check if selectedSchool or selectedDepartment is provided and construct the URL accordingly
        if (selectedDepartment) {
            fetchUrl = `http://localhost:3000/dropdown/school/${selectedDepartment}`;
        }else if (selectedSchool) {
            fetchUrl = `http://localhost:3000/dropdown/${selectedSchool}`;
        } 

        // Log the fetch URL for debugging
        console.log("Fetching URL:", fetchUrl);

        if (fetchUrl) {
            fetch(fetchUrl)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch H-Index and CiteScore data");
                    }
                    return response.json();
                })
                .then(data => {
                    // Log the data returned from the API
                    console.log("API Response:", data);

                    if (data && data.hindex) {
                        setHindexData({
                            hindex: data.hindex.hindex || null,
                            citeScore: data.hindex.cite_score || null,
                        });
                    } else {
                        setHindexData({
                            hindex: null,
                            citeScore: null,
                        });
                    }
                    
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setHindexData({ hindex: null, citeScore: null });
            setLoading(false);
        }
    }, [selectedSchool, selectedDepartment]); // Dependency array includes both selectedSchool and selectedDepartment

    return (
        <div className="hindex">
            <h4>{selectedSchool ? "School Metrics" : selectedDepartment ? "Department Metrics" : "Select School or Department"}</h4>
            {loading ? (
                <p>Loading...</p>
            ) : error ? (
                <p style={{ color: "red" }}>Error: {error}</p>
            ) : (
                <>
                    <p>H-Index: {hindexData.hindex !== null ? hindexData.hindex : "N/A"}</p>
                    <p>CiteScore: {hindexData.citeScore !== null ? hindexData.citeScore : "N/A"}</p>
                </>
            )}
        </div>
    );
};

export default Hindex;

import React, { useState, useEffect } from "react";
import './HomePage.css';

const Hindex = ({ selectedSchool, selectedDepartment, selectedFaculty }) => {
    const [hindexData, setHindexData] = useState({ hindex: null, citeScore: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        let fetchUrl = "";
        setLoading(true);
        setError(null);

        // Construct the URL based on the selected values
        if (selectedFaculty) {
            fetchUrl = `http://localhost:3000/dropdown/school/department/${selectedFaculty}`;
        } else if (selectedDepartment) {
            fetchUrl = `http://localhost:3000/dropdown/school/${selectedDepartment}`;
        } else if (selectedSchool) {
            fetchUrl = `http://localhost:3000/dropdown/${selectedSchool}`;
        }

        // Log the fetch URL for debugging
        console.log("Fetching URL:", fetchUrl);

        if (fetchUrl) {
            // Clear previous data before fetching
            setHindexData({ hindex: null, citeScore: null });

            // Fetch data and handle response or errors
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

                    // Check if data.papyrus exists and set the hindexData accordingly
                    if (data && data.papyrus) {
                        setHindexData({
                            hindex: data.papyrus.h_index || null,
                            citeScore: data.papyrus.cite_score || null,
                        });
                    }

                    // Check if data.hindex exists, and set the hindexData accordingly
                    else if (data && data.hindex) {
                        setHindexData({
                            hindex: data.hindex.hindex || null,
                            citeScore: data.hindex.cite_score || null,
                        });
                    }

                    else {
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
    }, [selectedSchool, selectedDepartment, selectedFaculty]); // Dependency array includes selectedSchool and selectedDepartment and selectedFaculty

    const getHeader = () => {
        if (selectedFaculty) {
            return "Faculty Metrics";
        } else if (selectedDepartment) {
            return "Department Metrics";
        } else if (selectedSchool) {
            return "School Metrics";
        } else {
            return "Select School, Department, or Faculty";
        }
    };

    return (
        <div className="hindex">
            <h4>{getHeader()}</h4>
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

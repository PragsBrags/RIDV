import React, { useState, useEffect } from "react";
import './HomePage.css';

const Hindex = ({ selectedSchool }) => {
    const [hindexData, setHindexData] = useState({ hindex: null, citeScore: null });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (selectedSchool) {
            setLoading(true);
            setError(null);

            fetch(`http://localhost:8002/school/hindex?school=${selectedSchool}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error("Failed to fetch hindex data");
                    }
                    return response.json();
                })
                .then(data => {
                    if (data && data.length > 0) {
                        setHindexData({ hindex: data[0].hindex, citeScore: data[0].cite_score });
                    } else {
                        setHindexData({ hindex: null, citeScore: null });
                    }
                    setLoading(false);
                })
                .catch(err => {
                    setError(err.message);
                    setLoading(false);
                });
        } else {
            setHindexData({ hindex: null, citeScore: null });
        }
    }, [selectedSchool]);

    return (
        <div className="hindex">
            <h4>School Metrics</h4>
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

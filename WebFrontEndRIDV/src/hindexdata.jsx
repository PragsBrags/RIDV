import React from "react";
import './HomePage.css';

const Hindex = () => {
    const h_index = {
        'KU': 34
    };

    const citeScore = {
        'KU': 169
    }

    return(
        <div className="hindex">
            <h4>H-Data</h4>
            <p> h-index = {h_index['KU']}</p>
            <p> CiteScore = {citeScore['KU']}</p>
        </div>
    );
};

export default Hindex; 
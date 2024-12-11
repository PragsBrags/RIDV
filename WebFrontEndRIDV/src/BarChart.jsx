import React, { useState, useEffect} from "react";
import { BarChart, Bar, XAxis, YAxis, LabelList, Tooltip, ResponsiveContainer} from "recharts";
import './HomePage.css'

const SchoolBarGraphData = () =>{
  const [facultyPapers, setFacultyPapers] = useState([]);

    return(
        <div >
        <h3 className="chart-title">Research Papers Published</h3>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart layout="vertical" data={facultyPapers} margin={{ left: -80, right: 20, top: 20, bottom: 50 }} barCategoryGap="20%">
              <XAxis 
                type="number"
                dataKey="papers" 
                hide={true} />
              <YAxis 
                type="category" 
                dataKey="name" 
                width={250} 
                axisLine={{ stroke: '#b185db' }} 
                tickLine={{ stroke: '#b185db' }} 
                tick={{ fill: "#222222", 
                    className: 'chart-tick', 
                    style: { whiteSpace: 'nowrap', 
                             overflow: 'hidden', 
                             textOverflow: 'ellipsis', 
                             maxWidth: '500px' 
                            }
                        }
                      } 
                />
              <Tooltip 
                contentStyle={{ backgroundColor: '#1a1a1a', 
                                color: '#ffffff', 
                                border: '1px solid #b185db' }} 
                labelStyle={{ color: '#b185db' }} />
              <Bar dataKey="papers" fill="#b185db" barSize={30} radius={[0, 15, 15, 0]}>
                <LabelList dataKey="papers" position="center" fill="#ffffff" style={{ fontWeight: 'bold' }} />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
    );
};

export default SchoolBarGraphData;
import { schoolDetails } from "../database/databaseFunction.js";


const getScholar = async (req,res) => {
    const sch = req.params;
    
};

const getDept = async (req,res) => {
    const dep = req.params;

}

const getSchool = async (req,res) => {
    const schol = req.params;
    const [dept, charts, hindex, citescore] = await schoolDetails(schol);
    res.json({
        dept,
        charts,
        hindex,
        citescore
    });

};


export {getScholar, getDept, getSchool};
import { departmentDetails, getPapers, schoolDetails } from "../database/databaseFunction.js";


const getScholar = async (req,res) => {
    const sch = req.params;
    const papyrus = await getPapers(sch);
    res.json({
        papyrus
    });
};

const getDept = async (req,res) => {
    const dep = req.params;
    const [scholar, charts, hindex, citescore] = await departmentDetails(dep);
    res.json({
        scholar,
        charts,
        hindex,
        citescore
    })

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
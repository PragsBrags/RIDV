import { getSchool } from "../database/databaseFunction.js";

export const getSchol = async (req,res) => {
    const [school, hindex, cite_score, paper_amt] = await getSchool();
    res.json({
        school,
        paper_amt
    });
};

import { school } from "../database/databaseFunction.js";

export const getSchol = async (req,res) => {
    const [names,charts] = await school();
    res.json({names,
        charts});
};

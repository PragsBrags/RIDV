import express from "express"
import { getScholar, 
    getDept,
    getSchool,
    hSchool,
    citeSchool,
    hScholar,
    citeScholar,
    hDept,
    citeDept } from "../controller/dropdownController.js";

const dropRouter = express.Router();

dropRouter.get("/school/department/:scholar", getScholar);
dropRouter.get("/hindex/school/department/scholar", hScholar)
dropRouter.get("citescore/school/department/scholar", citeScholar)

dropRouter.get("/school/:department", getDept)
dropRouter.get("/hindex/school/department", hDept)
dropRouter.get("citescore/school/department", citeDept)

dropRouter.get("/:school", getSchool)
dropRouter.get("/hindex/school", hSchool)
dropRouter.get("citescore/school", citeSchool)

export default dropRouter;
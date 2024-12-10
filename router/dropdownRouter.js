import express from "express"
import { getScholar, getDept, getSchool } from "../controller/dropdownController.js";

const dropRouter = express.Router();

dropRouter.get("/schools/department/:scholar", getScholar);

dropRouter.get("/schools/:department", getDept)

dropRouter.get("/:schools", getSchool)

dropRouter.get("/hindex")

export default dropRouter;
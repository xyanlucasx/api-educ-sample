import express from "express";
import studentsGet from "../controllers/students/students.get.js";
import teachersGet from "../controllers/teachers/teachers.get.js";
import classesGet from "../controllers/classes/classes.get.js";

const router = express.Router();

router.get("/students/:idResource*?", studentsGet);

router.get('/teachers/:idResource*?', teachersGet)

router.get('/classes/:idResource*?', classesGet)

export default router;

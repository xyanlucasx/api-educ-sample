import express from "express";
import studentsGet from "../controllers/students/students.get.js";
import teachersGet from "../controllers/teachers/teachers.get.js";
import classesGet from "../controllers/classes/classes.get.js";

import classesPost from "../controllers/classes/classes.post.js";
import studentsPost from "../controllers/students/students.post.js";
import teachersPost from "../controllers/teachers/teachers.post.js";

import studentsDelete from "../controllers/students/students.delete.js";
import classesDelete from "../controllers/classes/classes.delete.js";
import teachersDelete from "../controllers/teachers/teachers.delete.js";

const router = express.Router();

router.get("/students/:idResource*?", studentsGet);

router.get("/teachers/:idResource*?", teachersGet);

router.get("/classes/:idResource*?", classesGet);

router.post("/classes", classesPost);

router.post("/students", studentsPost);

router.post("/teachers", teachersPost);

router.delete("/students/:idResource", studentsDelete);

router.delete("/classes/:idResource", classesDelete);

router.delete("/teachers/:idResource", teachersDelete);

export default router;

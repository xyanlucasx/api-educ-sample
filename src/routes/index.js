import express from "express";

import authenticationPost from "../controllers/authentication/authentications.post.js";

import checkAuth from "../middlewares/check.auth.js";

import studentsGet from "../controllers/students/students.get.js";
import teachersGet from "../controllers/teachers/teachers.get.js";
import classesGet from "../controllers/classes/classes.get.js";

import classesPost from "../controllers/classes/classes.post.js";
import studentsPost from "../controllers/students/students.post.js";
import teachersPost from "../controllers/teachers/teachers.post.js";

import studentsDelete from "../controllers/students/students.delete.js";
import classesDelete from "../controllers/classes/classes.delete.js";
import teachersDelete from "../controllers/teachers/teachers.delete.js";

import studentsPatch from "../controllers/students/students.patch.js";
import teachersPatch from "../controllers/teachers/teachers..patch.js";
import classesPatch from "../controllers/classes/classes.patch.js";

import insertStudent from "../controllers/classes/insert-student/insert.student.js";

const router = express.Router();

router.post("/authentication", authenticationPost);

router.get(
  "/students/:idResource*?",
  checkAuth("students", "teachers"),
  studentsGet
);

router.get("/teachers/:idResource*?", checkAuth("teachers"), teachersGet);

router.get(
  "/classes/:idResource*?",
  checkAuth("students", "teachers"),
  classesGet
);

router.post("/classes", checkAuth("teachers"), classesPost);

router.post("/students", checkAuth("teachers"), studentsPost);

router.post("/teachers", checkAuth("teachers"), teachersPost);

router.delete("/students/:idResource", checkAuth("teachers"), studentsDelete);

router.delete("/classes/:idResource", checkAuth("teachers"), classesDelete);

router.delete("/teachers/:idResource", checkAuth("teachers"), teachersDelete);

router.patch("/students/:idResource", checkAuth("teachers"), studentsPatch);

router.patch("/teachers/:idResource", checkAuth("teachers"), teachersPatch);

router.patch("/classes/:idResource", checkAuth("teachers"), classesPatch);

router.post("/classes/insert-student", checkAuth("teachers"), insertStudent);

export default router;

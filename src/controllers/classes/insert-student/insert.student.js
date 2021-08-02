import { ObjectId } from "mongodb";
import { ok, internalServerError } from "../../../utils/rest.response.js";
export default async (req, res, next) => {
  try {
    const queryStudent = { _id: new ObjectId(req.body.idStudent) };
    const queryClass = { _id: new ObjectId(req.body.idClass) };

    const student = await global.mongo
      .collection("students")
      .find(queryStudent)
      .toArray();

    const classDocument = await global.mongo
      .collection("classes")
      .find(queryClass)
      .toArray();

    const queryTeacher = {
      _id: new ObjectId(classDocument[0].teacher.teacherId),
    };

    const studentToAdd = {
      name: student[0].name,
      matriculationId: student[0].matriculationId,
      studentId: student[0]._id,
    };

    const classToAddInStudent = {
      class: {
        name: classDocument[0].name,
        classId: classDocument[0]._id,
      },
      teacher: {
        name: classDocument[0].teacher.name,
        matriculationId: classDocument[0].teacher.matriculationId,
        teacherId: classDocument[0].teacher.teacherId,
      },
    };

    const classToAddInTeacher = {
      name: classDocument[0].name,
      classId: classDocument[0]._id,
    };

    const newClass = await global.mongo
      .collection("classes")
      .updateOne(queryClass, {
        $push: {
          students: studentToAdd,
        },
      });

    const newStudent = await global.mongo
      .collection("students")
      .updateOne(queryStudent, {
        $push: {
          classes: classToAddInStudent,
        },
      });

    const newTeacher = await global.mongo
      .collection("teachers")
      .updateOne(queryTeacher, {
        $push: {
          classes: classToAddInTeacher,
        },
      });

    ok(res, { message: "class updated successfully" });
  } catch (e) {
    console.log(e);
    internalServerError(res);
  }
};

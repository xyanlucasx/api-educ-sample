import {
  responseCreated,
  responseBadRequest,
} from "../../utils/rest.response.js";
import simpleModel from "../../utils/simple.model.js";

export default async (req, res, next) => {
  try {
    const validFields = ["name", "teacher", "students"];
    const validBody = simpleModel(req.body, validFields);

    validBody.teacher = {
      name: req.payload.name,
      teacherId: req.payload.id,
      matriculationId: req.payload.matriculationId,
    };

    validBody.students = [];

    const newDocument = await global.mongo
      .collection("classes")
      .insertOne(validBody);

    responseCreated(res, newDocument);
  } catch (e) {
    console.log(e);
    if (e.message.indexOf("is required") != -1)
      responseBadRequest(res, e.message);
    else internalServerError(res);
  }
};

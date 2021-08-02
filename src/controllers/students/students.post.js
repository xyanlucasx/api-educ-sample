import {
  responseCreated,
  responseBadRequest,
  responseInternalServerError
} from "../../utils/rest.response.js";
import simpleModel from "../../utils/simple.model.js";
import { hashValue } from "../../utils/hash.bcrypt.js";

export default async (req, res, next) => {
  try {
    const validFields = [
      "userName",
      "password",
      "name",
      "age",
      "matriculationId",
      "classes",
    ];
    const validBody = simpleModel(req.body, validFields);

    validBody.classes = [];

    const hashPassword = await hashValue(validBody.password);
    validBody.password = hashPassword;

    const newDocument = await global.mongo
      .collection("students")
      .insertOne(validBody);

    responseCreated(res, newDocument);
  } catch (e) {
    console.log(e);
    if (e.message.indexOf("is required") != -1)
      responseBadRequest(res, e.message);
    else responseInternalServerError(res);
  }
};

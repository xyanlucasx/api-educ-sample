import simpleModel from "../../utils/simple.model.js";
import { hashValue } from "../../utils/hash.bcrypt.js";
import mountQuery from "../../utils/mount.query.js";
import {
  responseOk,
  notFound,
  responseInternalServerError,
} from "../../utils/rest.response.js";

export default async (req, res, next) => {
  try {
    const validFields = [
      "userName",
      "password",
      "name",
      "matriculationId",
      "classes",
    ];

    const noRequired = true;

    const validBody = simpleModel(req.body, validFields, noRequired);

    delete validBody.classes;

    if (validBody.password) {
      const hashPassword = await hashValue(validBody.password);
      validBody.password = hashPassword;
    }

    const updatedDocumentInfos = await global.mongo
      .collection("students")
      .updateOne(mountQuery(req), { $set: validBody });

    if (updatedDocumentInfos.modifiedCount == 1)
      responseOk(res, updatedDocumentInfos);
    else notFound("student not found");
  } catch (e) {
    console.log(e);
    responseInternalServerError(res);
  }
};

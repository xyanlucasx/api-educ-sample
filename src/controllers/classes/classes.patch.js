import simpleModel from "../../utils/simple.model.js";
import mountQuery from "../../utils/mount.query.js";
import {
  ok,
  notFound,
  internalServerError,
} from "../../utils/rest.response.js";

export default async (req, res, next) => {
  try {
    const validFields = ["name", "teacher", "students"];

    const noRequired = true;

    const validBody = simpleModel(req.body, validFields, noRequired);

    const updatedDocumentInfos = await global.mongo
      .collection("classes")
      .updateOne(mountQuery(req), { $set: validBody });

    if (updatedDocumentInfos.modifiedCount == 1) ok(res, updatedDocumentInfos);
    else notFound("class not found");
  } catch (e) {
    console.log(e);
    internalServerError(res);
  }
};

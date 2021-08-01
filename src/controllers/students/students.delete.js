import mountQuery from "../../utils/mount.query.js";
import {
  ok,
  notFound,
  internalServerError,
} from "../../utils/rest.response.js";

export default async (req, res, next) => {
  try {
    const deletedInfos = await global.mongo
      .collection("students")
      .deleteOne(mountQuery(req));

    if (deletedInfos.deletedCount == 1) ok(res, deletedInfos);
    else notFound(res, "student not found");
  } catch (e) {
    console.log(e);
    internalServerError(res);
  }
};

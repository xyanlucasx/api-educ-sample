import mountQuery from "../../utils/mount.query.js";
import {
  responseOk,
  notFound,
  responseInternalServerError,
} from "../../utils/rest.response.js";

export default async (req, res, next) => {
  try {
    const deletedInfos = await global.mongo
      .collection("students")
      .deleteOne(mountQuery(req));

    if (deletedInfos.deletedCount == 1) responseOk(res, deletedInfos);
    else notFound(res, "student not found");
  } catch (e) {
    console.log(e);
    responseInternalServerError(res);
  }
};

import mountQuery from "../../utils/mount.query.js";
import pagination from "../../utils/pagination.js";
import {
  responseOk,
  noContent,
  responseInternalServerError,
} from "../../utils/rest.response.js";

export default async (req, res, next) => {
  try {
    const documents = await global.mongo
      .collection("students")
      .find(mountQuery(req))
      .toArray();

    if (documents.length > 0)
      responseOk(res, pagination(documents, req.query?.skip, req.query?.limit));
    else noContent(res);
  } catch (e) {
    console.log(e);
    responseInternalServerError(res);
  }
};

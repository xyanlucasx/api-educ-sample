import mountQuery from "../../utils/mount.query.js";
import {
  responseOk,
  noContent,
  responseInternalServerError,
} from "../../utils/rest.response.js";

export default async (req, res, next) => {
  try {
    const documents = await global.mongo
      .collection("teachers")
      .find(mountQuery(req))
      .toArray();

    if (documents.length > 0) responseOk(res, documents);
    else noContent(res);
  } catch (e) {
    console.log(e);
    responseInternalServerError(res);
  }
};

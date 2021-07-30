import mountQuery from "../../utils/mount.query.js";
import { ok, noContent, internalServerError } from "../../utils/rest.response.js"

export default async (req, res, next) => {
    try {
        const documents = await global.mongo
            .collection("teachers")
            .find(mountQuery(req))
            .toArray();

        if (documents.length > 0) ok(res, documents)
        else noContent(res)

    } catch (e) {
        console.log(e);
        internalServerError(res)
    }
};

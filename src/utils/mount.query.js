import { ObjectId } from "mongodb";
export default (req) => {
  let query = {};

  if (req.query) query = req.query;
  if (req.params.idResource) query._id = new ObjectId(req.params.idResource);
  if (req.query.className) {
    query["classes.name"] = { $in: [req.query.className] };
    delete query.className;
    console.log("entrou");
  }

  delete query.skip;
  delete query.limit;

  console.log(query, "query aqui");
  return query;
};

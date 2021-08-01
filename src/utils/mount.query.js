import { ObjectId } from "mongodb";
export default (req) => {
  const query = {};

  if (req.params.idResource) query._id = new ObjectId(req.params.idResource);
  console.log(query, "query aqui");
  return query;
};

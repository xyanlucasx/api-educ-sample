export default (req) => {

    const query = {}

    if (req.params.idResource) query._id = req.params.idResource

    return query
}
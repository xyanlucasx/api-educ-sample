export default (arrayDocuments, skip = 0, limit = 10) => {
  skip = Number(skip);
  limit = Number(limit);
  const documentsPaginated = {
    total: arrayDocuments.length,
    limit: limit,
    skip: skip,
    data: arrayDocuments.slice(skip, skip + limit),
  };
  return documentsPaginated;
};

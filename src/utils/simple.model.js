export default (data, fields) => {
  const allowFields = fields;

  const validFields = allowFields.reduce((acc, curr) => {
    if (data[curr]) acc[curr] = data[curr];
    else throw new Error(`field '${curr}' is required`);
    return acc;
  }, {});

  return validFields;
};

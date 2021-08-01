export default (data, fields, noRequired) => {
  const allowFields = fields;

  const validFields = allowFields.reduce((acc, curr) => {
    if (data[curr] || noRequired) acc[curr] = data[curr];
    else throw new Error(`field '${curr}' is required`);
    return acc;
  }, {});

  if (noRequired) {
    Object.keys(validFields).map((field) => {
      if (!validFields[field]) delete validFields[field];
    });
  }

  return validFields;
};

const getValidationErrors = (error) => {
  const results = Object.values(error.errors);
  const errors = {};
  for (let index = 0; index < results.length; index++) {
    const result = results[index];
    errors[result.path] = result.message;
  }
  return errors;
};

module.exports = {
  getValidationErrors,
};

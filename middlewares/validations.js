export const schemaValidator = (schema) => async (req, res, next) => {
  const { error } = schema.validate(
    {
      body: req.body,
      params: req.params,
      query: req.query,
    },
    {
      abortEarly: false,
      allowUnknown: true,
    },
  );
  error ? next(error) : next();
};

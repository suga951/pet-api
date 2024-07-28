const ERROR_HANDLERS = {
  dbError: () => {},
  permissionError: () => {},
  defaultError: (res, err) => {
    res.status(500).json({
      success: false,
      message: err.message,
    });
  },
};

const errorHandler = (error, req, res, next) => {
  console.error("ERROR HANDLER CALLED", error);
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(res, error);
};

export default errorHandler;

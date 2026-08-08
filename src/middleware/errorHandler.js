const errorHandler = (error, req, res, next) => {
  if (error.name === 'CastError') {
    return res.status(400).json({
      success: false,
      message: 'Invalid student ID',
    });
  }

  res.status(500).json({
    success: false,
    message: 'Server error',
    error: error.message,
  });
};

export default errorHandler;

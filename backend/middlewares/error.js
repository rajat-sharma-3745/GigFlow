const errorMiddleware = (err, req, res, next) => {
    let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  if (err.code === 11000) {
    const field = Object.keys(err.keyPattern)[0];
    message = `${field} already exists`;
    statusCode = 400;
  }

  if (err.name === 'ValidationError') {
    message = Object.values(err.errors)
      .map((error) => error.message)
      .join(', ');
    statusCode = 400;
  }

  if (err.name === 'CastError') {
    message = `Invalid ${err.path}: ${err.value}`;
    statusCode = 400;
  }

  if (err.name === 'JsonWebTokenError') {
    message = 'Invalid token. Please login again';
    statusCode = 401;
  }

  if (err.name === 'TokenExpiredError') {
    message = 'Token expired. Please login again';
    statusCode = 401;
  }

  res.status(statusCode).json({
    success: false,
    message,
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
}

export default errorMiddleware 
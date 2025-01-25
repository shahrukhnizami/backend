const sendResponse = (res, statusCode, data, error, message) => {
    res.status(statusCode).json({
      error,
      message,
      data,
    });
  };
  
  export default sendResponse;
  
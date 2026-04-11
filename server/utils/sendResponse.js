
const sendResponse = (res, message='', statusCode=200, data={}, dataKey='data') => {
  const response = {
    success: true,
    statusCode,
    message,
    [dataKey]: data,
    timeStamps: Date.now()
  }

  res.status(statusCode).json( response);
};

module.exports = sendResponse;
  
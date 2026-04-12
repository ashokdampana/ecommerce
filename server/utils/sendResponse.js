
const sendResponse = (res, message='', statusCode=200, data={}, dataKey='data') => {
  const response = {
    success: true,
    statusCode,
    message,
    [dataKey]: data,
    timeStamp: new Date().toISOString()
  }

  res.status(statusCode).json( response);
};

module.exports = sendResponse;
  

const sendResponseToClient = (res, status, success, message, data) => {
  res.status(status).json({
    success: success,
    message: message,
    result: data,
  });
};

export default sendResponseToClient
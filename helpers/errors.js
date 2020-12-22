const { errorCodes } = require('../utils/constants');

function serverErrorNotification(err, notification) {
  return res.status(errorCodes.ERROR_SERVER).send({ message: notification });
}

function invalidDataNotification(err, notification) {
  return res.status(errorCodes.ERROR_INVALID_ID).send({ message: notification });
}

function nonExistentDataNotification(err, notification) {
  return res.status(errorCodes.ERROR_NOT_FOUND).send({ message: notification })
}

function createNotFoundError() {
  const err = new Error();
  err.statusCode = errorCodes.ERROR_NOT_FOUND;
  throw err;
}

module.exports = {
  serverErrorNotification,
  invalidDataNotification,
  nonExistentDataNotification,
  createNotFoundError
}
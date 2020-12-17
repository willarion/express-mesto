const User = require('../models/user');
const { errorCodes } = require('../utils/constants');


function getUsers(req, res) {
  User.find({})
    .then(users => res.send(users))
    .catch(err => res.status(errorCodes.ERROR_SERVER).send({ message: 'Произошла ошибка на сервере', error: err }));
}

function getUserProfile(req, res) {
  User.findById(req.params.id)
    .orFail(() => {
      const err = new Error();
      err.statusCode = errorCodes.ERROR_NOT_FOUND;
      throw err;
    })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if(err.kind === 'ObjectId') {
        return res.status(errorCodes.ERROR_INVALID_ID).send({ message: 'Невалидный id пользователя' })
      }
      if (err.statusCode === errorCodes.ERROR_NOT_FOUND) {
        return res.status(errorCodes.ERROR_NOT_FOUND).send({ message: 'Пользователя с таким id не существует' })
      }
      res.status(errorCodes.ERROR_SERVER).send({ message: 'Произошла ошибка на сервере', error: err })
    });
}

function createUser(req, res) {
  const { name, about, avatar } = req.body;

  User.create({ name, about, avatar })
    .then(user => res.send({ data: user }))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        return res.status(errorCodes.ERROR_INVALID_ID).send({ message: 'Введённые данные невалидны' })
      }
      res.status(errorCodes.ERROR_SERVER).send({ message: 'Произошла ошибка на сервере', error: err })
    });
}


module.exports = {
  getUsers,
  getUserProfile,
  createUser
}
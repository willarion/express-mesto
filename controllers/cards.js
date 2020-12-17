const Card = require('../models/card');
const { errorCodes } = require('../utils/constants');


function getCards(req, res) {
  Card.find({})
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(err => res.status(errorCodes.ERROR_SERVER).send({ message: 'Произошла ошибка на сервере', error: err }));
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch((err) => {
      if (err.name === 'ValidatorError') {
        return res.status(errorCodes.ERROR_INVALID_ID).send({ message: 'Введённые данные невалидны' })
      }
      res.status(errorCodes.ERROR_SERVER).send({ message: 'Произошла ошибка на сервере', error: err })
    });
}

function deleteCard(req, res) {

  Card.findByIdAndRemove(req.params.cardId)
    .orFail(() => {
      const err = new Error();
      err.statusCode = errorCodes.ERROR_NOT_FOUND;
      throw err;
    })
    .then(card => res.send({ data: card, message: "карточка удалена" }))
    .catch((err) => {
      if(err.kind === 'ObjectId') {
        return res.status(errorCodes.ERROR_INVALID_ID).send({ message: 'Невалидный id карточки' })
      }
      if (err.statusCode === errorCodes.ERROR_NOT_FOUND) {
        return res.status(errorCodes.ERROR_NOT_FOUND).send({ message: 'Карточки с таким id не существует' })
      }
      res.status(errorCodes.ERROR_SERVER).send({ message: 'Произошла ошибка на сервере', error: err })
    });
}


module.exports = {
  getCards,
  createCard,
  deleteCard
};

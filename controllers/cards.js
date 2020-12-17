const Card = require('../models/card');


function getCards(req, res) {
  Card.find({})
    .populate('owner')
    .then(cards => res.send(cards))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка', error: err }));
}

function createCard(req, res) {
  const { name, link } = req.body;

  Card.create({name, link, owner: req.user._id })
    .then(card => res.send({ data: card }))
    .catch(err => res.status(500).send({ message: 'Произошла ошибка', error: err }));
}

function deleteCard(req, res) {

  Card.findByIdAndRemove(req.params.cardId)
  .then(card => res.send({ data: card, message: "карточка удалена" }))
  .catch(err => res.status(500).send({ message: 'Произошла ошибка' }));
}


module.exports = {
  getCards,
  createCard,
  deleteCard
};

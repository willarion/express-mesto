const getDataFromFIle = require('../helpers/getDataFromFile');
const path = require('path');


const pathToData = path.join(__dirname, '..', 'data', 'cards.json');

function getCards(req, res) {

  return getDataFromFIle(pathToData)
  .then(cards => res.status(200).send(cards))
  .catch(err => res.status(500).send(err));
}


module.exports = getCards;



const getDataFromFIle = require('../helpers/getDataFromFile');
const path = require('path');


const pathToData = path.join(__dirname, '..', 'data', 'users.json');

function getUsers(req, res) {

  return getDataFromFIle(pathToData)
  .then(users => res.status(200).send(users))
  .catch(err => res.status(500).send(err));
}

function getUserProfile(req, res) {
  return getDataFromFIle(pathToData)
  .then(users => users.find(user => user._id === req.params.id))
  .then((user) => {
    if (!user) {
      return res.status(404).send({"message": "Нет пользователя с таким id"});
    }
    return res.status(200).send(user);
  })
  .catch(err => res.status(500).send(err));
}


// module.exports = getUsers;
// module.exports = getUserProfile;

module.exports = {
  getUsers,
  getUserProfile
}
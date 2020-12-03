const router = require('express').Router();
const fsPromises = require('fs').promises;
const path = require('path');


//helper
function getDataFromFIle(pathToFile) {

  return fsPromises.readFile(pathToFile, {encoding: 'utf-8'})
  .then(data => JSON.parse(data))
  .catch(err => console.log(err));
}

//controller
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


router.get('/users', getUsers);

router.get('/users/:id', getUserProfile);


module.exports = router;

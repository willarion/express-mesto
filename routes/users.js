const router = require('express').Router();
const {getUsers, getUserProfile, createUser}= require('../controllers/users');


router.get('/users', getUsers);
router.post('/users', createUser);
router.get('/users/:id', getUserProfile);


module.exports = router;

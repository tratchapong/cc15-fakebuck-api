const express = require('express');

const authenticateMiddleware = require('../middlewares/authenticate');
const friendController = require('../controllers/friend-controller');

const router = express.Router();

router.post(
  '/:receiverId',
  authenticateMiddleware,
  friendController.requestFriend
);

module.exports = router;

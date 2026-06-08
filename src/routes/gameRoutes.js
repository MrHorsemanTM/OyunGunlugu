const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');
const path = require('path');
const requireAuth = require(path.join(__dirname, '../middleware/authMiddleware'));

router.get('/', requireAuth, gameController.getAll);
router.post('/', requireAuth, gameController.create);
router.delete('/:id', requireAuth, gameController.delete);

module.exports = router;

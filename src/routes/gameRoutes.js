const express = require('express');
const router = express.Router();
const gameController = require('../controllers/gameController');

router.get('/', gameController.getAll);    
router.post('/', gameController.create);   
router.delete('/:id', gameController.delete); 

module.exports = router;

/**
 * @swagger
 * components:
 *   schemas:
 *     Game:
 *       type: object
 *       required:
 *         - title
 *       properties:
 *         id:
 *           type: integer
 *         title:
 *           type: string
 *         genre:
 *           type: string
 *         status:
 *           type: string
 *         rating:
 *           type: integer
 */

/**
 * @swagger
 * /api/games:
 *   get:
 *     summary: Tüm oyunları listeler
 *     responses:
 *       200:
 *         description: Oyun listesi döndü
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Game'
 */
router.get('/', gameController.getAll);

/**
 * @swagger
 * /api/games:
 *   post:
 *     summary: Yeni oyun ekler
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Game'
 *     responses:
 *       201:
 *         description: Oyun oluşturuldu
 */
router.post('/', gameController.create);
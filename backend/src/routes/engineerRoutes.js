const express = require('express');
const authMiddleware = require('../middlewares/authMiddleWare');
const { getAllEngineers, getEngineerById,calculateEngineerCapacity } = require('../controllers/engineerController');

const router = express.Router();

router.get('/', getAllEngineers);
router.get('/:id', getEngineerById);
router.get('/:id/capacity', calculateEngineerCapacity);

module.exports = router;
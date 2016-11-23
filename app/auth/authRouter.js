const express = require("express");

const authenticateController = require("./authenticateController");

const router = express.Router();

router.post('', authenticateController.authenticate);

module.exports = router;

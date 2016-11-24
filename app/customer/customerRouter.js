const express = require("express");

const customerController = require("./customerController");

const router = express.Router();

router.get("", customerController.get);
router.get("/:id", customerController.getById);
router.post("", customerController.save);
router.put("/:id", customerController.update);
router.delete("/:id", customerController.remove);

module.exports = router;

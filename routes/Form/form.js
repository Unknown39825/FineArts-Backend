const express = require("express");
const { createFrom } = require("../../controllers/From/joinform");

const router = express.Router();

router.post("/form",  createFrom);

module.exports = router;

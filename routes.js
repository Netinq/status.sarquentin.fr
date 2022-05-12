let express = require("express");
let router = express.Router();
const { StatusController } = require('./app/controllers/StatusController');

router.get(
  "/",
  async (req, res, next) => StatusController(req, res, next),
);

module.exports = router;

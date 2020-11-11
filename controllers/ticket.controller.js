const express = require("express");
const { authenticate, authorization } = require("../middlewares/auth/index");
const { createTicket } = require("../services/ticket.service");

const router = express.Router();

router.post("/tickets", authenticate, createTicket);

module.exports = router;

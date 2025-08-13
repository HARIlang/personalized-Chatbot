//Routes.js
// API ROUTES
const chatBot = require('../controller/chatbotcontroller');
const express = require('express');
const route = express.Router();
// POST route for chatbot interaction
route.post('/chatbot',chatBot);

module.exports = route;
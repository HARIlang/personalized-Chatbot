// server.js
const express = require('express');
const route = require('./routes/routes');
const cors = require('cors')

const app = express();
app.use(express.json());
app.use(cors({
  origin: '*'
}));



// Base API route
app.use('/api', route);

app.listen(3000, () => {
  console.log('Server running on port 3000');
});

const express = require('express');
const cors = require('cors');
const app = express();

const { PORT } = require('./config/environment').API;

require('./db');
 
require('./app/routes/index')(app);

app.use(cors());
app.use(express.json());
app.listen(PORT || 3000);

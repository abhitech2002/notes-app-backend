const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require('./db');
const notesRoutes = require('./routes/notes');

const app = express();

app.use(cors());
app.use(bodyParser.json());  

app.use('/api/notes', notesRoutes);

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

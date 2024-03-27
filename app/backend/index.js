const express = require("express");
const mongoose = require("mongoose");

const app = express();

mongoose.connect("mongodb://127.0.0.1:27017/intel");

app.listen(8080, () => console.log("backend is running"));

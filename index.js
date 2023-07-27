// server.js
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://127.0.0.1:27017/form-builder')
.then(() => console.log('Connected!'));

// Create MongoDB schema and model (you can customize the schema based on your requirements)
const formSchema = new mongoose.Schema({
  title: String,
  questions: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Question' }],
});

const questionSchema = new mongoose.Schema({
  type: String, // "Text", "Radio", or "Checkbox"
  label: String,
  options: [String], // For "Radio" and "Checkbox" type only
});

const Form = mongoose.model('Form', formSchema);
const Question = mongoose.model('Question', questionSchema);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

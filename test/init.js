assert = require("assert");
should = require('should');
mongoose = require('mongoose');
Schema = mongoose.Schema;

Tools = require(__dirname + '/../index.js');
tools = new Tools({modelsDir: './test/data/models/', modelTemplatesDir: './views/'});

schema = {
  name: String
};

testOpts = {
  schema: new Schema({
    title:  String,
    author: String,
    body:   String,
    comments: [{ body: String, date: Date }],
    date: { type: Date, default: Date.now },
    hidden: Boolean,
    meta: {
      votes: Number,
      favs:  Number
    }
  })
};
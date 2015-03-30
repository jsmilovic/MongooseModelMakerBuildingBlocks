assert = require("assert");
should = require('should');
mongoose = require('mongoose');

Tools = require(__dirname + '/../index.js');
tools = new Tools({modelsDir: __dirname + '/data/models/', modelTemplatesDir: __dirname + '/../views/'});

testOpts = {
  schemas: {
    simple: "{ \
      name: String \
    }",
    complex: "{ \
      title:  String, \
      author: String, \
      body:   String, \
      comments: [{ body: String, date: Date }], \
      date: { type: Date, default: Date.now }, \
      hidden: Boolean, \
      meta: { \
        votes: Number, \
        favs:  Number \
      } \
    }",
    invalid:  "{ \
      title:  'String', \
      author: Strings \
    }"
  }
};
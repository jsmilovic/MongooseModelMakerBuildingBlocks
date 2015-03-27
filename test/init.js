assert = require("assert");
should = require('should');

Tools = require(__dirname + '/../index.js');
tools = new Tools({modelsDir: './test/data/models/', modelTemplatesDir: './test/data/views/'});
##Mongoose CRUD Helper

The goal of this project is to help making Mongoose models easier, programatically.

There is an example project coming soon using a REST API on top of this, but it should work fine for a yeoman generator, or other applications.

The usage is as follows:
```
var Helper = require ('mongoose-crud-tools');
var helper = new Helper({baseDir: __base, modelsDir: __base + 'models/', modelTemplatesDir: __base + 'views/'});
```
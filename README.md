##Mongoose CRUD Helper

The goal of this project is to help making Mongoose models easier, programatically.

Schema updates and new models should reflect immediately in your application, invalidating the required module is handled internally

There is an example project coming soon using a REST API on top of this, but it should work fine for a yeoman generator, or other applications.

Initialization is as follows:
```
var Helper = require ('mongoose-crud-tools');
var helper = new Helper({baseDir: __base, modelsDir: __base + 'models/', modelTemplatesDir: __base + 'views/'});
```
Where
modelsDir is where you want your outputted models to end up at.
modelTemplatesDir is a folder containing your templates for making models and schemas. This is optional.  Please see the views folder for how you can make your own model templates

```
helper.createModel('sample', schema, callback);
```
where schema is your default schema.  Please use {} for default if you want an empty schema

updateSchema requires the entire schema. Here is an example of receiving new schema pieces in a request body to add to your schema.
Roadmap has an addToSchema to simplify this.

```
  var schema = require(helper.findModelSchemaFilePath(modelName));

  for (var item in req.body) {
    schema[item] = req.body[item];
  }
  helper.updateSchema(modelName, schema, callback)
```


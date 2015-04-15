##Mongoose CRUD Helper

The goal of this project is to help making Mongoose models easier, programatically.

Schema updates and new models should reflect immediately in your application, invalidating the required module is handled internally

Schemas are json as such

Key: Value
e.g.

date: { type: Date, default: Date.now }

Initialization is as follows:
```
var Helper = require ('mongoose-crud-tools');
var helper = new Helper({modelsDir: __base + 'models/', modelTemplatesDir: __base + 'views/'});
```
Where
modelsDir is where you want your outputted models to end up at.
modelTemplatesDir is a folder containing your templates for making models and schemas. This is optional.  Please see the views folder for how you can make your own model templates

####Create Model

```
helper.createModel('sample', schema, callback);
```

where schema is your default schema.  Please use {} for default if you want an empty schema to start

####Add To Schema

```
    helper.addToSchema(modelName, fields, function(err) {
```

####Update Schema

Requires the entire schema. Here is an example of receiving new schema pieces in a request body to add to your schema.

```
  var schema = require(helper.findModelSchemaFilePath(modelName));

  for (var item in req.body) {
    schema[item] = req.body[item];
  }
  helper.updateSchema(modelName, schema, callback)
```

There is an example project coming soon using a REST API on top of this, but it should work fine for a yeoman generator, or other applications.
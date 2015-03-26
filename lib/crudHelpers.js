var fs = require('fs');
var mongoose = require('mongoose');
var _str = require('underscore.string');
var jade = require('jade');

var lib = function(opts) {
    opts = opts || {};
    var baseDir = opts.baseDir;
    var modelsDir = opts.modelsDir || '../../../models/';
    var modelTemplatesDir = opts.modelTemplatesDir || '../views/';

    var normalizedPath = require("path").join(modelsDir, "");

    require("fs").readdirSync(normalizedPath).forEach(function(file) {
        if (file != "Index.js" && file.indexOf('_Schema') <= 0) {
            require(modelsDir + file);
        }
    });

    this.getModel = function getModel(modelName) {
        modelName = _str.capitalize(modelName);
        return mongoose.model(modelName);
    };

    this.findModelFilePath = function findModelFilePath(modelName) {
        return modelsDir + modelName + '.js';
    };

    this.findModelSchemaFilePath = function findModelSchemaFilePath(modelName) {
        return modelsDir + modelName + '_Schema.js';
    };

    this.getSchema = function(modelName){
        var paths = mongoose.models[modelName].schema.paths;
        var fields = [];

        for (var p in paths) {
            fields.push({title: paths[p].path, type: paths[p].instance })
        }
        return fields;
    };

    this.updateSchema = function (modelName, schema, callback) {

        modelName = _str.capitalize(modelName);

        jade.renderFile(modelTemplatesDir + 'model_template_schema.jade', {schema: schema}, function (err, html) {
            fs.writeFile(modelsDir + modelName + "_schema.js",
                function () {
                    return html;
                }(),
                function (err) {
                    if (err) {
                        console.log(err);
                    }
                    else {
                        this.refreshModel(modelName);
                        callback();
                    }
                }.bind(this)
            )
        }.bind(this))
    }

    this.createModel = function (modelName, callback) {

        modelName = _str.capitalize(modelName);
        var displayName = modelName;
        var slugName = _str.slugify(modelName);
        slugName = _str.capitalize(slugName);

        jade.renderFile(modelTemplatesDir + 'model_template.jade', {
                modelName: displayName,
                modelNameSlug: slugName,
                modelNameDisplayName: displayName
            },
            function (err, html) {

                fs.writeFile(modelsDir + modelName + ".js",
                    function () {
                        return html;
                    }(),
                    function (err) {
                        if (err) {
                            console.log(err);
                        }
                        else {
                            if (typeof cb == 'function')
                                callback();
                        }
                    }
                )
            }
        )
    }

    this.deleteModel = function(modelName, cb) {

        modelName = _str.capitalize(modelName);

        deleteFile(this.findModelFilePath(modelName), function (err) {
            if (err)
            {
                cb(err);
            }
            else
            {
                deleteFile(this.findModelSchemaFilePath(modelName), function() {
                    removeModel(modelName);
                    cb();
                }.bind(this))
            }
        }.bind(this))
    }

    this.refreshModel = function refreshModel(modelName) {
        removeModel(modelName);
        var model = require(this.findModelFilePath(modelName));
    }

    var removeModel = function removeModel(modelName) {
        modelName = _str.capitalize(modelName);
        delete mongoose.models[modelName];
        delete mongoose.modelSchemas[modelName];
        flushModelCache(modelName);
    }

    var flushModelCache = function(modelName) {
        var modelPath = this.findModelFilePath(modelName);
        var schemaPath = this.findModelSchemaFilePath(modelName);

        delete require.cache[require.resolve(schemaPath)];
        delete require.cache[require.resolve(modelPath)];

    }.bind(this);

    var deleteFile = function(filePath, cb) {
        fs.unlink(filePath,
            function(err) {
                if(err) {
                    cb(err);
                }
                else {
                    cb();
                }
            }
        );
    }

    this.deleteRecord = function(modelName, id, cb) {
        var Model = this.getModel(modelName);
        Model.remove({ _id: id}, cb)
    }

    return this;
}

module.exports = lib;
exports = module.exports = function(mongoose) {

    var normalizedPath = require("path").join(__dirname, "");
    var modules = {};

    require("fs").readdirSync(normalizedPath).forEach(function (file) {
        if (file != "Index.js" && file.indexOf('_Schema') <= 0) {
            modules[file.split('.')[0]] = require('./' + file)(mongoose);
        }
    });

    return modules;
}

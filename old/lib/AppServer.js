const express = require("express"),
    PouchDB = require("pouchdb"),
    expressPouchDB = require("express-pouchdb");

var app;

function start(config) {
    app = express();
    app.use("/www" ,express.static(config.path));
    app.use(expressPouchDB(PouchDB, {
        configPath: config.dbConfig,
    }));
    app.listen(config.port);
    console.log(`Server started on port ${config.port}`);
}

module.exports = {
    start: start,
};
const AppServer = require("./lib/AppServer.js");

AppServer.start({
	port: 8080,
	path: "www",
	dbURL: "/db",
	dbConfig: "db/config.json",
	dbPath: "db/",
});
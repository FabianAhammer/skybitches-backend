import express from "express";
var bodyParser = require("body-parser");
import { MongoInstance } from "./connector.js";
import { RestRouter } from "./routes/rest-router.js";
import { Db } from "mongodb";
import cors from "cors";
const app = express();
const Axios = require("axios");
const cookieParser = require("cookie-parser");
const port = 8080;

app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

var mongoInstance = null;
var db: Db;

mongoInstance = MongoInstance.start().then((instance) => {
	db = instance;
	console.log("Mongo connected!");
	const router: RestRouter = new RestRouter(app, db);
	router.registerRoutes();
});

app.listen(port, () => {
	console.log(`API Server online on ${port}`);
});

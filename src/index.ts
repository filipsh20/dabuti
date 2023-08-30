import "dotenv/config";
import express from "express";
import mongoose from "mongoose";
import bodyParser from "body-parser";
import morgan from "morgan";
import helmet from "helmet";
import cors from "cors";

import corsOptions from "./config/cors";
import auth from "./routes/auth";
import data from "./routes/data";

const app = express();

//middlewares
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan("common"));
app.use(cors(corsOptions));

//routes
app.use("/auth", auth);
app.use("/data", data);

//connecting to database and starting up the server
mongoose.connect(process.env.DB || "");
const connection = mongoose.connection;
const PORT = process.env.SERVER_PORT || 3001;
const URL = process.env.SERVER_DOMAIN + ":" + PORT;
const message = "\x1b[35m" + URL + "\x1b[0m";

connection.on("open", () => {
  console.log("Connected successfully to database");
  app.listen(PORT, () => console.log("Server running at", message));
});

connection.on("error", () => {
  console.error.bind("Error connecting to database");
});

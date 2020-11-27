import express from "express";
import "express-async-errors";
import cors from "cors";
import "./database/connection";
import routes from "./routes";
import path from "path";
import errorHandler from "./errors/handler";
import "dotenv";
import expressSession from "express-session";

const app = express();
const session = expressSession({
  secret: "secure_password",
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false },
});

app.disable("x-powered-by");
app.use(express.json());
app.use(cors.apply("*"));
app.use(session);
app.use(routes);
app.use("/uploads", express.static(path.join(__dirname, "..", "uploads")));
app.use(errorHandler);

app.listen(process.env.PORT || 3333);

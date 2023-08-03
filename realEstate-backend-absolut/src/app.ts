import "reflect-metadata";
import "express-async-errors";
import express, { Application } from "express";
import cors from "cors";
import {
  categoriesRoute,
  sessionRoute,
  realEstateRoute,
  schedulesRoute,
  usersRoute,
} from "./routes";
import middlewares from "./middlewares";

const app: Application = express();
app.use(express.json());
app.use(cors());
const optionsCors = {
  origin: "*",
  optionsSuccessStatus: 200,
};

app.use("/login", sessionRoute);
app.use("/users", usersRoute);
app.use("/schedules", schedulesRoute);
app.use("/realEstate", realEstateRoute);
app.use("/categories", categoriesRoute);

app.use("", cors(optionsCors), middlewares.handleError);

export default app;

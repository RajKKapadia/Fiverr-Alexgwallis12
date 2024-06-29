import express, { Express, Request, Response, NextFunction } from "express";
import dotenv from "dotenv";

import homeRouter from "./routes/homeRoute";
import dialogflowRouter from "./routes/dialogflowRoute";

dotenv.config();

const app: Express = express();

app.use(express.json());
app.use(express.urlencoded());
app.use((req: Request, res: Response, next: NextFunction) => {
  console.log(`Path ${req.path} with Method ${req.method}`);
  next();
});

const PORT: string = process.env.PORT || '3000';

app.use("/", homeRouter);
app.use('/dialogflow', dialogflowRouter);

app.listen(PORT, () => {
  console.log(`[server]: Server is running at http://localhost:${PORT}`);
});

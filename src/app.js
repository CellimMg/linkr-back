import express from 'express';
import cors from "cors";
import dotenv from "dotenv";
import router from "./routes/index.js";
import authRouter from './routes/authRoutes.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());
app.use(router);
app.use(authRouter)

app.listen(process.env.PORT, () =>
  console.log(`Servidor online na porta ${process.env.PORT}`)
);
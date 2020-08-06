import express from "express";
import dotenv from "dotenv";
import { AddressInfo } from "net";
import { userRouter } from "./routes/UserRouter";
import { postRouter } from "./routes/PostRouter";
import cors from 'cors';

dotenv.config();


export const app = express();
app.use(cors({
  origin:true
}));
//https://tchnezbuic.execute-api.us-east-1.amazonaws.com/dev
app.use(express.json());
app.use("/user", userRouter);
app.use("/post", postRouter);

if(process.env.NODE_ENV !== "serveless") {
  const server = app.listen(3000, () => {
    if (server) {
      const address = server.address() as AddressInfo;
      console.log(`Servidor rodando em http://localhost:${address.port}`);
    } else {
      console.error(`Falha ao rodar o servidor.`);
    }
});
}
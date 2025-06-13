import express from "express";
import router from "./router/index.js";
import connectMongoDb from "./connect.js";
import "dotenv/config";

const app = express();
const port = process.env.PORT || 3000;
connectMongoDb(process.env.DATABASE_URI);

app.use(express.json());
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

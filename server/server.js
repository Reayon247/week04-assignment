import express from "express";
import pg from "pg";
import dotenv from "dotenv";
import cors from "cors";

const app = express();
app.use(express.json());

app.use(cors());

dotenv.config();

const db = new pg.Pool({
  connectionString: process.env.DB_URL,
});

app.listen(8080, () => {
  console.log("Server is running on port 8080, yippeeee");
});

app.get("/", (request, response) => {
  response.json({ message: "welcome to my server. This is the root route" });
});

import express, { request } from "express";
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
//my root rout
app.get("/", (request, response) => {
  response.json({ message: "welcome to my server. This is the root route" });
});

//process data into database
app.post("/newMessage", (request, response) => {
  const body = request.body;
  const query = db.query(
    `INSERT INTO nalamessages (name, message, likes) VALUES ($1, $2, $3)`,
    [body.name, body.message, body.likes]
  );
  response.json(query);
});

//read data from the message database
app.get("/message", async (request, response) => {
  const query = await db.query("SELECT * FROM nalamessages");
  const messageData = response.json(query.rows);
});

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { authRouter } from "./routes/auth.route.js";
import { usersRouter } from "./routes/users.route.js";
import { sequelize } from "./db/db.js";
import { models } from "./db/db.js";

const app = express();

app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://127.0.0.1:5173',
    'https://ranked-resort-required-provincial.trycloudflare.com'
  ],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'Cookie']
}));

app.use(express.json());
app.use(cookieParser());

// Request logging for debugging
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.url} - Origin: ${req.headers.origin}`);
  next();
});

const port = process.env.PORT;
//db init

try {
  await sequelize.authenticate();
  console.log("Connection has been established successfully.");
} catch (error) {
  console.error("Unable to connect to the database:", error);
}

// console.log((await models.cities.findAll()).map(x=>x.name));

app.get("/chk", (req, res) => {
  res.send("Hello World!");
});

app.use("/auth", authRouter);
app.use("/users", usersRouter);

app.listen(port, () => console.log("listening on port " + port));

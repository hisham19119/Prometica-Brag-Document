const express = require("express");
const cookieParser = require("cookie-parser");
const app = express();
const documentRoutes = require("./routes/document.routes");
const authRouter = require("./routes/auth.routes");
const userRouter = require("./routes/user.routes");
const dbConecction = require("./config/dbConnection");
const cors = require("cors");

dbConecction();

// app.use(
//   cors({
//     origin: "https://prometica.vercel.app",
//     // origin: "http://localhost:3000",
//     methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
//     allowedHeaders: ["Content-Type"],
//     credentials: true,
//   })
// );
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "https://prometica.vercel.app");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH");
  res.header("Access-Control-Allow-Headers", "Content-Type");
  res.header("Access-Control-Allow-Credentials", "true");
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  }
  next();
});

app.options("*", cors());
// app.use(cors());
// app.use(cors({ origin: "*", credentials: false }));

// app.options("*", cors());

// app.use(
//   cors({
//     origin: true,
//     credentials: true,
//   })
// );

// app.options("*", cors({ origin: true, credentials: true }));

// app.options("*", cors());

// app.use(
//   cors({
//     origin: "https://prometica.vercel.app",
//     credentials: true,
//   })
// );

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use("/api/documents/", documentRoutes);
app.use("/api/auth/", authRouter);
app.use("/api/users/", userRouter);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500).json({ error: err.message });
});
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "🚀 Prometica API is running successfully!",
    timestamp: new Date().toISOString(),
    version: "1.0.0",
    environment: process.env.NODE_ENV || "Production",
  });
});

app.listen("4000", () => {
  console.log("listening to port 4000 now .....");
});

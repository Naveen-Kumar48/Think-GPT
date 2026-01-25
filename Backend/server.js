import express from "express";
import cors from "cors";
import "dotenv/config";
import connectDB from "./config/db.js";
import userRouter from "./routes/UserRoutes.js";

import chatRouter from "./routes/chatRoutes.js";
import messageRouter from "./routes/messageRoutes.js";
import creditRouter from "./routes/creditRoutes.js";



const app = express();
await connectDB();
// middleware

app.use(cors());
app.use(express.json());



//^ Routes

app.get("/", (req, res) => {
  res.send("Server is live");
});
app.use("/api/user", userRouter);
app.use("/api/chat", chatRouter);
app.use("/api/message",messageRouter);
app.use('/api/credit',creditRouter)
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is Running on ${PORT}`);
});

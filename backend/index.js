import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import dotenv from 'dotenv'

import router from './Routes/route.js'

dotenv.config()
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
}))

// Connect to MongoDB
mongoose
  .connect(process.env.MONGOURI)
  .then(() => console.log("Connected to MongoDB"))
  .catch((err) => console.error("MongoDB connection error:", err));

app.use('/api', router)

app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
});
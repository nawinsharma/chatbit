import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import protectedRoutes from './routes/protected';

dotenv.config({ path: './env' })
const PORT = process.env.PORT || 8080
const app = express()

app.use(express.json())
app.use(
  cors({
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

// Protected routes
app.use("/api", protectedRoutes);

app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'Server working fine!!',
  })
})

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`)
})

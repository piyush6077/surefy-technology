import express , {Express , Request , Response } from "express"
import userRouter from "./routes/user.routes"
const app: Express = express()

app.use(express.json())

app.use("/api/v0/users", userRouter)

export default app
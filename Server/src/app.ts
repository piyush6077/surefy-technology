import express , {Express , Request , Response } from "express"
import userRouter from "./routes/user.routes"
import eventRouter from "./routes/event.routes";
const app: Express = express()

app.use(express.json())

app.use("/api/v0/users", userRouter)
app.use("/api/v0/events", eventRouter)

export default app
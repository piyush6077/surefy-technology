import express , { Express , Request , Response } from "express"
import { handleUserRegistration } from "../controllers/user.controller";
const router = express.Router()

router.post("/registration", handleUserRegistration)

export default router
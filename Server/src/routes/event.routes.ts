import express , { Express , Request , Response } from "express"
import { handleCreateEvents, handleDeleteEvent, handleGetEventById, handleGetEvents, handleGetFutureEvents } from "../controllers/events.controller"
const router = express.Router()

router.post("/events", handleCreateEvents)
router.get("/events", handleGetEvents)
router.get("/events/:id", handleGetEventById)
router.get("/events/future", handleGetFutureEvents)
router.get("events/stats", handleGetFutureEvents)
router.delete("/events/:id", handleDeleteEvent) 

export default router;
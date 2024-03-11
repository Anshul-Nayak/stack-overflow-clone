import express from "express"
import { chatBotController } from "../controllers/Chatbot.js"

const router = express.Router()

router.post("/" , chatBotController)

export default router
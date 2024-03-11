import express from "express";

import { postAnswer, deleteAnswer } from "../controllers/Answers.js";
import auth from "../middleware/auth.js";
// import { postAnswer} from "../controllers/Answers.js";

const router = express.Router();

router.patch("/post/:id", auth, postAnswer);
// router.patch("/post/:id", postAnswer);

router.patch("/delete/:id", auth, deleteAnswer);
// router.patch("/delete/:id",  deleteAnswer);

export default router;

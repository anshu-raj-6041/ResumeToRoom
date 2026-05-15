import express from "express"
import isAuth from "../middlewares/isAuth.js"
import { upload } from "../middlewares/multer.js"
import { analyzeResume, finishInterview, generateQuestion, getInterviewReport, getMyInterviews, submitAnswer } from "../controllers/interview.controller.js"

const interviewRouter = express.Router()

interviewRouter.post("/resume", isAuth, upload.single("resume"),
    analyzeResume)
interviewRouter.post("/generate-questions", isAuth, generateQuestion)   // in step 1
interviewRouter.post("/submit-answer", isAuth, submitAnswer)    // in step 2
interviewRouter.post("/finish", isAuth, finishInterview)    // in step 3


interviewRouter.get("/get-interview", isAuth, getMyInterviews)
interviewRouter.get("/report/:id", isAuth, getInterviewReport)

export default interviewRouter
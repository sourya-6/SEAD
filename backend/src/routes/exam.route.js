import express from "express";
import { registerExam, getStudentExamDetails,downloadHallTicket } from "../controllers/exam.controller.js";
import { upload } from "../middlewares/upload.middleware.js";
import { protect ,verifyJWT} from "../middlewares/auth.middleware.js";

const router = express.Router();

// Exam Registration Route
router.post(
  "/register",protect, // User must be logged in
  upload.fields([
    { name: "idProof", maxCount: 1 },
    { name: "photo", maxCount: 1 },
    { name: "signature", maxCount: 1 },
  ]),
  registerExam
);

router.get("/myexam",protect, getStudentExamDetails);
router.get("/hallticket/:examId", downloadHallTicket);




export default router;
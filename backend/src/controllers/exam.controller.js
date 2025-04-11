import { ExamRegistration } from "../models/examregister.model.js";
import { User } from "../models/user.model.js";
import path from "path";
import { fileURLToPath } from "url";


export const registerExam = async (req, res) => {
  try {
      console.log("Exam registration started...");

      const {
          fullname,
          dob,
          gender,
          email,
          phone,
          qualification,
          institution,
          passingYear,
          examName,
          examDate,
          examCenter,
          paymentMethod,
      } = req.body;

      console.log(req.body);

      // Check if files are uploaded
      if (!req.files || !req.files.idProof || !req.files.photo || !req.files.signature) {
          console.log(req.files);
          return res.status(400).json({ message: "All files (ID Proof, Photo, Signature) are required!" });
      }

      console.log("Files uploaded successfully!");

      // Create new exam registration entry (without user ID)
      const newExam = new ExamRegistration({
          user:req.user._id,
          fullname,
          dob,
          gender,
          email,
          phone,
          qualification,
          institution,
          passingYear,
          examName,
          examDate,
          examCenter,
          idProof: req.files.idProof[0].path, // Save file paths
          photo: req.files.photo[0].path,
          signature: req.files.signature[0].path,
          paymentMethod,
      });

      // Save to database
      await newExam.save();

      res.status(201).json({ message: "Exam registered successfully!", exam: newExam });
  } catch (error) {
      res.status(500).json({ message: "Error registering exam", error: error.message });
  }
};
export const getStudentExamDetails = async (req, res) => {
    try {
      const studentId = req.user.id; // Get logged-in student's ID
  
      // Find the exam details based on user ID
      const examDetails = await ExamRegistration.findOne({ user: studentId });
  
      if (!examDetails) {
        return res.status(404).json({ message: "No exam details found for this student." });
      }
  
      res.status(200).json({ examDetails });
    } catch (error) {
      res.status(500).json({ message: "Error fetching exam details", error: error.message });
    }
  };


// To get __dirname in ES6


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const downloadHallTicket = (req, res) => {
  try {
    const { examId } = req.params;
    // Construct the dynamic file path
    const filePath = path.join(__dirname, `../halltickets/${examId}.pdf`);

    // Send the file for download
    res.download(filePath, "HallTicket.pdf", (err) => {
      if (err) {
        console.error("Error downloading hall ticket:", err);
        return res.status(500).send("Error downloading hall ticket");
      }
    });
  } catch (err) {
    console.error("Error during download:", err);
    res.status(500).send("Error downloading hall ticket");
  }
};

  
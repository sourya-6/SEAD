import mongoose from "mongoose";

const examRegistrationSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // Reference to the User schema
    },
    fullname: { type: String, required: true },
    dob: { type: Date, required: true },
    gender: { type: String, enum: ["Male", "Female"], required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    qualification: { type: String, required: true },
    institution: { type: String, required: true },
    passingYear: { type: Number, required: true },
    examName: { type: String, required: true },
    examDate: { type: Date, required: true },
    examCenter: { type: String },
    idProof: { type: String, required: true }, // Store file path
    photo: { type: String, required: true },
    signature: { type: String, required: true },
    paymentMethod: { type: String, enum: ["Credit Card", "Debit Card", "UPI"], required: true },
  },
  { timestamps: true }
);

export const ExamRegistration = mongoose.model("ExamRegistration", examRegistrationSchema);
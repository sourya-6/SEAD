import { Schema, model } from "mongoose";

const ExamSchema = new mongoose.Schema(
  {
    fullname: {
      type: "String",
      unique: true,
      required: true,
    },
    Gender: {
      type: "String",
      required: true,
    },
    DOB: {
      type: "Date",
      reuired: true,
    },
    Email: {
      type: "String",
      unique: true,
      required: true,
    },
    Phone: {
      type: "Number",
      unique: true,
      required: true,
    },
    Qualification: {
      type: "String",
      required: true,
    },
    Pass: {
      type: "Number",
      required: true,
    },
    ExamName: {
      type: "String",
      required: true,
    },
    ExamDate: {
      type: "Date",
      required: true,
    },
    ExamCenter: {
      type: "String",
      required: true,
    },
    ID: {
      type: "String",
      required: true,
    },
    photo: {
      type: "String",
      required: true,
    },
    signature: {
      type: "String",
      required: true,
    },
    paymentMethod: {
      type: "String",
      required: true,
    },
  },
  { timestamps: true }
);

export const Register = mongoose.model("Register", RegisterSchema);

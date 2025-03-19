import RegisterExam from "../../../frontend/src/pages/RegisterExam";


export const uploadDetails = async(req,res) =>{
    try {
        const { fullname,Gender, DOB, Email, Phone, Qualification, Institution, PassingYear, ExamName, ExamDate, ExamCenter, IdProof, Photo, Signature, PaymentMethod} = req.body
        if(!fullname.trim()||!Gender.trim()||!DOB.trim()){
            return res.status(400).json({"message":"All fields are required"})
        }
    } catch (error) {
        
    }
}

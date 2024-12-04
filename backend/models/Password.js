import mongoose from "mongoose";

const passwordSchema = new mongoose.Schema({
    site: {type: String, required: true},
    username: {type: String, required: true},
    password: {type: String, required: true, unique: true}
})

const PasswordUser = mongoose.models.Password || mongoose.model("Password", passwordSchema)
export default PasswordUser
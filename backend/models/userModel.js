import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    address: {
        line1: {
            type: String,
            required: true
        },
        line2: {
            type: String,
            required: true
        },
    },
    phoneNumber: {
        type: Number,
        default: "+(00) 0000000000",
        required: true
    },
    image: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        default: "Not Selected",
        required: true
    },
    dob: {
        type: Date,
        default: "Not Selected",
        required: true
    },
}, { minimize:false });

const userModel = mongoose.model.user || mongoose.model("user", userSchema);
export default userModel
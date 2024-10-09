import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true  // Ensure email is unique
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    availability: {
        type: Boolean,
        default: true
    },
    speciality: {
        type: String,
        required: true
    },
    degree: {
        type: String,
        required: true
    },
    experience: {
        type: String,
        required: true
    },
    about: {
        type: String,
        required: true
    },
    fees: {
        type: Number,
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
        }
    },
    phoneNumber: {
        type: String,  // String instead of Number for flexibility
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slots: {
        type: [{ day: String, start: String, end: String }],  // Array of objects for slots
        default: []
    }
}, { minimize: false });

// Ensure that doctor model is either created or reused
const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;
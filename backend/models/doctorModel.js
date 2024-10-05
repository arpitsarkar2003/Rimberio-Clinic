import mongoose from "mongoose";

const doctorSchema = new mongoose.Schema({
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
        },
    },
    phoneNumber: {
        type: Number,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    slots: {
        type: Object,
        default: []
    }
}, { minimize: false });

const doctorModel = mongoose.models.doctor || mongoose.model("doctor", doctorSchema);

export default doctorModel;

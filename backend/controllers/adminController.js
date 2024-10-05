import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';

const addDoctor = async (req, res) => {
    try {
        const { name, email, password, speciality, degree, experience, fees, address } = req.body;
        const imageFile = req.file;

        // Check for missing details
        if (!name || !email || !password || !speciality || !degree || !experience || !fees || !address || !imageFile) {
            return res.status(400).json({ error: 'Missing Details' });
        }

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid Email' });
        }

        // Validate password strength
        if (!validator.isStrongPassword(password) || password.length < 8) {
            return res.status(400).json({ error: 'Password not strong enough! Use Special Characters' });
        }

        // Hash the password
        const docPassword = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, docPassword);

        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(imageFile.path, {
            folder: 'doctor',
            use_filename: true,
            unique_filename: false
        });
        const imageUrl = imageUpload.secure_url;

        // Prepare the doctor data
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            fees,
            address: JSON.parse(address),  // Parse address if needed
            image: imageUrl
        };

        // Save the new doctor record
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // Send the success response
        res.status(201).json({ message: 'Doctor Added Successfully', doctor: newDoctor });

    } catch (error) {
        res.status(500).json({ error: error.message });
        console.error(error);
    }
};

export { addDoctor };

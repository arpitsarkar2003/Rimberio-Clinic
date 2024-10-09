import validator from 'validator';
import bcrypt from 'bcrypt';
import { v2 as cloudinary } from 'cloudinary';
import doctorModel from '../models/doctorModel.js';

const addDoctor = async (req, res) => {
    try {
        console.log("hrlooooooooooooo");

        const { name, email, password, speciality, degree, experience, fees, phoneNumber, about, } = req.body;
        // // Check for missing address details
        let { address } = req.body;
        if (typeof(address) === 'string') {
            address = JSON.parse(address);  // Parse the stringified address if necessary
            console.log(address);

        }
        // console.log(typeof(address));
        
        // Check for missing details
        if (!name) return res.status(400).json({ error: "Name is required" });
        if (!email) return res.status(400).json({ error: "Email is required" });
        if (!password) return res.status(400).json({ error: "Password is required" });
        if (!req.file) return res.status(400).json({ error: "Image is required" });
        if (!speciality) return res.status(400).json({ error: "Speciality is required" });
        if (!degree) return res.status(400).json({ error: "Degree is required" });
        if (!experience) return res.status(400).json({ error: "Experience is required" });
        if (!about) return res.status(400).json({ error: "About section is required" });
        if (!fees) return res.status(400).json({ error: "Fees are required" });

        if (!address || !address.line1 || !address.line2) {
            return res.status(400).json({ error: "Complete address (line1 and line2) is required" });
        }
        if (!phoneNumber) return res.status(400).json({ error: "Phone number is required" });

        // Validate email
        if (!validator.isEmail(email)) {
            return res.status(400).json({ error: 'Invalid Email' });
        }

        // Validate password strength
        if (!validator.isStrongPassword(password, { minLength: 8 })) {
            return res.status(400).json({ error: 'Password not strong enough! Use special characters' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Check for missing address details
        if (typeof address === 'string') {
            address = JSON.parse(address);  // Parse the stringified address if necessary
            console.log(address);

        }


        // Upload image to Cloudinary
        const imageUpload = await cloudinary.uploader.upload(req.file.path, {
            folder: 'doctor',
            use_filename: true,
            unique_filename: false
        });
        const imageUrl = imageUpload.secure_url;
        //! TODO: Upload image to gridfsmongodb


        // Prepare the doctor data
        const doctorData = {
            name,
            email,
            password: hashedPassword,
            speciality,
            degree,
            experience,
            fees,
            address,
            image: imageUrl,
            phoneNumber,
            about
        };

        // Save the new doctor record
        const newDoctor = new doctorModel(doctorData);
        await newDoctor.save();

        // Send the success response
        res.status(201).json({ message: 'Doctor added successfully', doctor: newDoctor });

    } catch (error) {
        console.error(error);  // Log the error for debugging
        res.status(500).json({ error: error.message });
    }
};

export { addDoctor };

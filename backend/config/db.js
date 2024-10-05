import mongoose from 'mongoose';

const connectDb = async () => {
    try {
        await mongoose.connect(process.env.DATABASE_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database connected");
    } catch (error) {
        console.log("Error while connecting to db:", error);
    }
};

export default connectDb;

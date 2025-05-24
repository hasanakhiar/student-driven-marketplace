const express = require('express');
require('dotenv').config();
const connectDB = require('../connect');
const Student = require('../models/Student');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');            

const app = express();

app.use(cors());
app.use(express.json());

// Signup Route

app.post('/api/auth/signup', async (req, res) => {
    const { email, password, name, university, department, program, yearOfStudy, phoneNumber, dateOfBirth } = req.body;
    try {
        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new student with the hashed password
        const student = new Student({
            email,
            password: hashedPassword,  // Save hashed password here
            name,
            university,
            department,
            program,
            yearOfStudy,
            phoneNumber,
            dateOfBirth
        });

        await student.save();  // Save to the database

        res.status(201).json({ msg: 'Student created successfully' });
    } catch (err) {
        res.status(500).json({ msg: err.message });
    }
});



app.get('/', (req, res) => {
    res.send('Server is working');
    res.send("JWT_SECRET:", process.env.JWT_SECRET);
});

// Login Route
app.post('/api/auth/login', async (req, res) => {
    const { email, password } = req.body;
    try {
        // Explicitly select the password field
        const student = await Student.findOne({ email }).select('+password');
        
        if (!student) return res.status(400).json({ msg: 'Invalid credentials' });

        // Log the password comparison process
        console.log('Provided Password:', password);
        console.log('Stored Password Hash:', student.password);

        // Compare the provided password with the stored hashed password
        const isMatch = await bcrypt.compare(password, student.password);
        console.log('Password Match:', isMatch);  // Log the result of the comparison

        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        // Create JWT Token
        const token = jwt.sign(
            { studentId: student._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            token,
            student: { name: student.name, email: student.email }
        });
    } catch (err) {
        console.error('Login Error:', err);  // Log full error details
        res.status(500).json({ msg: err.message });
    }
});


// Example protected route
const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(" ")[1];
    if (!token) return res.status(401).json({ msg: "No token, authorization denied" });

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.student = decoded.studentId; // Use studentId instead of userId
        next();
    } catch (err) {
        res.status(401).json({ msg: "Token is not valid" });
    }
};

app.get('/api/protected', authMiddleware, (req, res) => {
    res.json({ msg: 'This is a protected route', studentId: req.student }); // Use studentId instead of userId
});

const start = async () => {
    try {
        await connectDB(process.env.MONGO_URI);
        app.listen(process.env.PORT, () => console.log('Server started ...'));
    } catch (err) {
        console.log(err);
    }
};
start();

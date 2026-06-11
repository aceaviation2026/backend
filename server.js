const express = require('express');
const cors = require('cors');
const db = require('./connectiondb');
const nodemailer = require('nodemailer');

const app = express();

app.use(cors());
app.use(express.json());

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'aceaviation2026@gmail.com',
        pass: 'ogrr sjzt rhps viyb'

//         user: process.env.EMAIL_USER,
// pass: process.env.EMAIL_PASS
    }
});

app.get('/', (req, res) => {
    res.send('Ace Aviator Backend Running');
});
app.post('/api/enquiry', (req, res) => {

    const {
        name,
        email,
        phone,
        education,
        interest,
        message
    } = req.body;

    const sql =
        `INSERT INTO enquiries
        (name,email,phone,education,interest,message)
        VALUES (?,?,?,?,?,?)`;

    db.query(
        sql,
        [name, email, phone, education, interest, message],
        async (err, result) => {

            if (err) {
                return res.status(500).json(err);
            }

//      await transporter.sendMail({
//     from: `"${email}" <aceaviation2026@gmail.com>`,
//     // replyTo: email,   // IMPORTANT: user email goes here
//     to: 'aceaviation2026@gmail.com',
//     subject: 'New Consultation Request - The Ace Aviator',
//     html: `
//         <h2>New Consultation Request</h2>

//         <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
//             <tr><th align="left">Field</th><th align="left">Details</th></tr>
//             <tr><td><strong>Name</strong></td><td>${name}</td></tr>
//             <tr><td><strong>Email</strong></td><td>${email}</td></tr>
//             <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
//             <tr><td><strong>Education</strong></td><td>${education}</td></tr>
//             <tr><td><strong>Interest</strong></td><td>${interest}</td></tr>
//             <tr><td><strong>Message</strong></td><td>${message}</td></tr>
//         </table>
//     `
// });

//             res.json({
//                 success: true
//             });

//         });

// });




await transporter.sendMail({
 from: `"${email}" <aceaviation2026@gmail.com>`,
    // replyTo: email,   // IMPORTANT: user email goes here
    to: 'aceaviation2026@gmail.com',
    subject: 'New Consultation Request - The Ace Aviator',
    html: `
        <h2>New Consultation Request</h2>

        <table border="1" cellpadding="10" cellspacing="0" style="border-collapse: collapse; width: 100%;">
            <tr><th align="left">Field</th><th align="left">Details</th></tr>
            <tr><td><strong>Name</strong></td><td>${name}</td></tr>
            <tr><td><strong>Email</strong></td><td>${email}</td></tr>
            <tr><td><strong>Phone</strong></td><td>${phone}</td></tr>
            <tr><td><strong>Education</strong></td><td>${education}</td></tr>
            <tr><td><strong>Interest</strong></td><td>${interest}</td></tr>
            <tr><td><strong>Message</strong></td><td>${message}</td></tr>
        </table>
    `
});

res.json({ success: true });

     });

});

const PORT = process.env.PORT || 3000;
    
app.listen(PORT, () => {
    console.log('Server running on port ' + PORT);
});
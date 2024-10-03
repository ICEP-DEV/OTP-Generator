const express = require("express");
const cors = require('cors');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer')
const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post('/otp', (req, res) => {
    console.log(req.body.otp)
    sendEmail(req.body.email,req.body.otp)

})

/* authenticade user before  */
function sendEmail(email, otp) {
    console.log(otp)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'jntokozo195@gmail.com',
            pass: 'kcdabumoyiwrbpyg'
        }
    });

    var mailOptions = {
        from: 'jntokozo195@gmail.com',
        to: email,
        subject: 'OTP confirmation',
        text: `Your OTP is ${otp}. Use it as Viva verification code.`
    };


    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            console.log(error);
            res.send({message:'Unable to send the verification', success:false})
        } else {
            console.log('Email sent: ' + info.response);
            res.send({message:'Email sent: ' + info.response, success:true})
        }
    });
}


const port = process.env.PORT || 3001;
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
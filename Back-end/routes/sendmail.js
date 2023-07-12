const nodemailer = require("nodemailer");
const sendemail = async (req, res) => {
    let testAccount = await nodemailer.createTestAccount();
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        port: 587,
        auth: {
            user: "sharmamanas153@gmail.com",
            pass: "aholnfnjizorlobn"
        }
    });

    let info = await transporter.sendMail({
        from: "bhardwajsaksham377@gmail.com",
        to: req.body.email,
        subject: "no-reply",
        text: "Welcome to DaysOfDogs",
        html: "<h3>Welcome to DaysOfDogs, your ultimate online destination for everything related to our beloved four-legged friends! We are thrilled to have you join our community of passionate dog enthusiasts who share a deep love for these amazing creatures.<br>At DaysOfDogs, we understand that dogs are more than just pets—they are cherished members of our families, loyal companions, and a source of endless joy and inspiration. That's why we've created a platform dedicated to celebrating the wonder and beauty of dogs in all their forms.<br>Once again, welcome to DaysOfDogs! We're thrilled to embark on this exciting journey with you and look forward to creating a pawsitive and enriching experience together.<br><br>Wagging tails and joyful barks,<br><br>Saksham Bhardwaj<br>DaysOfDogs Team</h3>",
    });

    console.log("Message sent: %s", info.messageId);

    res.json(info);
}

module.exports = sendemail;
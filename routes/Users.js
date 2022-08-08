const express = require("express");
var nodemailer = require('nodemailer');
const router = express.Router();
const bcrypt = require("bcrypt");
const { users } = require("../models");
const { sign } = require("jsonwebtoken");
const { validateToken } = require('../middlewares/AuthMiddleware');

router.post("/signup", async (req, res) => {
    const { name, username, password, confirmPassword, status, email } = req.body;
    const user = await users.findOne({ where: { username: username } });
    if (user) {
        res.json({ error: "User Exist" });
    }
    bcrypt.hash(password, 10).then((hash) => {
        users.create({
            name: name,
            username: username,
            password: hash,
            confirmPassword: hash,
            email: email,
            status: status
        });
        console.log("Signed In")
        res.json("Success");
    });
});

router.put("/authOTP/:username", async (req, res) => {
    const username = req.params.username;
    const user = await users.findOne({ where: { username: username } });
    const randomNo = Math.floor(100000 + Math.random() * 900000);
    const userEmail = user.email;
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'riderharsh720@gmail.com',
            pass: 'Momisgreat_123'
        }
    }, []);

    const mailOptions = {
        from: 'riderharsh720@gmail.com',
        to: userEmail,
        subject: 'OTP',
        text: 'Your OTP is ' + randomNo
    };

    transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
            res.json({ error: error });
        } else {
            user.update({ OTP: randomNo }, { where: { username: username } });
            res.json({
                "Email": userEmail,
                "username": user.username,
                "Email sent: ": info.response,
                "OTP": randomNo
            });
        }
    });
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    const user = await users.findOne({ where: { username: username } });
    if (!user) {
        res.json({ error: "User doesn't exist" });
    }
    else {
        bcrypt.compare(password, user.password).then((match) => {
            if (!match) {
                res.json({ error: "Password doesn't match" });
            }
            else {
                const accessToken = sign({ name: user.name, username: user.username }, "importantSecret");
                res.json({ token: accessToken, username: user.username, name: user.name });
            }
        });
    }
});

router.get('/auth', validateToken, (req, res) => {
    res.json(req.user);
});

router.get("/checkOTP/:username", async (req, res) => {
    const username = req.params.username;
    const user = await users.findOne({ where: { username: username } });
    res.json(user);
});

router.put("/changeOTP/:username", async (req, res) => {
    const username = req.params.username;
    const user = await users.findOne({ where: { username: username } });
    user.update({ OTP: 0, confirmPassword: "importantSecret" }, { where: { username: username } });
    res.json("OTP is Used");
});

router.put("/changePassword/:data", async (req, res) => {
    console.log(req.params.data);
    const userData = req.params.data;
    const data = JSON.parse(userData);
    console.log("Username" + data.username);
    const user = await users.findOne({ where: { username: data.username } });
    if (!(user.confirmPassword == "importantSecret")) {
        res.json({ error: "Sent OTP First" })
    }
    else {
        bcrypt.hash(data.password, 10).then((hash) => {
            users.update({ password: hash, confirmPassword: hash }, { where: { username: user.username } });
            res.json("Password Changed Successfully");
        });
    }
});
module.exports = router;
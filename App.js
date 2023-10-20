const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

mongoose.connect('mongodb://localhost:27017/REGISTRATION', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, "connection error"));
db.once('open', function () {
    console.log("connection succeeded");
});

const app = express();
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

const userSchema = new mongoose.Schema({
    name: String,
    email: String,
    password: String
});

const User = mongoose.model('User', userSchema, 'user');

// Registration route
app.post('/sign_up', function (req, res) {
    const { logname, logemail, logpass } = req.body;

    User.findOne({ email: logemail })
        .then(existingUser => {
            if (existingUser) {
                return res.status(400).send('User with this email already exists');
            } else {
                const newUser = new User({
                    name: logname,
                    email: logemail,
                    password: logpass
                });

                newUser.save()
                    .then(() => {
                        console.log("User registered successfully");
                        return res.redirect('/success1.html');
                    })
                    .catch(err => {
                        console.error(err);
                        return res.status(500).send('Error saving user.');
                    });
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('Error during signup.');
        });
});

// Login route
app.post('/log_in', function (req, res) {
    const { logemail, logpass } = req.body;

    User.findOne({ email: logemail, password: logpass })
        .then(user => {
            if (user) {
                console.log("Login successful");
                return res.redirect('/success2.html');
            } else {
                console.log("Invalid email or password");
                return res.status(401).send('Invalid email or password');
            }
        })
        .catch(err => {
            console.error(err);
            return res.status(500).send('Error during login.');
        });
});

app.listen(9000, () => {
    console.log("Server listening at port 9000");
});
const ProfileModel = require("../model/profile");
const arrayify = require('array-back');
const bcrypt = require('bcrypt');

const interests = ["Travel", "Dogs", "Cooking", "Surfing", "Politics", "Cats", "Fitness", "Reading", "Netflix", "Partying"];

exports.landingPage = (req, res) => {
    if (!req.session.profileID) {
        res.render('index.ejs');
    } else {
        res.redirect('/profile');
    }
}



exports.loginPage = (req, res) => {
    if (!req.session.profileID) {
        res.render('login.ejs');
    } else {
        res.redirect('/profile');
    }
}

exports.submitLoginPage = (req, res) => {
    const {
        email,
        password
    } = req.body;

    console.log('password:', password);

    ProfileModel.findOne({
            email: email
        }).exec()
        .then((user) => {
            console.log(user);

            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    console.log('Passwords match');
                    req.session.profileID = user._id; // Set user ID in session
                    res.redirect('/profile'); // Redirect to profile
                } else {
                    console.log('Passwords do not match');
                    return res.status(401).send('Invalid credentials');
                }
            });
        })
        .catch((err) => {
            console.log(err);
        })
}



exports.logOut = (req, res) => {
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}



exports.homePage = (req, res) => {
    if (!req.session.profileID) {
        res.redirect('/');
    } else {
        res.render('home.ejs')
    }
}



exports.profilePage = async (req, res) => {
    try {
        if (!req.session.profileID) {
            res.redirect('/');
        } else {
            const userprofile = await ProfileModel.findById(req.session.profileID);
            console.log(userprofile);

            res.render('profile.ejs', {
                userprofile
            });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.createProfilePage = async (req, res) => {
    if (!req.session.profileID) {
        res.render('create.ejs', {
            interests
        });
    } else {
        res.redirect('/profile');
    }
}

exports.submitProfilePage = (req, res) => {
    const data = req.body;

    bcrypt.hash(data.password, 10, function (err, hashedPassword) {
        // Save user to database with hashed password
        data.password = hashedPassword;
        const newUser = new ProfileModel(data);
        newUser.save()
            .then(() => {
                req.session.profileID = newUser._id;
                res.redirect('/profile');
            });
    });
    console.log(data.password);
    console.log(data);
}

exports.loadEditProfilePage = async (req, res) => {
    try {
        console.log(req.session.profileID);
        const userprofile = await ProfileModel.findById(req.session.profileID);

        res.render('edit.ejs', {
            userprofile,
            interests
        });
    } catch (error) {
        console.log(error);
    }
}

exports.editProfilePage = async (req, res) => {
    try {
        const query = {
            _id: req.session.profileID
        };

        // Retrieve the existing profile record from the database
        let profile = await ProfileModel.findOne(query);

        // Update only the fields that are being changed
        profile.name = req.body.name;
        profile.age = req.body.age;
        profile.country = req.body.country;
        profile.bio = req.body.bio;
        profile.interests = arrayify(req.body.interests);

        // Save the updated profile back to the database
        await profile.save();

        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}
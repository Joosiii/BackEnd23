const ProfileModel = require("../model/profile");
const arrayify = require('array-back');

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

    ProfileModel.findOne({
            $or: [{
                email
            }, {
                email: email
            }]
        }).exec()
        .then((user) => {
            // If user not found, return error message
            if (!user) {
                return res.status(401).send('Invalid credentials');
            } else {
                req.session.profileID = user._id; // Set user ID in session
                res.redirect('/profile'); // Redirect to profile
            }
        })
        .catch((err) => {
            console.log(err);
        })
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

exports.submitProfilePage = async (req, res) => {
    try {
        const data = req.body;

        const profile = new ProfileModel(data);
        const savedProfile = await profile.save();

        req.session.profileID = savedProfile._id;

        console.log("De opgeslagen id: " + req.session.profileID);
        console.log("De session is: " + req.session);

        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
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
        let editprofile = {
            name: req.body.name,
            age: req.body.age,
            country: req.body.country,
            bio: req.body.bio,
            interests: arrayify(req.body.interests)
        }

        const query = {
            _id: req.session.profileID
        };

        await ProfileModel.replaceOne(query, editprofile);

        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}
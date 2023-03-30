const ProfileModel = require("../model/profile");

const interests = ["Travel", "Dogs", "Cooking", "Surfing"];

exports.landingPage = (req, res) => {
    res.render('index.ejs');
}

exports.profilePage = async (req, res) => {
    try {
        const userprofile = await ProfileModel.findOne().sort({
            $natural: -1
        }).limit(1);
        console.log(userprofile);

        res.render('profile.ejs', {
            userprofile
        });
    } catch (error) {
        console.log(error);
    }
}

exports.createProfilePage = async (req, res) => {
    res.render('create.ejs', {
        interests
    });
}

exports.submitProfilePage = async (req, res) => {
    try {
        const data = req.body;

        const profile = new ProfileModel(data);
        await profile.save();

        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}
const { ProfileSchema } = require('../model/index');

const interests = ["Travel", "Dogs", "Cooking", "Surfing"];

exports.landingPage = (req, res) => {
    res.render('index.ejs')
}

exports.profilePage = (req, res) => {
    let userprofile = {
        name: "Hans",
        age: "30",
        country: "Nederland",
        bio: "Hey hallo",
        interests: interests
    }

    res.render('profile.ejs', {
        userprofile
    })
}

exports.createProfilePage = async (req, res) => {
    console.log('@@-- req.body', req.body);
    const data = req.body;

    const profile = new ProfileSchema(data);
    await profile.save();
    res.render('create.ejs', {
        interests
    })
}
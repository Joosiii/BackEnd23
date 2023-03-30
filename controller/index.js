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

exports.createProfilePage = (req, res) => {
    res.render('create.ejs', {
        interests
    })
}
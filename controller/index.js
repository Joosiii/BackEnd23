const matchesModel = require("../model/matches");
const ProfileModel = require("../model/profile");
const arrayify = require('array-back');
const bcrypt = require('bcrypt');

const interests = ["Travel", "Dogs", "Cooking", "Surfing", "Politics", "Cats", "Fitness", "Reading", "Netflix", "Partying"];
const breed = ["heidewachter", ""]

exports.landingPage = (req, res) => {
    if (!req.session.profileID) {
        const title = "Match-A-Pet";
        res.render('index.ejs', {
            title
        });
    } else {
        res.redirect('/home');
    }
}



exports.loginPage = (req, res) => {
    if (!req.session.profileID) {
        const title = "Login";
        res.render('login.ejs', {
            title,
            foutmelding: null
        });
    } else {
        res.redirect('/home');
    }
}

exports.submitLoginPage = (req, res) => {
    const {
        email,
        password
    } = req.body;

    // Vind een profiel met het ingevoerde emailadres
    ProfileModel.findOne({
            email: email
        }).exec()
        .then((user) => {
            if (!user) {
                // Redirect naar login als de e-mail niet in de database staat
                res.render('login.ejs', {
                    foutmelding: 'Invalid email or password...',
                    title: "Login"
                });
            }

            // Het opgeslagen password wordt met bcrypt vergeleken met het ingevoerde password
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
                    // De id van de betreffende user wordt in de sessie opgeslagen zodat deze later gebruikt kan worden
                    req.session.profileID = user._id;
                    res.redirect('/home');
                } else {
                    // Redirect naar login als de password niet correct is
                    res.render('login.ejs', {
                        foutmelding: 'Invalid email or password...',
                        title: "Login"
                    });
                }
            });
        })
        .catch((err) => {
            console.log(err);
        })
}



exports.logOut = (req, res) => {
    // De session wordt gedestroyed als de logout route wordt aangeroepen via de knop op de homepage
    req.session.destroy(function (err) {
        if (err) {
            console.log(err);
        } else {
            res.redirect('/');
        }
    });
}



exports.homePage = async (req, res) => {
    if (!req.session.profileID) {
        res.redirect('/');
    } else {
        // De naam van de user wordt opgehaald en weergegeven op de pagina
        const userprofile = await ProfileModel.findById(req.session.profileID);

        const name = userprofile.name;

        const title = "Home";
        res.render('home.ejs', {
            title,
            name
        })
    }
}



exports.profilePage = async (req, res) => {
    try {
        if (!req.session.profileID) {
            res.redirect('/');
        } else {
            // Het profiel van de user wordt opgehaald en weergegeven op de pagina
            const userprofile = await ProfileModel.findById(req.session.profileID);

            const title = "My Profile";
            res.render('profile.ejs', {
                userprofile,
                title
            });
        }
    } catch (error) {
        console.log(error);
    }
}

exports.createProfilePage = async (req, res) => {
    if (!req.session.profileID) {
        const title = "Create Profile";
        res.render('create.ejs', {
            interests,
            title
        });
    } else {
        res.redirect('/profile');
    }
}

exports.submitProfilePage = (req, res) => {
    const data = req.body;

    bcrypt.hash(data.password, 10, function (err, hashedPassword) {
        // Het profiel wordt opgeslagen in de database met een gehashed wachtwoord
        data.password = hashedPassword;
        const newUser = new ProfileModel(data);
        newUser.save()
            .then(() => {
                req.session.profileID = newUser._id;
                res.redirect('/profile');
            });
    });
}

exports.loadEditProfilePage = async (req, res) => {
    try {
        // Het profiel wordt opgehaald om geedit te worden, de gegevens worden automatisch in de invoervelden gezet
        const userprofile = await ProfileModel.findById(req.session.profileID);

        const title = "Edit Profile";
        res.render('edit.ejs', {
            userprofile,
            interests,
            title
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

        let profile = await ProfileModel.findOne(query);

        // Alleen de aanpasbare velden moeten geupdate worden, zodat de email en password ongedeerd blijven
        profile.name = req.body.name;
        profile.age = req.body.age;
        profile.country = req.body.country;
        profile.bio = req.body.bio;
        profile.interests = arrayify(req.body.interests);

        // Met .save worden de velden die hierboven gedeclareerd zijn vervangen en geupdate in de database
        await profile.save();

        res.redirect('/profile');
    } catch (error) {
        console.log(error);
    }
}

exports.discoverPage = async (req, res) => {
    const query = {
        seen: false
    };

    let matchType = null

    if (!req.session.profileID) {
        res.redirect('/');
    } else {
        if (Object.hasOwn(req.query, 'type')) {
            matchType = req.query.type
            query.type = matchType
        }

        const match = await matchesModel.findOne(query);

        const title = "Discover";
        res.render('discover.ejs', {
            title,
            match,
            matchType
        });
    }
}

exports.loadfilterPage = (req, res) => {
    if (!req.session.profileID) {
        res.redirect('/');
    } else {
        const title = "Filter";
        res.render('filter.ejs', {
            title
        });
    }
}


exports.filterPage = async (req, res) => {
    res.redirect(`/discover?type=${req.body.type_filter}`)
}

exports.markMatchAsSeen = async (req, res) => {
    const matchId = req.body.matchid;

    try {
        await matchesModel.findByIdAndUpdate(matchId, {
            seen: true
        }, {
            returnDocument: 'after'
        })
    } catch (error) {
        console.log(error)
    }

    const matchType = req.body.matchType

    if (matchType) {
        return res.redirect(`/discover?type=${matchType}`)
    }

    return res.redirect(`/discover`)
}
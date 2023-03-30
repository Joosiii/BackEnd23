const express = require('express');
const session = require('express-session');
const {
    connectDB
} = require('./db/index');

const app = express()
    .use(express.urlencoded({
        extended: true
    }))
    .set('view engine', 'ejs')
    .set('views', 'views')
const dotenv = require('dotenv').config();

connectDB();

//////////////////////
// Define Variables //
//////////////////////
const port = process.env.PORT || 4000;


//////////////////
// Static Files //
//////////////////
app.use(express.static('public'));
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        secure: true
    }
}));


///////////////////////////
// Set Templating Engine //
///////////////////////////
app.set('view engine', 'ejs');


///////////////////////////
///////// Routes //////////
///////////////////////////
const appRoutes = require('./routes/index')
app
    .get('/', appRoutes)
    .get('/profile', appRoutes)
    .get('/create', appRoutes)
    .post('/create', appRoutes)


////////////////
// Error Page //
////////////////

// De route voor de error status 404 wordt aangemaakt, wanneer er een verkeerde route in de url wordt ingevuld wordt deze pagina laten zien
app.use((req, res, next) => {
    console.log("Error 404");
    const title = "Error 404";
    res.status(404).render('404', {
        title
    });
})



//////////////////
// Start Server //
//////////////////

// De server wordt opgestart, hierbij wordt de port waarop deze wordt gehost gelogt in de console, en wordt er gecheckt of de database is geconnect, waarna de gebruiker ook hierover wordt ingelicht via de console
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);

    connectDB().then(() => console.log('We have a connection to Mongo!'));
})
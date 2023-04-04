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
const cookieParser = require('cookie-parser');
const MongoStore = require('connect-mongo');

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

app.use(cookieParser());
app.use(session({
    secret: process.env.SESSION_SECRET,
    store: MongoStore.create({
        mongoUrl: process.env.DB_URI,
    }),
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24
    },
    resave: false
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
    .get('/login', appRoutes)
    .post('/login', appRoutes)
    .get('/logout', appRoutes)
    .get('/home', appRoutes)
    .get('/profile', appRoutes)
    .get('/create', appRoutes)
    .post('/create', appRoutes)
    .get('/edit', appRoutes)
    .post('/edit', appRoutes)


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
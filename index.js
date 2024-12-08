const express = require('express');
const app = express();

const session = require('express-session');
const path = require('path');

app.set('view engine', 'ejs');

const homeRoutes = require('./routers/home');
const authRoutes = require('./routers/auth');
const adminRoutes = require('./routers/admin');
const sequelize = require('./data/db');

// Middleware: Body parsing
app.use(express.urlencoded({ extended: true }));

// Middleware: Session
app.use(
    session({
        secret: 'bst4_123', 
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24, 
        },
    })
);

// Static dosyalar
app.use('/libs', express.static(path.join(__dirname, 'node_modules')));
app.use('/static', express.static(path.join(__dirname, 'public')));

// Rotalar
app.use('/', homeRoutes);
app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);


const relations = require('./models/relations');
const dummyData = require('./data/dummyData');
relations.relations();

async function data() {
    await sequelize.sync({ force: true });
    await dummyData.dummyData();
}

data();

// Sunucu dinleme
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

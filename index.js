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
        secret: 'bst4_123', // Güçlü bir gizli anahtar kullanın
        resave: false, // Her istekte yeniden kaydedilmesini engeller
        saveUninitialized: false, // Boş oturumların kaydedilmesini engeller
        cookie: {
            secure: false, // HTTPS için true yapabilirsiniz
            maxAge: 1000 * 60 * 60 * 24, // 1 gün geçerli
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

// Veritabanı modelleri ve ilişkileri
const admin = require('./models/admin');
const customer = require('./models/customer');
const menu = require('./models/menu');
const order = require('./models/order');
const orderDetail = require('./models/orderDetail');

const relations = require('./models/relations');
const dummyData = require('./data/dummyData');
relations.relations();

async function data() {
    await sequelize.sync({ force: false });
    await dummyData.dummyData();
}

data();

// Sunucu dinleme
app.listen(3000, () => {
    console.log('Listening on port 3000');
});

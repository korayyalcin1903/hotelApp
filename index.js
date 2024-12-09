const express = require('express');
const app = express();
const mysql = require('mysql2');

const port = process.env.PORT || 3000;

const session = require('express-session');
const path = require('path');

const config = require('./config');

app.set('view engine', 'ejs');

const homeRoutes = require('./routers/home');
const authRoutes = require('./routers/auth');
const adminRoutes = require('./routers/admin');
const sequelize = require('./data/db');

// Middleware: Body parsing
app.use(express.urlencoded({ extended: true }));



const pool = mysql.createPool({
    host: config.db.host,   
    user: config.db.user,      
    password: config.db.password,        
    database: config.db.database,
});

let lastChecked = new Date(0);

async function checkForNewOrders() {
  try {
    const [rows] = await pool.promise().query('SELECT * FROM orders WHERE createdAt > ?', [lastChecked]);
    if (rows.length > 0) {
      console.log('Yeni sipariş var!');
      // Burada bildirim gönderme işlemleri (email, SMS, etc.)
      lastChecked = new Date(); // Son kontrol zamanını güncelle
    }
  } catch (error) {
    console.error(error);
  }
}

// Belirli bir aralıkta kontrol et
setInterval(checkForNewOrders, 5000); // Her 5 saniyede bir kontrol et

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


// Veritabanı modelleri ve ilişkileri
const customer = require('./models/customer');
// const menu = require('./models/menu');
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
app.listen(port, () => {
    console.log('Listening on port 3000');
});

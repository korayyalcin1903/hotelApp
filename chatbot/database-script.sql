CREATE DATABASE IF NOT EXISTS hotel_db;

USE hotel_db;

-- Menü öğeleri tablosunu oluştur
CREATE TABLE IF NOT EXISTS menu_items (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    availability BOOLEAN NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Mesajlar tablosunu oluştur
CREATE TABLE IF NOT EXISTS messages (
    message_id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    message TEXT NOT NULL,
    createdAt DATETIME DEFAULT CURRENT_TIMESTAMP
);

-- Menü öğeleri verilerini ekle
INSERT INTO menu_items (name, description, price, availability, createdAt, updatedAt) VALUES
('Margherita Pizza', 'Domates, mozzarella peyniri, fesleğen, un, maya, zeytinyağı', 8.99, TRUE, NOW(), NOW()),
('Cheeseburger', 'Izgara dana köftesi, cheddar peyniri, marul, domates, un, maya, süt, yumurta', 10.50, TRUE, NOW(), NOW()),
('Spaghetti Bolognese', 'Kıyma sosu, spagetti makarna, domates, un, yumurta, soğan, sarımsak', 12.00, FALSE, NOW(), NOW()),
('Tavuklu Sezar Salatası', 'Izgara tavuk, Romaine marulu, Sezar sosu, parmesan peyniri, kruton (ekmek), süt, yumurta, ançuez', 9.75, TRUE, NOW(), NOW()),
('Sebzeli Wok', 'Soğan, biber, kabak, havuç, soya sosu, sarımsak, zeytinyağı', 7.25, TRUE, NOW(), NOW()),
('Istakoz Çorbası', 'Istakoz, krema, tereyağı, un, sarımsak, soğan, deniz tuzu', 15.99, FALSE, NOW(), NOW()),
('Izgara Somon', 'Somon fileto, limon, tereyağı, zeytinyağı, sarımsak, deniz tuzu', 18.50, TRUE, NOW(), NOW()),
('Patates Kızartması', 'Patates, ayçiçek yağı, tuz', 3.50, TRUE, NOW(), NOW()),
('Çikolatalı Sufle', 'Çikolata, tereyağı, un, yumurta, şeker, süt', 6.25, FALSE, NOW(), NOW()),
('Caprese Salatası', 'Taze mozzarella, domates, fesleğen, zeytinyağı, balsamik sos', 7.99, TRUE, NOW(), NOW());

-- Mesajlar verilerini ekle
INSERT INTO messages (user_id, message, createdAt) VALUES
(1, 'Merhaba, siparişim ne zaman gelir?', NOW()),
(2, 'Çorba biraz soğuk geldi, tekrar ısıtılabilir mi?', NOW()),
(3, 'Patates kızartması çok lezzetliydi, teşekkürler!', NOW());

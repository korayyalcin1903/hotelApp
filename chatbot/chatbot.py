import datetime
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import app

mysql = MySQL(app)
CORS(app)

allergen_list = []

def menu_list(allergen_list):
    cursor = mysql.connection.cursor()
    cursor.execute("SELECT * FROM hotel_db.menu_items WHERE availability = TRUE")
    yemek_listesi = cursor.fetchall()


    uygun_yemekler = [
        yemek for yemek in yemek_listesi
        if not any(allergen in yemek['description'].lower() for allergen in allergen_list)
    ]

    if uygun_yemekler:
        return jsonify({
            'fulfillmentText': "Uygun yemekler:",
            'payload': {
                'menu': uygun_yemekler
            }
        })
    else:
        return jsonify({
            'fulfillmentText': "Alerjenleriniz nedeniyle uygun bir yemek bulunmamaktadır."
        })

############# Menü #######################################
@app.route('/alerji', methods=['POST'])
def alerji():
    req = request.get_json(silent=True, force=True)
    user_message = req.get('queryResult').get('queryText')
    siparisler = request.get_json().get('queryResult').get('id_list')
    totalPrice = request.get_json().get('queryResult').get('totalPrice')
    customer_id = request.get_json().get('queryResult').get('customer_id')
    roomNumber = request.get_json().get('queryResult').get('roomNumber')

    global allergen_list

    response_text = "Merhaba, herhangi bir alerjiniz var mı?"

    if siparisler:
        cursor = mysql.connection.cursor()
        
        # `orders` tablosuna bir sipariş ekleme
        cursor.execute(
            "INSERT INTO hotel_db.orders (totalPrice, customer_id, roomNumber, createdAt, updatedAt) VALUES (%s, %s, %s, %s, %s)",
            (totalPrice, customer_id, roomNumber, datetime.datetime.now(), datetime.datetime.now())
        )
        
        # Eklenen siparişin `order_id` değerini al
        order_id = cursor.lastrowid
        
        for siparis in siparisler:
            menu_item_id = siparis.get('menu_item_id')
            quantity = siparis.get('quantity')
            price = siparis.get('price')
            
            # `order_details` tablosuna her sipariş detayı ekleme
            cursor.execute(
                "INSERT INTO hotel_db.order_details (quantity, menu_item_id, price, order_id, createdAt, updatedAt) VALUES (%s, %s, %s, %s, %s, %s)",
                (quantity, menu_item_id, price, order_id, datetime.datetime.now(), datetime.datetime.now())
            )
        
        # Veritabanı işlemini tamamla
        mysql.connection.commit()
        cursor.close()
        
        return jsonify({'fulfillmentText': "Siparişiniz hazırlanıyor."})

    if any(greeting in user_message.lower() for greeting in ["merhaba", "günaydın", "tünaydın", "iyi akşamlar"]):
        return jsonify({'fulfillmentText': response_text})

    if user_message.lower() not in ["merhaba", "yemek listesi", "menüyü göster", "ne yemek var", "yemekleri listele", "menü", "yemek"]:
        allergen_list.append(user_message.lower())
        if user_message.lower() in "yok":
            return menu_list(allergen_list)
        else:
            return jsonify({'fulfillmentText': f"Alerjiniz kaydedildi: {user_message}."})
            

    if any(keyword in user_message for keyword in ["yemek listesi", "menüyü göster", "ne yemek var", "yemekleri listele", "menü", "yemek"]):
        return menu_list(allergen_list)
    

    return jsonify({'fulfillmentText': response_text})

############# Oda Servis #######################################

def handle_service_message(user_id, user_message):
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO messages (user_id, message, createdAt, updatedAt) VALUES (%s, %s, %s, %s)", (user_id, user_message, datetime.datetime.now(), datetime.datetime.now()))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'fulfillmentText': "Mesajınız iletilmiştir."})

@app.route('/handle_message', methods=['POST'])
def handle_message():
    req = request.get_json(silent=True, force=True)
    user_message = req.get('queryResult').get('queryText')
    user_id = req.get('queryResult').get('user_id')

    handle_service_message(user_id, user_message)
    return jsonify({'fulfillmentText': "Mesajınız iletilmiştir."})


if __name__ == '__main__':
    app.run(debug=True)



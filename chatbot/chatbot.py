import datetime
from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from flask_cors import CORS
from config import app

mysql = MySQL(app)
CORS(app)

dbName = "sql7750882"

from flask import jsonify

def menu_list(user_id):
    cursor = mysql.connection.cursor()

    cursor.execute(f"SELECT allergen FROM {dbName}.user_allergens WHERE user_id = %s", (user_id,))
    user_allergens = [row['allergen'] for row in cursor.fetchall()]

    # Yemek listesini al
    cursor.execute(f"SELECT * FROM {dbName}.menu_items WHERE availability = TRUE")
    yemek_listesi = cursor.fetchall()

    uygun_yemekler = [
        yemek for yemek in yemek_listesi
        if not any(allergen.lower() in yemek['description'].lower() for allergen in user_allergens)
    ]

    # Sonuçları döndür
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
    user_id = request.get_json().get('queryResult').get('user_id')

    response_text = "Merhaba, herhangi bir alerjiniz var mı?"

    if user_message.lower() == "":
        return menu_list(user_id)

    if any(greeting in user_message.lower() for greeting in ["temizle"]):
        cursor = mysql.connection.cursor()
        cursor.execute(f"DELETE FROM {dbName}.user_allergens WHERE user_id = %s", (user_id,))
        mysql.connection.commit()

        return jsonify({'fulfillmentText': "Tüm alerjenler başarıyla silindi."})

    if siparisler:
        cursor = mysql.connection.cursor()
        
        cursor.execute(f"INSERT INTO {dbName}.orders (totalPrice, customer_id, roomNumber, createdAt, updatedAt) VALUES (%s, %s, %s, %s, %s)",
            (totalPrice, customer_id, roomNumber, datetime.datetime.now(), datetime.datetime.now())
        )
        
        order_id = cursor.lastrowid
        
        for siparis in siparisler:
            menu_item_id = siparis.get('menu_item_id')
            quantity = siparis.get('quantity')
            price = siparis.get('price')
            
            cursor.execute(f"INSERT INTO {dbName}.order_details (quantity, menu_item_id, price, order_id, createdAt, updatedAt) VALUES (%s, %s, %s, %s, %s, %s)",
                (quantity, menu_item_id, price, order_id, datetime.datetime.now(), datetime.datetime.now())
            )
        
        mysql.connection.commit()
        cursor.close()
        
        return jsonify({'fulfillmentText': "Siparişiniz hazırlanıyor."})

    if any(greeting in user_message.lower() for greeting in ["merhaba", "günaydın", "tünaydın", "iyi akşamlar"]):
        return jsonify({'fulfillmentText': response_text})

    if user_message.lower() not in ["merhaba", "yemek listesi", "menüyü göster", "ne yemek var", "yemekleri listele", "menü", "yemek"]:

        cursor = mysql.connection.cursor()

        if user_message.lower() == "yok":
            return menu_list(user_id)
        else:
            try:
                cursor.execute(f"INSERT INTO {dbName}.user_allergens (user_id, allergen) VALUES (%s, %s)",
                    (user_id, user_message.lower())
                )
                mysql.connection.commit()

                return jsonify({'fulfillmentText': f"Alerjiniz kaydedildi: {user_message}."})
            except Exception as e:
                return jsonify({'fulfillmentText': f"Alerji kaydedilirken bir hata oluştu: {str(e)}"})
            

    if any(keyword in user_message for keyword in ["yemek listesi", "menüyü göster", "ne yemek var", "yemekleri listele", "menü", "yemek"]):
        return menu_list(user_id)
    

    return jsonify({'fulfillmentText': response_text})

############# Oda Servis #######################################

def handle_service_message(user_id, user_message):
    cursor = mysql.connection.cursor()
    cursor.execute(f"INSERT INTO messages (user_id, message, createdAt, updatedAt) VALUES (%s, %s, %s, %s)", (user_id, user_message, datetime.datetime.now(), datetime.datetime.now()))
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


@app.route('/test_connection')
def test_connection():
    try:
        cursor = mysql.connection.cursor()
        cursor.execute(f"SELECT 1")
        return "Bağlantı başarılı!"
    except Exception as e:
        return f"Bağlantı hatası: {e}"

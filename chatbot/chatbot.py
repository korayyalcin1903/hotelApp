from flask import Flask, request, jsonify
from flask_mysqldb import MySQL
from config import app

mysql = MySQL(app)

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

    global allergen_list

    response_text = "Merhaba, herhangi bir alerjiniz var mı?"

    if any(greeting in user_message.lower() for greeting in ["merhaba", "günaydın", "tünaydın", "iyi akşamlar"]):
        return jsonify({'fulfillmentText': response_text})

    if user_message.lower() not in ["merhaba", "yemek listesi", "menüyü göster", "ne yemek var", "yemekleri listele", "menü", "yemek"]:
        allergen_list.append(user_message.lower())
        if user_message.lower() in "yok":
            return menu_list(allergen_list)
        else:
            return jsonify({'fulfillmentText': f"Alerjiniz kaydedildi: {user_message}. Başka bir alerjiniz var mı?"})
            

    if any(keyword in user_message for keyword in ["yemek listesi", "menüyü göster", "ne yemek var", "yemekleri listele", "menü", "yemek"]):
        return menu_list(allergen_list)

    return jsonify({'fulfillmentText': response_text})

############# Oda Servis #######################################

def handle_service_message(user_id, user_message):
    cursor = mysql.connection.cursor()
    cursor.execute("INSERT INTO messages (user_id, message) VALUES (%s, %s)", (user_id, user_message))
    mysql.connection.commit()
    cursor.close()

    return jsonify({'fulfillmentText': "Mesajınız iletilmiştir."})

@app.route('/handle_message', methods=['POST'])
def handle_message():
    user_id = 1
    req = request.get_json(silent=True, force=True)
    user_message = req.get('queryResult').get('queryText')

    handle_service_message(user_id, user_message)
    return jsonify({'fulfillmentText': "Mesajınız iletilmiştir."})


if __name__ == '__main__':
    app.run(debug=True)

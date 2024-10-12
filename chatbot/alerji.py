from flask import Flask, request, jsonify
import json

app = Flask(__name__)

with open('./menu.json', 'r', encoding='utf-8') as f:
    menu_data = json.load(f)

# Alerji bilgisi tutmak için bir global değişken
allergen_list = []

@app.route('/webhook', methods=['POST'])
def webhook():
    req = request.get_json(silent=True, force=True)
    user_message = req.get('queryResult').get('queryText')

    global allergen_list
    response_text = "Herhangi bir alerjiniz var mı?"

    # "merhaba" dediyse yanıt ver
    if "merhaba" in user_message.lower():
        return jsonify({'fulfillmentText': response_text})

    # Kullanıcının alerji bilgisi vermesi
    if user_message.lower() not in ["merhaba", "yemek listesi", "menüyü göster", "ne yemek var", "yemekleri listele", "menü", "yemek"]:
        allergen_list.append(user_message.lower())  # Kullanıcının verdiği alerji bilgisini ekle
        return jsonify({'fulfillmentText': f"Alerjiniz kaydedildi: {user_message}. Başka bir alerjiniz var mı?"})

    # Yemek listesini gösterme
    if any(keyword in user_message for keyword in ["yemek listesi", "menüyü göster", "ne yemek var", "yemekleri listele", "menü", "yemek"]):
        yemek_listesi = []
        for item in menu_data["json_menu"]:
            if not any(allergen.lower() in item["description"].lower() for allergen in allergen_list):
                yemek_listesi.append(item)

        if yemek_listesi:
            return jsonify({
                'fulfillmentText': "İşte uygun yemekler:",
                'payload': {
                    'menu': yemek_listesi  # Yemek listesini payload içinde döndür
                }
            })
        else:
            return jsonify({
                'fulfillmentText': "Alerjenleriniz nedeniyle uygun bir yemek bulunmamaktadır."
            })

    return jsonify({'fulfillmentText': response_text})

if __name__ == '__main__':
    app.run(debug=True)

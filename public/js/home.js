var menuButton = document.getElementById('menu')
var servisButton = document.getElementById('servis')
var content = document.getElementById('content')
var mesaj = document.getElementById('mesaj')
var mesajButton = document.getElementById('mesajButton')

window.onload = () => {
    mesaj.disabled = true;
}

servisButton.onclick = () => {
    servisButton.classList.remove('btn-dark')
    servisButton.classList.add('btn-success')
    servisButton.disabled = true;
    menuButton.disabled = true;
    content.insertAdjacentHTML('beforeend', `<div class="border w-75 ms-auto p-2 mb-3 rounded bg-dark">Lütfen mesajınızı giriniz.</div>`)
    mesaj.disabled = false;
}

mesajButton.onclick = () => {
    mesaj.innerHTML = "";
    if(servisButton.classList.contains('btn-success')){
        oda_servis(mesaj.value).then((message) => console.log(message))
        content.insertAdjacentHTML('beforeend', `<div class="border w-75 ms-auto p-2 mb-3 rounded bg-dark">Mesajınız iletilmiştir.</div>`)
    }

    var evet = document.querySelector('.evet');

    if(evet.classList.contains('btn-warning')){
        menuList(mesaj.value).then((messages) => {
            content.insertAdjacentHTML('beforeend', `<div class="border w-75 ms-auto p-2 mb-3 rounded bg-dark">${messages.fulfillmentText}</div>`)
            mesaj.innerHTML = "";
        })
        menuList("menü").then((menu) => {
            menu.payload.menu.forEach(food => {
                content.insertAdjacentHTML('beforeend', `<div class="d-flex border-bottom">
                                                            <div class="form-check col-12">
                                                                <input class="form-check-input col-2" type="checkbox" value="${food.id}" id="menu-${food.id}">
                                                                <label class="form-check-label col-6">
                                                                    ${food.name}
                                                                </label>
                                                                <label class="form-check-label col-4">
                                                                    ${food.price}
                                                                </label>
                                                            </div>
                                                        </div>`)
                                                    });
                content.insertAdjacentHTML('beforeend', `<button class="btn btn-outline-success mt-3" id="siparisVer"> Sipariş ver </button>`)
        })
    }

    mesaj.disabled = true;
}

async function menuList(user_message) {
    const requestBody = {
        queryResult: {
            queryText: user_message
        }
    };
    try {
        const response = await fetch('http://127.0.0.1:5000/alerji', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Flask API yanıt vermedi.');
        }

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Mesajlar alınırken hata oluştu:', error);
    }

}

menuButton.onclick = () => {
    menuButton.classList.remove('btn-dark');
    menuButton.classList.add('btn-success');
    menuButton.disabled = true;
    servisButton.disabled = true;

    if (menuButton.classList.contains('btn-success')) {
        menuList("merhaba").then((messages) => {
            content.insertAdjacentHTML('beforeend', `<div class="border w-75 ms-auto p-2 mb-3 rounded bg-dark">${messages.fulfillmentText}</div>`);
            content.insertAdjacentHTML('beforeend', `
                                                        <div class="row mx-md-5 mb-3 justify-content-center">
                                                            <button class="col-5 btn btn-danger border mx-1 evet">
                                                                Evet
                                                            </button>
                                                            <button class="col-5 btn btn-success border mx-1 hayir">
                                                                Hayır
                                                            </button>
                                                        </div>`
                                                    );

            var evet = document.querySelector('.evet');
            var hayir = document.querySelector('.hayir');

            evet.onclick = () => {
                mesaj.innerHTML = "";
                mesaj.disabled = false;
                evet.disabled = true
                evet.classList.remove('btn-danger')
                evet.classList.add('btn-warning')
                content.insertAdjacentHTML('beforeend', `<div class="border w-75 ms-auto p-2 mb-3 rounded bg-dark">Lütfen alerjinizi giriniz.</div>`);
            };

            hayir.onclick = () => {
                evet.disabled = true;
                hayir.disabled = true;
                menuList("menü").then((menu) => {
                    menu.payload.menu.forEach(food => {
                        content.insertAdjacentHTML('beforeend', `<div class="d-flex border-bottom">
                                                                    <div class="form-check col-12">
                                                                        <input class="form-check-input col-2" type="checkbox" value="${food.id}" id="menu-${food.id}">
                                                                        <label class="form-check-label col-6">
                                                                            ${food.name}
                                                                        </label>
                                                                        <label class="form-check-label col-4">
                                                                            ${food.price}
                                                                        </label>
                                                                    </div>
                                                                </div>`)
                                                            });
                content.insertAdjacentHTML('beforeend', `<button class="btn btn-outline-success mt-3" id="siparisVer"> Sipariş ver </button>`)
                })
            };
        });
    }
};


let totalPrice = 0;
content.addEventListener('click', (e) => {
    if (e.target && e.target.id === 'siparisVer') {
        e.preventDefault();
        
        let selectedItems = [];
        
        // Menü verilerini alalım
        menuList("menü").then((menu) => {
            menu.payload.menu.forEach(food => {
                const checkbox = document.getElementById("menu-" + food.id);
                
                // Checkbox seçiliyse, öğe eklenir
                if (checkbox.checked) {
                    selectedItems.push({
                        menu_item_id: food.id,
                        quantity: 1,  // Varsayılan quantity = 1
                        price: food.price
                    });
                }
            });

            // Seçilen ürünleri konsola yazdıralım
            console.log("Seçilen ürünler:", selectedItems);
            console.log(selectedItems.length)
            selectedItems.forEach(item => {
                totalPrice += item.price
            });

            if(selectedItems.length >0 && totalPrice > 0){
                siparis(totalPrice, selectedItems)
                console.log(totalPrice, selectedItems, "Sipariş başarıyla gönderildi")
                content.innerHTML = "";
                content.insertAdjacentHTML("beforeend", `<div class="border w-75 ms-auto p-2 mb-3 rounded bg-dark">Siparişiniz iletilmiştir.</div>`)
                setTimeout(() => {
                    window.location.reload();
                }, 3000);
            }
        });


    }
});



async function oda_servis(user_message) {
    const requestBody = {
        queryResult: {
            queryText: user_message
        }
    };
    try {
        const response = await fetch('http://127.0.0.1:5000/handle_message', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Flask API yanıt vermedi.');
        }

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Mesajlar alınırken hata oluştu:', error);
    }

}

async function siparis(totalPrice, siparis_listesi) {
    const requestBody = {
        "queryResult": {
          "queryText": "siparis",
          "totalPrice": totalPrice,
          "customer_id": 2,
          "roomNumber": 103,
          "id_list": [
            
          ]
        }
      };

      siparis_listesi.forEach(item => {
        requestBody.queryResult.id_list.push({
          menu_item_id: item.menu_item_id,
          quantity: item.quantity,
          price: item.price
        });
      });

    try {
        const response = await fetch('http://127.0.0.1:5000/alerji', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(requestBody)
        });

        if (!response.ok) {
            throw new Error('Flask API yanıt vermedi.');
        }

        const data = await response.json();

        return data
    } catch (error) {
        console.error('Mesajlar alınırken hata oluştu:', error);
    }

}
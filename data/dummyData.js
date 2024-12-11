const Customer = require('../models/customer')
const Menu = require('../models/menu')
const Message = require('../models/message')
const Order = require('../models/order')
const OrderDetail = require('../models/orderDetail')
const UserAllergen = require('../models/user_allergen')

exports.dummyData = async () => {
    if(await Customer.count() === 0) {

        const customers = await Customer.bulkCreate([
            {
                "name": "admin",
                "username": "admin",
                "password": "1234",
                "roomNumber": 0,
                "phone": 0,
                "isAdmin": 1
            },
            {
                "name": "Ali Yılmaz",
                "username": "ali.yilmaz",
                "password": "1234",
                "roomNumber": 101,
                "phone": 5551234567,
                "isAdmin": 0
            },
            {
                "name": "Ayşe Demir",
                "username": "ayse.demir",
                "password": "1234",
                "roomNumber": 102,
                "phone": 5559876543,
                "isAdmin": 0
            },
            {
                "name": "Mehmet Öztürk",
                "username": "mehmet.ozturk",
                "password": "passw0rd789",
                "roomNumber": 103,
                "phone": 5554567890,
                "isAdmin": 0
            }
        ])

        const orders = await Order.bulkCreate([
            {
                "totalPrice": 150.75,
                "customer_id": 2,
                "roomNumber": 101
            },
            {
                "totalPrice": 89.50,
                "customer_id": 1,
                "roomNumber": 101
            },
            {
                "totalPrice": 0.00,
                "customer_id":3,
                "roomNumber": 101
            }
        ]
        )

        const orderDetails = await OrderDetail.bulkCreate([
            {
                "quantity": 2,
                "menu_item_id": 1,
                "price": 50.00,
                "order_id": 1
            },
            {
                "quantity": 1,
                "menu_item_id": 2,
                "price": 30.50,
                "order_id": 2
            },
            {
                "quantity": 5,
                "menu_item_id": 2,
                "price": 30.50,
                "order_id": 1
            }
        ]
        )

        const menu_items = await Menu.bulkCreate([
            {
                name: 'Margherita Pizza',
                description: 'Domates, mozzarella peyniri, fesleğen, un, maya, zeytinyağı',
                price: 8.99,
                availability: true,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'Cheeseburger',
                description: 'Izgara dana köftesi, cheddar peyniri, marul, domates, un, maya, süt, yumurta',
                price: 10.50,
                availability: true,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'Spaghetti Bolognese',
                description: 'Kıyma sosu, spagetti makarna, domates, un, yumurta, soğan, sarımsak',
                price: 12.00,
                availability: false,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'Tavuklu Sezar Salatası',
                description: 'Izgara tavuk, Romaine marulu, Sezar sosu, parmesan peyniri, kruton (ekmek), süt, yumurta, ançuez',
                price: 9.75,
                availability: true,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'Sebzeli Wok',
                description: 'Soğan, biber, kabak, havuç, soya sosu, sarımsak, zeytinyağı',
                price: 7.25,
                availability: true,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'Istakoz Çorbası',
                description: 'Istakoz, krema, tereyağı, un, sarımsak, soğan, deniz tuzu',
                price: 15.99,
                availability: false,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'Izgara Somon',
                description: 'Somon fileto, limon, tereyağı, zeytinyağı, sarımsak, deniz tuzu',
                price: 18.50,
                availability: true,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'Patates Kızartması',
                description: 'Patates, ayçiçek yağı, tuz',
                price: 3.50,
                availability: true,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'Çikolatalı Sufle',
                description: 'Çikolata, tereyağı, un, yumurta, şeker, süt',
                price: 6.25,
                availability: false,
                createdAt: new Date(),
                updatedAt: new Date()
              },
              {
                name: 'Caprese Salatası',
                description: 'Taze mozzarella, domates, fesleğen, zeytinyağı, balsamik sos',
                price: 7.99,
                availability: true,
                createdAt: new Date(),
                updatedAt: new Date()
              }
        ])

        const messages = await Message.bulkCreate([
          {
            "message": "Merhaba, siparişim ne zaman gelir?",
            "price": 5.00,
            "user_id": 2
        },
        {
            "message": "Çorba biraz soğuk geldi, tekrar ısıtılabilir mi?",
            "price": 3.50,
            "user_id": 3
        },
        {
            "message": "Patates kızartması çok lezzetliydi, teşekkürler!",
            "price": 2.00,
            "user_id": 4
        }
      ]
      )

      const user_allergen = await UserAllergen.bulkCreate([])

    }
}
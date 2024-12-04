const Admin = require('../models/admin')
const Customer = require('../models/customer')
const Menu = require('../models/menu')
const Order = require('../models/order')
const OrderDetail = require('../models/orderDetail')

exports.dummyData = async () => {
    if(await Customer.count() === 0) {
        const admin = await Admin.bulkCreate([
            {
                "name": "Admin",
                "username": "admin",
                "password": "admin"
            }
        ])

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
                "password": "securepassword123",
                "roomNumber": 101,
                "phone": 5551234567,
                "isAdmin": 0
            },
            {
                "name": "Ayşe Demir",
                "username": "ayse.demir",
                "password": "mypassword456",
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

        const menu = await Menu.bulkCreate([
            {
                "name": "Pizza Margherita",
                "description": "Domates, mozzarella, taze fesleğen",
                "price": 85.50,
                "availability": true
            },
            {
                "name": "Spaghetti Bolognese",
                "description": "Kıyma, domates sosu, sarımsak, soğan, parmesan peyniri",
                "price": 60.00,
                "availability": true
            },
            {
                "name": "Caesar Salata",
                "description": "Marul, tavuk, kruton, parmesan, ceasar sosu",
                "price": 45.00,
                "availability": false
            }
        ]
        )

        const orders = await Order.bulkCreate([
            {
                "status": "Pending",
                "price": 150.75,
                "quantity": 3,
                "menu_item_id": 1,
                "customer_id": 2,
                "roomNumber": 101
            },
            {
                "status": "Completed",
                "price": 89.50,
                "quantity": 3,
                "menu_item_id": 2,
                "customer_id": 1,
                "roomNumber": 101
            },
            {
                "status": "Cancelled",
                "price": 0.00,
                "quantity": 3,
                "menu_item_id": 3,
                "customer_id":3,
                "roomNumber": 101
            }
        ]
        )

        const orderDetails = await OrderDetail.bulkCreate([
            {
                "quantity": 2,
                "price": 50.00
            },
            {
                "quantity": 1,
                "price": 30.50
            },
            {
                "quantity": 5,
                "price": 12.99
            }
        ]
        )

        await customers[0].addOrder(orders[0])
        await customers[1].addOrder(orders[1])
        await customers[1].addOrder(orders[2])

        await orderDetails[0].setOrder(orders[0])
        await orderDetails[1].setOrder(orders[1])
        await orderDetails[2].setOrder(orders[2])

        await orderDetails[0].setMenu(menu[0])
        await orderDetails[1].setMenu(menu[1])
        await orderDetails[2].setMenu(menu[2])
    }
}
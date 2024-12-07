const Customer = require('../models/customer')
const Menu = require('../models/menu')
const Order = require('../models/order')
const OrderDetail = require('../models/orderDetail')

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

        await customers[0].addOrder(orders[0])
        await customers[1].addOrder(orders[1])
        await customers[1].addOrder(orders[2])

        await orderDetails[0].setOrder(orders[0])
        await orderDetails[1].setOrder(orders[1])
        await orderDetails[2].setOrder(orders[1])

    }
}
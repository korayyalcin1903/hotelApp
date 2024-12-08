const Customer = require("./customer");
const Menu = require("./menu");
const Message = require("./message");
const Order = require("./order");
const OrderDetail = require('./orderDetail')

exports.relations = () => {
    Customer.hasMany(Order, {foreignKey: 'customer_id'})
    Order.belongsTo(Customer, {foreignKey: 'customer_id'})

    Order.hasMany(OrderDetail, {foreignKey:'order_id'})
    OrderDetail.belongsTo(Order, {foreignKey:'order_id'})

    Customer.hasMany(Message, {foreignKey: 'user_id'})
    Message.belongsTo(Customer, {foreignKey: 'user_id'})

}
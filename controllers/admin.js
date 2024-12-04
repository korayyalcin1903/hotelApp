const sequelize = require('../data/db')
const admin = require('../models/admin');
const customer = require('../models/customer');
const Menu = require('../models/menu'); 
const Order = require('../models/order');
const Orders = require('../models/order'); 


exports.get_admin_index = (req, res) => { // yönlendirme
    // /admin adresine gelen istek, /admin/admins'e yönlendirilecek
    res.redirect('/admin/admins');
};


exports.get_admins = async (req, res) => {
    try {
        // Veritabanından tüm adminleri alıyoruz
        const users = await admin.findAll({
            attributes: ['id', 'name', 'username', 'password',  'createdAt', 'updatedAt'] // İstediğiniz kolonları belirtiyoruz
        });

        
        res.render('admin/admins', {
            title: 'Users',
            users: users // Admin verilerini gönderiyoruz
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Something went wrong while fetching users.');
    }
};


exports.get_edit_admins = async (req, res) => {
    try {
        // URL'den admin id'sini alıyoruz (userid)
        const adminId = req.params.userid;

        // Adminin bilgilerini veritabanından çekiyoruz
        const user = await admin.findOne({ where: { id: adminId } });

        // Eğer admin bulunamazsa hata mesajı dönüyoruz
        if (!user) {
            return res.status(404).send('Admin not found');
        }

        // Adminin verileri ile şablona render yapıyoruz
        res.render('admin/admin-edit', { // Şablon adı admin-edit
            title: 'Edit User',
            user: user // Adminin verilerini şablona gönderiyoruz
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};


exports.post_edit_admins = async (req, res) => {  // adminin bilgilerini değiştir
    try {
        const adminId = req.params.userid; // Admin id'sini URL'den alıyoruz
        const { name,username, password } = req.body; // Formdan gelen veriler

        // Veritabanında güncelleme işlemi yapıyoruz
        await admin.update(
            { name, username, password },
            { where: { id: adminId } }
        );

        // Güncelleme işlemi sonrası yönlendirme veya başarı mesajı
        res.redirect('/admin/admins'); // Adminleri listeleme sayfasına yönlendiriyoruz
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.post_delete_admins = async (req, res) => {
    try {
        const adminId = req.params.userid; // Admin id'sini URL'den alıyoruz

        // Veritabanında admini silme işlemi
        await admin.destroy({
            where: { id: adminId }
        });

        // Silme işlemi sonrası yönlendirme veya başarı mesajı
        res.redirect('/admin/admins'); // Kullanıcıyı listeleme sayfasına yönlendiriyoruz
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}



exports.get_users = async (req, res) => {
    try {
        // Veritabanından tüm kullanıcıları alıyoruz
        const users = await customer.findAll({
            attributes: ['id', 'name', 'username', 'roomNumber', 'phone', 'password',  'createdAt', 'updatedAt'] // İstediğiniz kolonları belirtiyoruz
        });

        // Kullanıcıları admin/users sayfasına gönderiyoruz
        res.render('admin/users', {
            title: 'Users',
            users: users // Kullanıcı verilerini gönderiyoruz
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Something went wrong while fetching users.');
    }
};

exports.get_edit_users = async (req, res) => {
    try {
        // URL'den admin id'sini alıyoruz (userid)
        const userid = req.params.userid;

        // Adminin bilgilerini veritabanından çekiyoruz
        const user = await customer.findOne({ where: { id: userid } });

        // Eğer admin bulunamazsa hata mesajı dönüyoruz
        if (!user) {
            return res.status(404).send('Admin not found');
        }

        // Adminin verileri ile şablona render yapıyoruz
        res.render('admin/user-edit', { // Şablon adı admin-edit
            title: 'Edit User',
            user: user // Adminin verilerini şablona gönderiyoruz
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.post_edit_users = async (req, res) => {  // adminin bilgilerini değiştir
    try {
        const userid = req.params.userid; // Admin id'sini URL'den alıyoruz
        const { name,username, roomNumber,phone, password } = req.body; // Formdan gelen veriler

        // Veritabanında güncelleme işlemi yapıyoruz
        await customer.update(
            { name, username, roomNumber,phone,password },
            { where: { id: userid } }
        );

        res.redirect('/admin/users'); // Kullanıcıyı listeleme sayfasına yönlendiriyoruz
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.post_delete_users = async (req, res) => {
    try {
        const userid = req.params.userid; // Admin id'sini URL'den alıyoruz

        // Veritabanında admini silme işlemi
        await customer.destroy({
            where: { id: userid }
        });

        // Silme işlemi sonrası yönlendirme veya başarı mesajı
        res.redirect('/admin/users'); // Kullanıcıyı listeleme sayfasına yönlendiriyoruz
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}


exports.get_menu = async (req, res) => {
    try {
        // Menüler veritabanından alınıyor
        const menus = await Menu.findAll(); // Menu modelini kullanarak menüleri alıyoruz

        // Menülerle birlikte render yapıyoruz
        res.render('admin/menu', {
            title: 'Menü Yönetimi',
            menus: menus // Menüleri EJS şablonuna gönderiyoruz
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.get_menu_edit = async (req, res) => {
    try {
        // URL'den menü ID'sini alıyoruz
        const menuId = req.params.menuid;
        
        // Menü verisini veritabanından alıyoruz
        const menu = await Menu.findOne({ where: { id: menuId } });

        // Eğer menü bulunamazsa, hata mesajı döndürüyoruz
        if (!menu) {
            return res.status(404).send('Menu not found');
        }

        // Menüyü şablona gönderiyoruz
        res.render('admin/menu-edit', {
            title: 'Menü Düzenle',
            menu: menu // Menü bilgilerini EJS şablonuna gönderiyoruz
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.post_menu_edit = async (req, res) => {  // adminin bilgilerini değiştir
    try {
        var menuid = req.params.menuid; // menu id'sini URL'den alıyoruz
        var { name,description,price,availability } = req.body; // Formdan gelen veriler
        availability = req.body.availability === '1' ? true : false;
        // Veritabanında güncelleme işlemi yapıyoruz
        await Menu.update(
            { name, description, price, availability },
            { where: { id: menuid } }
        );

        // Güncelleme işlemi sonrası yönlendirme veya başarı mesajı
        res.redirect('/admin/menu'); // Adminleri listeleme sayfasına yönlendiriyoruz
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.get_menu_delete = async (req, res) => {
    try {
        const menuid = req.params.menuid; // menu id'sini URL'den alıyoruz

        // Veritabanında menu silme işlemi
        await Menu.destroy({
            where: { id: menuid }
        });

        // Silme işlemi sonrası yönlendirme veya başarı mesajı
        res.redirect('/admin/menu'); // Kullanıcıyı listeleme sayfasına yönlendiriyoruz
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.get_menu_create = (req, res) => {
    res.render('admin/menu-create', {
        title: 'Menü Ekle'
    })
}

exports.post_menu_create = async (req, res) => {
    try {
        const { name, description, price, availability } = req.body;

        // Veritabanına yeni menü kaydı
        await Menu.create({
            name,
            description,
            price: parseFloat(price),
            availability: availability === '1' // Checkbox işaretliyse true, değilse false
        });

        // Başarılı ekleme sonrası menü sayfasına yönlendirme
        res.redirect('/admin/menu');
    } catch (error) {
        console.error('Menü eklenirken bir hata oluştu:', error);
        res.status(500).send('Menü eklenirken bir hata oluştu');
    }
};





exports.get_order = async (req, res) => {
    try {
        // Siparişleri müşteri ve menü bilgileriyle birlikte çekiyoruz
        const orders = await Orders.findAll({
            include: [
                {
                    model: customer,
                    as: 'customer',
                    attributes: ['name' , 'roomNumber']
                },
                {
                    model: Menu,
                    as: 'menu',
                    attributes: ['name'] // Sadece yemek adını alıyoruz
                }
            ]
        });

        // View'e gönderiyoruz
        res.render('admin/order', {
            title: 'Siparişler',
            orders: orders
        });
    } catch (error) {
        console.error('Siparişler yüklenirken bir hata oluştu:', error);
        res.status(500).send('Siparişler yüklenirken bir hata oluştu.');
    }
};


exports.get_order_edit = async (req, res) => {
    try {
        // URL'den order id'sini alıyoruz (userid)
        const orderid = req.params.orderid;
        console.log(orderid)
        // Order bilgilerini veritabanından çekiyoruz
        const order = await Order.findOne({ where: { id: orderid } });

        // Eğer order bulunamazsa hata mesajı dönüyoruz
        if (!order) {
            return res.status(404).send('Order not found');
        }

        // Order verileri ile şablona render yapıyoruz
        res.render('admin/order-edit', { // Şablon adı admin-edit
            title: 'Edit Order',
            order: order // order verilerini şablona gönderiyoruz
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
};

exports.get_order_delete = async (req, res) => {
    try {
        const orderid = req.params.orderid; // order id'sini URL'den alıyoruz

        // Veritabanında order silme işlemi
        await Order.destroy({
            where: { id: orderid }
        });

        // Silme işlemi sonrası yönlendirme veya başarı mesajı
        res.redirect('/admin/order'); // Kullanıcıyı listeleme sayfasına yönlendiriyoruz
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}

exports.post_edit_order = async (req, res) => {  // adminin bilgilerini değiştir
    try {
        const orderid = req.params.orderid; // Admin id'sini URL'den alıyoruz
        const { status,price, quantity} = req.body; // Formdan gelen veriler

        // Veritabanında güncelleme işlemi yapıyoruz
        await Order.update(
            { status,price,quantity },
            { where: { id: orderid } }
        );

        res.redirect('/admin/order'); // Kullanıcıyı listeleme sayfasına yönlendiriyoruz
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
}
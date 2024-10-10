exports.get_order = (req, res) => {
    res.render('admin/order', {
        title: 'Order'
    })
}

exports.get_users = (req, res) => {
    res.render('admin/users', {
        title: 'Users'
    })
}

exports.get_edit_user = (req, res) => {
    res.render('admin/user-edit', {
        title: 'Users'
    })
}

// exports.get_delete_user = (req, res) => {
//     res.render('admin/user-edit', {
//         title: 'Users'
//     })
// }

exports.get_menu = (req, res) => {
    res.render('admin/menu', {
        title: 'Menü'
    })
}

exports.get_menu_create = (req, res) => {
    res.render('admin/menu-create', {
        title: 'Menü Ekle'
    })
}

exports.get_menu_edit = (req, res) => {
    res.render('admin/menu-edit', {
        title: 'Menü Düzenle'
    })
}

exports.get_menu_delete = (req, res) => {
    res.render('admin/menu-delete', {
        title: 'Menü Düzenle'
    })
}
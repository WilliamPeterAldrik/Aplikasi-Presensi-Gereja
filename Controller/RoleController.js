const Role = require('../Model/role');

const index = (req, res) => {
    Role.all((err, roles) => {
        if (err) {
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        res.json(roles);
    });
};
const create = (req, res) => {
    res.render('role/create', { error: null, role: {} });
};  
const store = (req, res) => {
    const newRole = {
        nama_role: req.body.nama_role,
    };

    const role = new Role();
    role.save(newRole, (err, result) => {
        if (err) {
            return res.render('role/create', {
                error: 'Gagal menyimpan data role.',
                role: newRole
            });
        }
        res.redirect('/role');
    });
};
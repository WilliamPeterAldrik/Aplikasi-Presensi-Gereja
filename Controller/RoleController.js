const Role = require('../Model/role');

const index = (req, res) => {
    // web: list of roles (for now, we return the static page through route router)
    res.sendFile(require('path').join(__dirname, '..', 'pages', 'lihat_role.html'));
};

const create = (req, res) => {
    // show web page to add role
    res.sendFile(require('path').join(__dirname, '..', 'pages', 'add_role.html'));
};

const store = (req, res) => {
    const newRole = { nama_role: req.body.nama_role };
    const role = new Role();
    role.save(newRole, (err, result) => {
        if (err) {
            console.error('Role.save error:', err);
            // for web form submission fallback
            return res.status(500).json({ error: 'Gagal menyimpan data role.' });
        }
        res.redirect('/role');
    });
};

// API endpoints
const apiIndex = (req, res) => {
    const role = new Role();
    role.all((err, roles) => {
        if (err) {
            console.error('Role.all error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        // mapping backend DB → frontend naming
        const mapped = roles.map(r => ({
            idRole: r.id_role,
            namaRole: r.role_name
        }));

        res.json(mapped);
    });
};

const apiShow = (req, res) => {
    const id = req.params.id;
    const role = new Role();
    role.find(id, (err, rows) => {
        if (err) {
            console.error('Role.find error:', err);
            return res.status(500).json({ error: 'Internal Server Error' });
        }
        if (!rows || rows.length === 0) return res.status(404).json({ error: 'Role not found' });
        res.json(rows[0]);
    });
};

const apiStore = (req, res) => {
    const newRole = { nama_role: req.body.nama_role };
    console.log('apiStore payload:', req.body);
    const role = new Role();
    role.save(newRole, (err, result) => {
        if (err) {
            console.error('Role.save error:', err);
            return res.status(500).json({ error: 'Gagal menyimpan role' });
        }
        res.json({ success: true, id: result.insertId });
    });
};

const apiUpdate = (req, res) => {
    const id = req.params.id;
    const role = new Role();
    const newName = req.body.nama_role || req.body.role_name || req.body.roleName;
    if (newName === undefined || newName === null || newName === '') {
        return res.status(400).json({ error: 'nama_role is required' });
    }
    const data = { role_name: newName };
    console.log('apiUpdate id, data =>', id, data);
    role.update(id, data, (err, result) => {
        if (err) {
            console.error('Role.update error:', err);
            return res.status(500).json({ error: 'Gagal mengupdate role' });
        }
        return res.json({ success: true });
    });
};

const apiDelete = (req, res) => {
    const id = req.params.id;
    const role = new Role();
    role.delete(id, (err, result) => {
        if (err) {
            console.error('Role.delete error:', err);
            return res.status(500).json({ error: 'Gagal menghapus role' });
        }
        return res.json({ success: true });
    });
};

const apiDebug = (req, res) => {
    const role = new Role();
    // Wait until columns are detected
    role.ensureColumns(err => {
        if (err) return res.status(500).json({ error: 'DB columns detection failed', details: err.message });
        return res.json({ idColumn: role.idColumn, nameColumn: role.nameColumn });
    });
};

const getRoles = (req, res) => {
    Role.getAll((err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
};

module.exports = {
    index,
    create,
    store,
    apiIndex,
    apiShow,
    apiStore,
    apiUpdate,
    apiDelete,
    apiDebug,
    getRoles
};
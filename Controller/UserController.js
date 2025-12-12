const User = require("../Model/User.js");
const path = require("path");

const index = (req, res) => {
    // Serve the frontend static page which will fetch users via the API
    res.sendFile(path.join(__dirname, "..", "pages", "admin", "lihat_users.html"));
};

const create = (req, res) => {
    // Serve the add user static page
    res.sendFile(path.join(__dirname, '..', 'pages','admin' ,'add_user.html'));
};

const store = (req, res) => {
    // Ensure we use the same field names as the model's save expects
    if (!req.body.username || !req.body.password) {
        return res.render('user/create', { error: 'username and password are required' });
    }
    const userBaru = new User();
    const payload = {
        username: req.body.username || req.body.nama || req.body.nama_lengkap,
        password: req.body.password,
        email: req.body.email,
        nama_lengkap: req.body.nama_lengkap || req.body.nama || req.body.username,
        role: parseInt(req.body.role || req.body.id_role) || null,
    };

    console.log("store payload:", payload);
    userBaru.save(payload, (err, result) => {
        if (err) {
            console.error('store error:', err && (err.sqlMessage || err.message || err));
            return res.sendFile(path.join(__dirname, '..', 'pages', 'admin','add_user.html'));
        }
        res.redirect("/users");
    });
};

// API store: used by /api/users when posting JSON from the frontend
const apiStore = (req, res) => {
    // Basic validation
    if (!req.body.username || !req.body.password) {
        return res.status(400).json({ error: 'username and password are required' });
    }
    const userBaru = new User();
    const payload = {
        username: req.body.username || req.body.nama || req.body.nama_lengkap,
        password: req.body.password,
        email: req.body.email,
        nama_lengkap: req.body.nama_lengkap || req.body.nama || req.body.username,
        role: parseInt(req.body.role || req.body.id_role) || null,
    };

    console.log("apiStore payload:", payload);
    userBaru.save(payload, (err, result) => {
        if (err) {
            console.error('apiStore error:', err && (err.sqlMessage || err.message || err));
            return res.status(500).json({ error: err.sqlMessage || err.message || 'Gagal menyimpan user.' });
        }
        // result.insertId may differ depending on mysql driver callback
        res.status(201).json({ message: "User created", id: result.insertId || null });
    });
};

const edit = (req, res) => {
    // Send front-end page; client-side JS will fetch the user via /api/users/:username
    res.sendFile(path.join(__dirname, '..', 'pages', 'admin','edit_user.html'));
};

const update = (req, res) => {
    const user = new User();
    const username = req.params.username;

    const updatedData = {};
    if (req.body.username !== undefined) updatedData.username = req.body.username;
    if (req.body.password !== undefined && req.body.password.trim() !== '') updatedData.password = req.body.password;
    if (req.body.email !== undefined) updatedData.email = req.body.email;
    if (req.body.nama_lengkap !== undefined) updatedData.nama_lengkap = req.body.nama_lengkap;
    if (req.body.role !== undefined && req.body.role !== null && req.body.role !== '') updatedData.role = parseInt(req.body.role);

    user.update(username, updatedData, (err) => {
        if (err) {
            return res.sendFile(path.join(__dirname, '..', 'pages', 'admin','edit_user.html'));
        }
        res.redirect("/users");
    });
};

const destroy = (req, res) => {
    const user = new User();
    const username = req.params.username;

    user.delete(username, (err) => {
        if (err) return res.redirect("/users?error=Gagal menghapus user");

        res.redirect("/users");
    });
};

// API: Get user by id
const apiShow = (req, res) => {
    const user = new User();
    const username = req.params.username;
    user.find(username, (err, results) => {
        if (err) return res.status(500).json({ error: 'Gagal mengambil user' });
        if (!results || results.length === 0) return res.status(404).json({ error: 'User tidak ditemukan' });
        const row = results[0];
        // Map DB columns to frontend expected keys
        const resp = {
            username: row.username,
            username: row.username,
            email: row.email,
            nama_lengkap: row.nama_lengkap,
            role: row.id_role || row.idRole || row.role || null,
            Role_idRole: row.id_role || row.idRole || row.role || null,
        };
        res.json(resp);
    });
};

// API: Update user by id
const apiUpdate = (req, res) => {
    const user = new User();
    const username = req.params.username;
    const updatedData = {};
    if (req.body.username !== undefined) updatedData.username = req.body.username;
    if (req.body.password !== undefined && req.body.password.trim() !== '') updatedData.password = req.body.password;
    if (req.body.email !== undefined) updatedData.email = req.body.email;
    if (req.body.nama_lengkap !== undefined) updatedData.nama_lengkap = req.body.nama_lengkap;
    if (req.body.role !== undefined && req.body.role !== null && req.body.role !== '') updatedData.role = parseInt(req.body.role || req.body.id_role);
    user.update(username, updatedData, (err) => {
        if (err) return res.status(500).json({ error: 'Gagal mengupdate user' });
        res.json({ message: 'User updated' });
    });
};

// API: Delete user by id
const apiDelete = (req, res) => {
    const user = new User();
    const username = req.params.username;
    user.delete(username, (err) => {
        if (err) return res.status(500).json({ error: "Gagal menghapus user" });
        res.json({ message: 'User deleted' });
    });
};

// API: Debug - show columns for user table (development only)
const apiColumns = (req, res) => {
    const user = new User();
    user.db.query('SHOW COLUMNS FROM user', (err, results) => {
        if (err) return res.status(500).json({ error: 'Gagal mengambil kolom user', details: err && (err.sqlMessage || err.message) });
        res.json(results);
    });
};

const apiUsers = (req, res) => {
    const user = new User();
    user.all((err, users) => {
        if (err) {
            console.error('apiUsers error:', err && (err.sqlMessage || err.message || err));
            return res.status(500).json({ error: "Gagal mengambil data user", details: err && (err.sqlMessage || err.message || err) });
        }
        console.log('apiUsers returned', users && users.length ? users.length : 0, 'users');
        res.json(users);
    });
};



module.exports = {
    index,
    create,
    store,
    apiStore,
    apiShow,
    apiUpdate,
    apiDelete,
    apiColumns,
    edit,
    update,
    destroy,
    apiUsers,
};

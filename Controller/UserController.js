const User = require('../Model/user');

const index = (req, res) => {
    const user = new User();
    user.all((err, users) => {
        if (err) {
            return res.render('user/user', {
                data: users,
                error: 'Gagal mengambil data user',
            });
        }
        res.render('user/user', {
            users: users,
            error: req.query.error || null,
        });
    });
};

/**
 * GET /users/create
 * Tampilkan form tambah user
 */
const create = (req, res) => {
    res.render(
        'user/create'
    );
}

/**
 * POST /users
 * Simpan user baru ke database
 */
const store = (req, res) => {
  const userBaru = new User();

  userBaru.save(
    {      
      nama    : req.body.nama,
      email   : req.body.email,
      password: req.body.password,      // pertimbangkan hashing
      no_hp   : req.body.no_hp,
      id_role : req.body.id_role,
    },
    (err, resultId) => {
      if (err) {
        console.log(err)
        // kirim balik ke form dengan pesan error
        return res.render('user/create', {
          error: 'Gagal menyimpan user. Silakan coba lagi.',
          
        });
      }

      console.log('User berhasil disimpan dengan ID:', resultId);
      res.redirect('/user');           // arahkan kembali ke daftar user
    },
  );
};


const edit = (req, res) => {
  const user = new User();
  const id = req.params.id;

  user.find(id, (err, data) => {
    if (err || !data) {
      return res.render('user/edit', { error: 'User tidak ditemukan', user: {} });
    }

    res.render('user/edit', { user: data });
  });
};

const update = (req, res) => {
  const user = new User();
  const id = req.params.id;

  const updatedData = {
    nama: req.body.nama,
    email: req.body.email,
    no_hp: req.body.no_hp,
    password: req.body.password,
    id_role: parseInt(req.body.id_role)
  };

  user.update(id, updatedData, (err, result) => {
    if (err) {
      return res.render('user/edit', {
        error: 'Gagal mengupdate data user.',
        user: { ...updatedData, id_user: id }
      });
    }

    res.redirect('/user');
  });
};
const destroy = (req, res) => {
  const userId = req.params.id;
  const user = new User();

  user.delete(userId, (err) => {
    if (err) {
      console.error('Gagal menghapus user:', err);
      return res.redirect('/user?error=Gagal menghapus user');
    }

    res.redirect('/user');
  });
};

module.exports = {
  index,
  create,
  store,
  edit,
  update,
  destroy, // tambahkan ini juga di export
};
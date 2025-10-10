const Absensi = require('../Model/absensi');

const index = (req, res) => {
    const absensi = new Absensi();
    absensi.all((err, absensis) => {
        if (err) {
            return res.render('absensi/absensi', {
                data: absensis,
                error: 'Gagal mengambil data absensi',
            });
        }
        res.render('absensi/absensi', {
            data: absensis,
            error: req.query.error || null,
        });
    });
};
const create = (req, res) => {
    res.render('absensi/create', { error: null, absensi: {} });
};
const store = (req, res) => {
    const newAbsensi = {
        id_kegiatan      : req.body.id_kegiatan,
        id_user          : req.body.id_user,
        status_kehadiran : req.body.status_kehadiran,
    };
    const absensi = new Absensi();
    absensi.save(newAbsensi, (err, result) => {
        if (err) {
            return res.render('absensi/create', {
                error: 'Gagal menyimpan data absensi.',
                absensi: newAbsensi
            });
        }
        res.redirect('/absensi');
    });
};
module.exports = {
    index,
    create,
    store,
};
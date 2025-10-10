const Kegiatan = require('../Model/kegiatan');

const index = (req, res) => {
    Kegiatan.all((err, kegiatan) => {
        if (err) {
            return res.render('kegiatan/kegiatan', {
                data: kegiatan,
                error: 'Gagal mengambil data kegiatan',
            });
        }
        res.render('kegiatan/kegiatan', {
            data: kegiatan,
            error: req.query.error || null,
        });
    });
};

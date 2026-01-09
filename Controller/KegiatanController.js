const Kegiatan = require("../Model/Kegiatan");

const store = (req, res) => {
  const data = {
    nama_kegiatan: req.body.nama_kegiatan,
    lokasi: req.body.lokasi,
    waktu: req.body.waktu,
    tanggal_mulai: req.body.tanggal_mulai,
    tanggal_akhir: req.body.tanggal_akhir,
    deskripsi: req.body.deskripsi,
    status: req.body.status
  };

  const kegiatan = new Kegiatan();
  kegiatan.create(data, (err) => {
    if (err) {
      console.error(err);
      return res.send("Gagal menyimpan kegiatan");
    }

    res.redirect("/admin/lihat_kegiatan");
  });
};
const apiIndex = (req, res) => {
  const kegiatan = new Kegiatan();

  kegiatan.all((err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: "Gagal mengambil data kegiatan" });
    }

    res.json(results);
  });
};

module.exports = {
  store,
  apiIndex
};

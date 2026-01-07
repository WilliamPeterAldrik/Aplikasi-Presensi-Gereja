const allowRoles = (...roles) => {
  return (req, res, next) => {
    if (!req.session.user) {
      return res.redirect("/home");
    }

    if (!roles.includes(req.session.user.role)) {
      return res.status(403).send("Akses ditolak");
    }

    next();
  };
};

module.exports = allowRoles;

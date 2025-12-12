// src/middlewares/role.middleware.js
export default function role(...allowedRoles) {
  return (req, res, next) => {
    try {
      const role = req.user.role;

      if (!allowedRoles.includes(role)) {
        return res.status(403).json({
          success: false,
          message: "Akses ditolak: Tidak memiliki hak akses",
        });
      }
      next();
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "Error di role middleware",
      });
    }
  };
}

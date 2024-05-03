function requireRole(role) {
    return function (req, res, next) {
      if (req.user && req.user.role === role) {
        next();
      } else {
        res.sendStatus(403);
      }
    }
  }
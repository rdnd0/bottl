const protectedView = {
  notLoggedIn: (req, res, next) => {
    if (req.session.currentUser) {
      next();
    } else {
      res.redirect('/login');
    }
  },
  loggedIn: (req, res, next) => {
    if (req.session.currentUser) {
      res.redirect('/bottles');
    } else {
      next();
    }
  }
};

module.exports = protectedView;
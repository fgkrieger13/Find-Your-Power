const checkConnectingAuthorized = (req, res, next) => {
    // console.log('in checkConnectingAuthorized', req.body);
    // next();
    // check if user id matches connecting_id
    if (req.user.id === req.body.connecting_id) {
      // They were authorized! User may do the next thing
      next();
    } else {
      // failure best handled on the server. do redirect here.
      res.sendStatus(403);
    }
  };

  const checkConnectingToAuthorized = (req, res, next) => {
    // console.log('in checkConnectingToAuthorized');
    // next();
    // check if user id matches connecting_to_id
    if (req.user.id === req.body.connecting_to_id) {
      // They were authorized! User may do the next thing
      next();
    } else {
      // failure best handled on the server. do redirect here.
      res.sendStatus(403);
    }
  };

  const checkAuthorizationToDeny = (req, res, next) => {
    // console.log('in checkConnectingToAuthorized');
    // next();
    // check if user id matches connecting_to_id
    if (req.user.id === req.body.connecting_to_id || req.user.id === req.body.connecting_id) {
      // They were authorized! User may do the next thing
      next();
    } else {
      // failure best handled on the server. do redirect here.
      res.sendStatus(403);
    }
  };
  
  module.exports = { checkConnectingAuthorized, checkConnectingToAuthorized, checkAuthorizationToDeny };
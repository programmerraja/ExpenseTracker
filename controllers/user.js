
exports.signin=function (req, res, next) {
    return passport.authenticate(
    "user_local",
    { session: false },
    (err, user, info) => {
      if (err || !user) {
        return res.status(400).json({
          status: "failed",
          msg: info ? info.message : "Login failed",
        });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          res.status(500).json({ status: "failed", msg: err });
        }
        //filtering user id and email for payload and setting exp time as 7 day
        let payload = JSON.stringify({
          id: user._id,
          username: user.name,
          email: user.email,
          exp: Math.floor(Date.now() / 1000) + 60 * 600 * 24 * 7,
        });
        // generate a signed json web token with the contents of user object and return it in the response
        const token = jwt.sign(payload, process.env.JWT_KEY);
        res.json({ status: "success", token });
      });
    }
  )(req, res);
  }
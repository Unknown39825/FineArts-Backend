require("dotenv").config();
const passport = require("passport");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const jwt = require("jsonwebtoken");
const User = require("./models/User/user");

const getTokenFromRequest = (req) => {
  // 1. Check cookie
  if (req && req.cookies && req.cookies.UNKNOWN39825_AUTH) {
    console.log(req.cookies)
    return req.cookies.UNKNOWN39825_AUTH;
  }

  // 2. Fallback to header
  return ExtractJwt.fromAuthHeaderAsBearerToken()(req);
};

const opts = {
  jwtFromRequest: getTokenFromRequest,
  secretOrKey: process.env.secretKey,
  passReqToCallback: true,
};

exports.jwtPassport = passport.use(
  new JwtStrategy(opts, async (req, jwt_payload, done) => {
    try {
      const token = getTokenFromRequest(req);
      const user = await User.findOne({
        _id: jwt_payload._id,
        "tokens.token": token,
      });

      if (user) {
        req.token = token;
        return done(null, user);
      } else {
        return done(null, false);
      }
    } catch (err) {
      return done(err, false);
    }
  })
);

passport.serializeUser(function (user, done) {
  done(null, user);
});

passport.deserializeUser(function (obj, done) {
  done(null, obj);
});

exports.verifyUser = passport.authenticate("jwt", { session: false });

exports.verifyAdmin = (req, res, next) => {
  User.findOne({ _id: req.user._id })
    .then((user) => {
      if (user.admin) {
        next();
      } else {
        res.status(403).json({ msg: "Admin access required !!" });
        return next(res);
      }
    })
    .catch((err) => next(err));
};

exports.isVerifiedUser = (req, res, next) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        res.status(400).json({ error: "Email Does not Exist" });
      } else if (user.isVerified) {
        next();
      } else {
        res.status(400).json({ msg: "Your account has not been verified !!" });
        return next(res);
      }
    })
    .catch((err) => next(err));
};

exports.verifyToken = (req, res) => {
  const token = getTokenFromRequest(req);
  console.log(token)

  if (!token) {
    return res.status(404).json({ success: false, error: "Token Missing !!" });
  }

  jwt.verify(token, process.env.secretKey, (err, decoded) => {
    if (err) {
      return res
        .status(401)
        .json({ success: false, error: err.message, status: err.name });
    }

    if (!decoded) {
      return res
        .status(500)
        .json({ success: false, error: "Something went wrong" });
    }

    return res
      .status(200)
      .json({ success: true, status: "Token Valid !!", user: decoded._id || decoded.sub ,token});
  });
};

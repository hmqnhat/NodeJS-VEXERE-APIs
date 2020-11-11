const util = require("util");
const jwt = require("jsonwebtoken");

const jwtVerify = util.promisify(jwt.verify);

module.exports.authenticate = (req, res, next) => {
  const token = req.headers.token;

  jwtVerify(token, "as2jkh321hk3hk12")
    .then((decoded) => {
      if (!decoded)
        return res.status(401).json({
          message: "Token is invalid",
        });

      //decoded = payload
      req.user = decoded;
      return next();
    })
    .catch((err) => res.json(err));
};

module.exports.authorization = (userTypeArray) => {
  return (req, res, next) => {
    const user = req.user;
    if (userTypeArray.indexOf(user.userType) > -1) return next();

    res.status(403).json({
      message: "You do not have premission",
    });
  };
};

// module.exports.authorization = (userTypeArray) => return (req, res, next) => {
//   const user = req.user;
//   if (user.userType === "Member") return next();

//   res.status(403).json({
//     message: "You do not have premission",
//   });
//   }

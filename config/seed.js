const User = require("../app/user/db/model/user");
const Company = require("../app/user/db/model/company");
const Customer = require("../app/user/db/model/customer");

module.exports = () => {
  new User({name: "example", password: "password", role: "admin"}).save();
  new User({name: "tester", password: "password", role: "user"}).save();
};

const User = require("../app/user/db/model/user");
const Company = require("../app/user/db/model/company");
const Customer = require("../app/user/db/model/customer");

module.exports = () => {
  new User({name: "example", password: "password", role: "admin"}).save();
  new User({name: "tester", password: "password", role: "user"}).save();
  new Company({name: "the corporation"}).save((err, company) => {
    new Customer({firstName: "Big", lastName: "Wig", company: company._id}).save();
  });
  new Company({name: "the small guy"}).save((err, company) => {
    new Customer({firstName: "Little", lastName: "Fry", company: company._id}).save();
  });
};

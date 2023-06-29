/**
 * Load all customer of a hairdresser from the database
 * with the :id param (hairdresserid)
 * The result is saved to res.locals.customers
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const customerModel = requireOption(objectrepository, "customerModel");

  return (req, res, next) => {
    if (typeof req.params.id === "undefined") {
      return next("No hairdresser id in customers (customer)");
    }

    customerModel
      .find({ _hairdresser: req.params.id })
      .sort({ name: 1 })
      .collation({ locale: "en", caseLevel: true })
      .then((DBcustomers) => {
        res.locals.customers = DBcustomers;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};

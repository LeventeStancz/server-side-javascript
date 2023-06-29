/**
 * Load a single customer from the database using the :cid param
 * The result is saved to res.locals.customer
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const customerModel = requireOption(objectrepository, "customerModel");

  return (req, res, next) => {
    if (
      typeof req.params.id === "undefined" ||
      typeof req.params.cid === "undefined"
    ) {
      return next("No hairdresser id in edit or customer id (customer)");
    }

    customerModel
      .findOne({ _id: req.params.cid, _hairdresser: req.params.id })
      .then((DBcustomer) => {
        res.locals.customer = DBcustomer;
        res.locals.hairdresser = {
          _id: DBcustomer._hairdresser,
        };
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};

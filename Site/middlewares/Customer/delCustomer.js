/**
 * Removes a customer from the database, the entity used here is: res.locals.customer
 * Redirects to /hairdressers/:id/customers after delete
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const customerModel = requireOption(objectrepository, "customerModel");

  return (req, res, next) => {
    if (typeof req.params.id === "undefined") {
      return next("no hairdresser id in delete customer");
    }

    res.locals.hairdresser = {
      _id: req.params.id,
    };

    if (
      typeof req.body.name === "undefined" ||
      typeof req.body.contact === "undefined" ||
      typeof req.params.cid === "undefined"
    ) {
      return next();
    }

    customerModel
      .deleteOne({ _id: req.params.cid, _hairdresser: req.params.id })
      .then((result) => {
        res.redirect(`/hairdressers/${req.params.id}/customers`);
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};

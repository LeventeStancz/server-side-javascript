/**
 * Removes a hairdresser from the database, the entity used here is: res.locals.hairdresser
 * Redirects to /hairdressers after delete
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const hairdresserModel = requireOption(objectrepository, "hairdresserModel");
  const customerModel = requireOption(objectrepository, "customerModel");

  return (req, res, next) => {
    if (
      typeof req.body.name === "undefined" ||
      typeof req.body.contact === "undefined" ||
      typeof req.params.id === "undefined"
    ) {
      return next();
    }

    customerModel
      .deleteMany({ _hairdresser: req.params.id })
      .then((result) => {})
      .catch((err) => {
        return next(err);
      });

    hairdresserModel
      .deleteOne({ _id: req.params.id })
      .then((result) => {
        res.redirect("/");
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};

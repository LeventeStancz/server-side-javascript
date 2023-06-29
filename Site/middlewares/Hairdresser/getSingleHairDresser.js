/**
 * Load a single hairdresser from the database using the :id param
 * The result is saved to res.locals.hairdresser
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const hairdresserModel = requireOption(objectrepository, "hairdresserModel");

  return (req, res, next) => {
    if (typeof req.params.id === "undefined") {
      return next("No id in edit (hairdresser)");
    }
    hairdresserModel
      .findOne({ _id: req.params.id })
      .then((DBhairdresser) => {
        res.locals.hairdresser = DBhairdresser;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};

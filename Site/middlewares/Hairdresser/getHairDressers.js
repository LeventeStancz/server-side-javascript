/**
 * Load all hairdresser from the database
 * The result is saved to res.locals.hairdressers
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const hairdresserModel = requireOption(objectrepository, "hairdresserModel");

  return (req, res, next) => {
    hairdresserModel
      .find({})
      .sort({ name: 1 })
      .collation({ locale: "en", caseLevel: true })
      .then((DBhairdressers) => {
        res.locals.hairdressers = DBhairdressers;
        return next();
      })
      .catch((err) => {
        return next(err);
      });
  };
};

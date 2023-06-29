/**
 * Using POST params update or save a hairdresser to the database
 * If res.locals.hairdresser is there, it's an update otherwise this middleware creates an entity
 * Redirects to /hairdressers after success
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const hairdresserModel = requireOption(objectrepository, "hairdresserModel");

  return (req, res, next) => {
    if (
      typeof req.body.name === "undefined" ||
      typeof req.body.contact === "undefined"
    ) {
      return next();
    }

    if (
      typeof res.locals.hairdresser === "undefined" ||
      typeof req.params.id === "undefined"
    ) {
      const newHairdresser = new hairdresserModel();
      newHairdresser.name = req.body.name;
      newHairdresser.contact = req.body.contact;
      newHairdresser.pricing_min = req.body.pricing_min;
      newHairdresser.pricing_max = req.body.pricing_max;

      newHairdresser
        .save()
        .then((result) => {
          res.redirect("/");
          return next();
        })
        .catch((err) => {
          return next(err);
        });
    } else {
      hairdresserModel
        .findOneAndUpdate(
          {
            _id: res.locals.hairdresser._id,
          },
          {
            name: req.body.name,
            contact: req.body.contact,
            pricing_min: req.body.pricing_min,
            pricing_max: req.body.pricing_max,
          }
        )
        .then((result) => {
          res.redirect("/");
          return next();
        })
        .catch((err) => {
          return next(err);
        });
    }
  };
};

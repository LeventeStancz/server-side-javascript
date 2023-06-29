/**
 * Using POST params update or save a customer to the database
 * If res.locals.customer is there, it's an update otherwise this middleware creates an entity
 * Redirects to /hairdressers/:id/customers after success
 */
const requireOption = require("../requireOption");

module.exports = function (objectrepository) {
  const customerModel = requireOption(objectrepository, "customerModel");

  return (req, res, next) => {
    if (typeof req.params.id === "undefined") {
      return next("No hairdresser id in customer edit (customer)");
    }

    res.locals.hairdresser = {
      _id: req.params.id,
    };

    if (
      typeof req.body.name === "undefined" ||
      typeof req.body.contact === "undefined"
    ) {
      return next();
    }

    if (
      typeof res.locals.customer === "undefined" ||
      typeof req.params.cid === "undefined"
    ) {
      const newCustomer = new customerModel();
      newCustomer.name = req.body.name;
      newCustomer.contact = req.body.contact;
      newCustomer.last_visit = new Date(req.body.last_visit)
        .toISOString()
        .substring(0, 10);
      newCustomer.avg_time = req.body.avg_time;
      newCustomer._hairdresser = req.params.id;

      newCustomer
        .save()
        .then((result) => {
          res.redirect(`/hairdressers/${req.params.id}/customers`);
          return next();
        })
        .catch((err) => {
          return next(err);
        });
    } else {
      customerModel
        .findOneAndUpdate(
          {
            _id: req.params.cid,
            _hairdresser: req.params.id,
          },
          {
            name: req.body.name,
            contact: req.body.contact,
            last_visit: new Date(req.body.last_visit)
              .toISOString()
              .substring(0, 10),
            avg_time: req.body.avg_time,
            _hairdresser: req.params.id,
          }
        )
        .then((result) => {
          res.redirect(`/hairdressers/${req.params.id}/customers`);
          return next();
        })
        .catch((err) => {
          return next(err);
        });
    }
  };
};

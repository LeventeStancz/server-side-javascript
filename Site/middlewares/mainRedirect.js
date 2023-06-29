/**
 * This middleware has only one purpose, when the user visits the / page,
 * should be redirected to
 *    - /hairdressers
 */
module.exports = function (objectrepository) {
  return function (req, res, next) {
    return res.redirect("hairdressers");
  };
};

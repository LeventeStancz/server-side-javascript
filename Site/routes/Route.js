const mainRedirect = require("../middlewares/mainRedirect");
const renderMW = require("../middlewares/render");

//HairDressers
const getHairDressers = require("../middlewares/Hairdresser/getHairDressers");
const getSingleHairDresser = require("../middlewares/Hairdresser/getSingleHairDresser");
const saveHairDresser = require("../middlewares/Hairdresser/saveHairDresser");
const delHairDresser = require("../middlewares/Hairdresser/delHairDresser");
//Customers
const getCustomers = require("../middlewares/Customer/getCustomers");
const getSingleCustomer = require("../middlewares/Customer/getSingleCustomer");
const saveCustomer = require("../middlewares/Customer/saveCustomer");
const delCustomer = require("../middlewares/Customer/delCustomer");

//models
const hairdresserModel = require("../models/Hairdresser");
const customerModel = require("../models/Customer");

module.exports = function (app) {
  const objectRepository = {
    hairdresserModel,
    customerModel,
  };

  /**
   * redirect -> /hairdressers
   */
  app.get("/", mainRedirect(objectRepository));

  /**
   * main page
   */
  app.get(
    "/hairdressers",
    getHairDressers(objectRepository),
    renderMW(objectRepository, "index")
  );

  /**
   * add hairdresser
   */
  app.use(
    "/hairdressers/add",
    saveHairDresser(objectRepository),
    renderMW(objectRepository, "addHairdresser")
  );

  /**
   * edit hairdresser
   */
  app.use(
    "/hairdressers/edit/:id",
    getSingleHairDresser(objectRepository),
    saveHairDresser(objectRepository),
    renderMW(objectRepository, "editHairdresser")
  );

  /**
   * delete hairdresser
   */
  app.use(
    "/hairdressers/delete/:id",
    getSingleHairDresser(objectRepository),
    delHairDresser(objectRepository),
    renderMW(objectRepository, "delHairdresser")
  );

  /**
   * customers page
   */
  app.get(
    "/hairdressers/:id/customers",
    getSingleHairDresser(objectRepository),
    getCustomers(objectRepository),
    renderMW(objectRepository, "customers")
  );

  /**
   * add customer
   */
  app.use(
    "/hairdressers/:id/customers/add",
    saveCustomer(objectRepository),
    renderMW(objectRepository, "addCustomer")
  );

  /**
   * edit hairdresser
   */
  app.use(
    "/hairdressers/:id/customers/edit/:cid",
    getSingleCustomer(objectRepository),
    saveCustomer(objectRepository),
    renderMW(objectRepository, "editCustomer")
  );

  /**
   * delete hairdresser
   */
  app.use(
    "/hairdressers/:id/customers/delete/:cid",
    getSingleCustomer(objectRepository),
    delCustomer(objectRepository),
    renderMW(objectRepository, "delCustomer")
  );
};

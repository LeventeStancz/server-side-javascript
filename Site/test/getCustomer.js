const { expect } = require("chai");

const getCustomers = require("../middlewares/Customer/getCustomers");

describe("getCustomers middleware", () => {
  let customerModelMock;
  let req;
  let res;
  let next;

  beforeEach(() => {
    customerModelMock = {
      find: () => ({
        sort: () => ({
          collation: () => ({
            then: () => ({
              catch: () => {},
            }),
          }),
        }),
      }),
    };
    req = {
      params: { id: "hairdresserId" },
    };
    res = {
      locals: {},
    };
    next = () => {};
  });

  it("should load customers from the database and save them to res.locals.customers", () => {
    const DBCustomersMock = ["customer1", "customer2"];
    customerModelMock.find = (query) => {
      expect(query).to.deep.equal({ _hairdresser: "hairdresserId" });
      return {
        sort: (sortOptions) => {
          expect(sortOptions).to.deep.equal({ name: 1 });
          return {
            collation: (collationOptions) => {
              expect(collationOptions).to.deep.equal({
                locale: "en",
                caseLevel: true,
              });
              return {
                then: (callback) => {
                  callback(DBCustomersMock);
                  return {
                    catch: () => {},
                  };
                },
              };
            },
          };
        },
      };
    };

    const middleware = getCustomers({
      customerModel: customerModelMock,
    });

    return new Promise((resolve, reject) => {
      next = () => {
        try {
          expect(res.locals.customers).to.deep.equal(DBCustomersMock);
          resolve();
        } catch (err) {
          reject(err);
        }
      };

      middleware(req, res, next);
    });
  });

  it("should call next with an error if req.params.id is undefined", () => {
    req.params.id = undefined;
    const middleware = getCustomers({
      customerModel: customerModelMock,
    });

    return new Promise((resolve, reject) => {
      next = (err) => {
        try {
          expect(err).to.equal("No hairdresser id in customers (customer)");
          resolve();
        } catch (err) {
          reject(err);
        }
      };

      middleware(req, res, next);
    });
  });

  it("should call next with an error if there is an error with the database", () => {
    const errorMessage = "Database error";
    customerModelMock.find = () => ({
      sort: () => ({
        collation: () => ({
          then: () => ({
            catch: (callback) => {
              callback(errorMessage);
              return {
                then: () => {},
              };
            },
          }),
        }),
      }),
    });

    const middleware = getCustomers({
      customerModel: customerModelMock,
    });

    return new Promise((resolve, reject) => {
      next = (err) => {
        try {
          expect(err).to.equal(errorMessage);
          resolve();
        } catch (err) {
          reject(err);
        }
      };

      middleware(req, res, next);
    });
  });
});

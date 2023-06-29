const { expect } = require("chai");

const getSingleHairDresser = require("../middlewares/Hairdresser/getSingleHairDresser");

describe("getSingleHairDresser middleware", () => {
  let hairdresserModelMock;
  let req;
  let res;
  let next;

  beforeEach(() => {
    hairdresserModelMock = {
      findOne: () => {},
    };
    req = {
      params: { id: "hairdresserId" },
    };
    res = {
      locals: {},
    };
    next = () => {};
  });

  it("should load a hairdresser from the database and save it to res.locals.hairdresser", () => {
    const DBhairdresserMock = "DBhairdresser";
    hairdresserModelMock.findOne = (query) => {
      expect(query).to.deep.equal({ _id: "hairdresserId" });
      return Promise.resolve(DBhairdresserMock);
    };

    const middleware = getSingleHairDresser({
      hairdresserModel: hairdresserModelMock,
    });

    return new Promise((resolve, reject) => {
      next = () => {
        try {
          expect(res.locals.hairdresser).to.equal(DBhairdresserMock);
          resolve();
        } catch (err) {
          reject(err);
        }
      };

      middleware(req, res, next);
    });
  });

  it("should call next with an error if findOne fails", () => {
    const errorMessage = "Database error";
    hairdresserModelMock.findOne = () => Promise.reject(errorMessage);

    const middleware = getSingleHairDresser({
      hairdresserModel: hairdresserModelMock,
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

  it("should call next with an error if req.params.id is undefined", () => {
    req.params.id = undefined;
    const middleware = getSingleHairDresser({
      hairdresserModel: hairdresserModelMock,
    });

    return new Promise((resolve, reject) => {
      next = (err) => {
        try {
          expect(err).to.equal("No id in edit (hairdresser)");
          resolve();
        } catch (err) {
          reject(err);
        }
      };

      middleware(req, res, next);
    });
  });
});

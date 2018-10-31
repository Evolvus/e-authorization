const debug = require("debug")("evolvus-e-authorization:routes:api:user");
const _ = require("lodash");
const user = require("@evolvus/evolvus-user");
const axios = require("axios");

var corporateURL = process.env.CORPORATE_URL || "http://localhost:8282/flux-services/corporate/status/";
var mainBranch = process.env.ENTITY_ID || "H001B001";
var timeOut = process.env.TIME_OUT || 5000;

const authCredentials = ["userId"];

var instance = axios.create({
  baseURL: corporateURL,
  timeout: timeOut
});

module.exports = (router) => {

  router.route("/user/authorize")
    .post((req, res, next) => {
      const response = {
        "status": "404",
        "description": "Server Error.Please contact Administrator",
        "data": {}
      };
      try {
        let body = _.pick(req.body, authCredentials);
        user.authorize(body).then((userObj) => {         
          response.data = userObj;
          response.description = "User found";
          debug(`user found: ${userObj.userId}`);
          res.status(200).send(userObj);
        }).catch((e) => {
          debug(`Authorization Failed due to ${e} `);
          response.description = `Authorization Failed due to ${e.toString()}`;
          res.status(404).send(response);
        });       
      } catch (e) {
        debug(`Try-catch failed due to ${e}`);
        response.data = e;
        response.description = `${e.toString()}`;
        res.status(404).send(response);
      }
    });
};

const debug = require("debug")("e-authorization:routes:api:user");
const _ = require("lodash");
const user = require("@evolvus/evolvus-user");
const axios = require("axios");

var corporateURL = process.env.CORPORATE_URL || "http://localhost:8282/flux-services/corporate/status/";
var mainBranch = process.env.ENTITY_ID || "H001B001";
var timeOut = process.env.TIME_OUT || 5000;

const authCredentials = ["userId", "corporateId", "roleId"];

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
        instance.get(body.corporateId).then((result) => {
          if (result.data != null && result.data.data != null) {
            if (result.data.data.status != null && result.data.data.status.toUpperCase() == "ACTIVE") {
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
            } else {
              response.description = "Corporate not found or it is Inactive";
              debug("Corporate not found or it is Inactive");
              res.status(404).send(response);
            }
          } else {
            debug("Server Error.Please contact Administrator");
            res.status(404).send(response);
          }
        }).catch((e) => {
          debug("Server Error.Please contact Administrator");
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

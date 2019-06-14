const debug = require("debug")("evolvus-e-authorization:routes:api:user");
const _ = require("lodash");
const user = require("@evolvus/evolvus-user");
const axios = require("axios");

var corporateURL = process.env.CORPORATE_URL || "http://192.168.1.151:8286/flux-services/corporate/status/";
var mainBranch = process.env.ENTITY_ID || "H001B001";
var timeOut = process.env.TIME_OUT || 5000;

const authCredentials = ["userId"];


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
        debug("Input corporateId is", req.body.corporateid);
        axios.get(`${corporateURL}${req.body.corporateid}`).then((resp) => {
          debug(`Response from ${corporateURL}${req.body.corporateid} is ${JSON.stringify(resp.data)}`);
          if (resp.data != null && resp.data.data != null && resp.data.data.exist == true) {
            if (resp.data.data.status != null && resp.data.data.status.toUpperCase() == "ACTIVE") {
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
              response.status = "400";
              response.description = "Corporate is INACTIVE";
              response.data = {};
              debug("response: " + JSON.stringify(response));
              res.status(400).send(response);
            }
          } else {
            response.status = "400";
            response.description = "Corporate not found";
            response.data = {};
            debug("response: " + JSON.stringify(response));
            res.status(400).send(response);
          }
        }).catch((error) => {
          debug(`failed to create user due to`, error);
          response.status = "400";
          response.description = "Server Error.Please contact Administrator";
          response.data = {};
          debug("response: " + JSON.stringify(response));
          res.status(400).json(response);
        });
      } catch (e) {
        debug(`Try-catch failed due to ${e}`);
        response.data = e;
        response.description = `${e.toString()}`;
        res.status(404).send(response);
      }
    });
};

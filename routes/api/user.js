const debug = require("debug")("e-authorization:routes:api:user");
const _ = require("lodash");
const user = require("@evolvus/evolvus-user");

const authCredentials = ["userId", "corporateId", "roleId"];
const response = {
  "status": "200",
  "description": "",
  "data": {}
};

module.exports = (router) => {

  router.route("/user/authorize")
    .post((req, res, next) => {
      try {
        
        let body = _.pick(req.body, authCredentials);
        user.authorize(body).then((user) => {
          response.data=user;
          response.description="User found";
          res.status(200).send(response);
        }).catch((e) => {
          response.status="404"; 
          response.data= e;
          response.description= `${e.toString()}`;
          res.status(404).send(response);
        });
      } catch (e) {
        response.status="404"; 
          response.data= e;
          response.description= `${e.toString()}`;
          res.status(404).send(response);
      }
    });
};

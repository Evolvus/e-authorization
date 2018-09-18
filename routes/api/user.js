const debug = require("debug")("e-authorization:routes:api:user");
const _ = require("lodash");
const user = require("@evolvus/evolvus-user");

const authCredentials = ["userId", "corporateId", "roleId"];

module.exports = (router) => {

  router.route("/user/authorize")
    .post((req, res, next) => {
      try {
        let body = _.pick(req.body, authCredentials);
        user.authorize(body).then((user) => {
          res.status(200).send(user);
        }).catch((e) => {
          const error = {
            status: '404',
            data: e,
            description: `${e.toString()}`
          }
          res.status(404).send(error);
        });
      } catch (e) {
        const error = {
          status: '404',
          data: e,
          description: `${e.toString()}`
        }
        res.status(404).send(error);
      }
    });
};

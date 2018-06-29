const debug = require("debug")("evolvus-platform-server:routes:api:user");
const _ = require("lodash");
const user = require("evolvus-user");
const application = require("evolvus-application");

const headerAttributes = ["tenantid", "entityid", "accesslevel"];
const authCredentials = ["userName", "applicationCode"];

module.exports = (router) => {
 
    router.route("/user/authorize")
        .post((req, res, next) => {
            try {
                let body = _.pick(req.body, authCredentials);
                user.authorize(body).then((user) => {
                    res.send(user);
                }).catch((e) => {
                    res.status(400).send(JSON.stringify({
                        error: e.toString(),
                        message: `Authentication Failed due to ${e}`
                    }));
                });
            } catch (e) {
                res.status(400).send(JSON.stringify({
                    error: e.toString(),
                    message: `Authentication Failed due to ${e}`
                }));
            }
        });

    router.route("/user/updateToken")
        .post((req, res, next) => {
            try {
                let body = _.pick(req.body, ["token", "id"]);
                user.updateToken(body.id, body.token).then((user) => {
                    res.send(user);
                }).catch((e) => {
                    res.status(400).send(JSON.stringify({
                        error: e.toString(),
                        message: `Token updation Failed due to ${e}`
                    }));
                });
            } catch (e) {
                res.status(400).send(JSON.stringify({
                    error: e.toString(),
                    message: `Token updation Failed due to ${e}`
                }));
            }
        });
};

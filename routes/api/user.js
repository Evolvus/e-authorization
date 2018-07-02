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
                    const res = {
                        status: '200',
                        data: user,
                        description: `${body.userName} authorized successfully.`
                    }
                    res.send(res);
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

    router.route("/user/updateToken")
        .post((req, res, next) => {
            try {
                let body = _.pick(req.body, ["token", "id"]);
                console.log('Updating toke for the user', body.id);
                user.updateToken(body.id, body.token).then((user) => {
                    const res = {
                        status: '200',
                        data: user,
                        description: `${user.userName} token updated successfully.`
                    }
                    res.send(res);
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
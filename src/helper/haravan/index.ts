import querystring from "querystring";
import { OAuth2 } from "oauth";
import jwt from "jsonwebtoken";
import request from "request";
import _ from "lodash";
import config from "../../utils/config-app";

export const buildUrlLogin = () => {
    let objQuery = {
        response_mode: config.response_mode,
        response_type: config.response_type,
        scope: config.scope_login,
        client_id: config.app_id,
        redirect_uri: config.login_callback_url,
        nonce: config.nonce,
    };
    let query = querystring.stringify(objQuery);
    return `${config.url_authorize}?${query}`;
};

export const buildUrlInstall = () => {
    let objQuery = {
        response_mode: config.response_mode,
        response_type: config.response_type,
        scope: config.scope,
        client_id: config.app_id,
        redirect_uri: config.install_callback_url,
        nonce: config.nonce,
    };
    let query = querystring.stringify(objQuery);
    return `${config.url_authorize}?${query}`;
};

export const getToken = (code: any, callback_url: any) => {
    return new Promise((resolve) => {
        try {
            let params: any = {};
            params.grant_type = config.grant_type;
            params.redirect_uri = callback_url;

            let _oauth2 = new OAuth2(
                config.app_id,
                config.app_secret,
                "",
                config.url_authorize,
                config.url_connect_token
            );

            _oauth2.getOAuthAccessToken(
                code,
                params,
                (
                    err: any,
                    accessToken: any,
                    refreshToken: any,
                    param_token: any
                ) => {
                    if (err) {
                        console.log("error", err);
                        resolve();
                    } else {
                        console.log("param_token", param_token);
                        resolve(param_token);
                    }
                }
            );
        } catch (error) {
            console.log("error", error);
            return resolve();
        }
    });
};

export const getUserFromDecodeJwt = (params: any) => {
    try {
        let userHR: any = jwt.decode(params.id_token);
        if (!_.isObjectLike(userHR)) {
            return {
                is_error: true,
                message: "Get User Info Failed",
            };
        }
        if (!userHR.id) {
            userHR.id = userHR.sub;
        }
        return userHR;
    } catch (e) {
        return {
            is_error: true,
            message: `Get User Info Failed ${e.message}`,
        };
    }
};

export const getShop = (access_token: any) => {
    return new Promise((resolve) => {
        let options = {
            method: "GET",
            url: "https://apis.haravan.com/com/shop.json",
            headers: {
                authorization: `Bearer ${access_token}`,
                "Content-Type": "application/json",
            },
            json: true,
        };

        request(options, function (error: any, response: any, body: any) {
            if (error) throw new Error(error);
            console.log(body);
            resolve(body);
        });
    });
};

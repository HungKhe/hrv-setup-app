import { Request, Response } from "express";
import _ from 'lodash';
import {
    buildUrlLogin,
    getToken,
    getUserFromDecodeJwt,
    buildUrlInstall,
    getShop,
} from "../../helper/haravan";
import config from "../../utils/config-app";
class Haravan {
    constructor() {
        this.onGetLoginApp = this.onGetLoginApp.bind(this);
        this.onPostLoginApp = this.onPostLoginApp.bind(this);
    }
    onGetLoginApp(req: Request, res: Response) {
        console.log('query: ', req.query)
        let url = buildUrlLogin();
        res.redirect(url);
    }
    async onPostLoginApp(req: Request, res: Response) {
        let code = req.body.code;
        if (!code) {
            return res.send("Code not found in request");
        }
        let param_token = await getToken(code, config.login_callback_url);
        if (!param_token) {
            return res.send("Something went wrong!").status(400);
        }
        let userHR: any = getUserFromDecodeJwt(param_token);
        if (userHR.is_error) {
            return res.send(userHR.message).status(400);
        }

        if (!userHR.id || !userHR.orgname) {
            return res.send("Can not find user or org").status(400);
        }
        userHR.isRoot = 0;
        if (userHR.role) {
            if (_.isString(userHR.role)) {
                userHR.isRoot = userHR.role == "admin" ? 1 : 0;
            } else {
                userHR.isRoot = userHR.role.includes("admin") ? 1 : 0;
            }
        }
        if (userHR.isRoot) {
            let url = buildUrlInstall();
            res.redirect(url);
        } else {
            return res
                .send("You are not authorized to access this page!")
                .status(401);
        }
    }
    async onGrandserviceInstallApp(req: Request, res: Response) {
        let code = req.body.code;
        console.log('code: ', code)
        try {
            if (!code) return res.send("Code not found in request");
            let param_token: any = await getToken(code, config.install_callback_url);
            if (!param_token)
                return res.send("Something went wrong!").status(400);
            let userHR: any = getUserFromDecodeJwt(param_token);
            if (userHR.is_error) return res.send(userHR.message).status(400);
            if (!userHR.id || !userHR.orgname)
                return res.send("Can not find user or org");
            let authorizeInfo = {
                access_token: param_token.access_token,
                refresh_token: param_token.refresh_token,
                expires_in: param_token.expires_in,
            };

            // authorizeInfo can save to database shop for reuse later

            //test request shop.json
            let shopData = await getShop(authorizeInfo.access_token);
            res.redirect('/');
            res.send(shopData);

            //if have use webhook, you need subscribe webhook with org token to use
            // await subscribe(authorizeInfo.access_token);
        } catch (err) {
            return res.send(err);
        }
    }
}

export default new Haravan();

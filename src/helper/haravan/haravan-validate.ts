import crypto from "crypto";
import { Application, NextFunction, Request, Response} from 'express';
export const haravan = (secret: any, field: any) => {
    if (!(this instanceof haravan)) return new haravan(secret, field);

    if (!secret) throw new Error("secret is required");
    field = field || "X-Haravan-Hmacsha256";

    return function (req: Request, res: Response, next: NextFunction) {
        var signature = req.get(field);
        if (signature) {
            var raw = "";
            req.on("data", function (chunk) {
                raw += chunk;
            });

            req.on("end", function () {
                req.haravanBody = raw;
            });

            req.fromHaravan = function () {
                var header = req.get(field);
                var sh = crypto
                    .createHmac("sha256", secret)
                    .update(new Buffer(req.haravanBody, "utf8"))
                    .digest("base64");

                return sh === header;
            };

            next();
        } else {
            req.fromHaravan = function () {
                return false;
            };

            next();
        }
    };
};

import express, { Application, Router } from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import dotenv from "dotenv";
import Routes from "./routes";
class App {
    public app: Application;
    constructor() {
        this.app = express();
        this.middleware();
    }
    private middleware(): void {
        this.app.use(bodyParser.json());
        this.app.use(bodyParser.urlencoded({ extended: false }));
        this.app.use(morgan("combined"));
        this.app.use(cors());
        this.routes();
        dotenv.config();
    }
    private routes() {
        // this.app.use("/", function (req, res) {
        //     res.redirect("/api/oauth/login");
        // });
        this.app.use("/api", Routes.router);
        this.app.get("/", (req, res, next) => {
            // res.redirect("/api/oauth/login");
            res.send(req.headers);
        });
        this.app.use("*", (req, res, next) => {
            res.status(404).send({
                message: "Page not found!!!",
            });
        });
    }
}

export default new App().app;

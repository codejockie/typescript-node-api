import { Application } from "express";

export abstract class CommonRoutesConfig {
    constructor(public app: Application, private name: string) {
        this.app = app;
        this.name = name;
        this.configureRoutes();
    }

    getName() {
        return this.name;
    }

    abstract configureRoutes(): Application;
}

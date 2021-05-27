import { CommonRoutesConfig } from "../common/common.routes.config";
import * as express from "express";
import { Availability } from "../src/api/Availability";
import { RetrieveAvailability } from "../src/api/RetrieveAvailability";

export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
    app.use((err, req, res, next) => {
      if (err instanceof SyntaxError) {
        console.error(err);
        return res.status(400).send({ status: 404, message: "BAD REQUEST" }); // Bad request
      }
      next();
    });
  }
  configureRoutes() {
    // (we'll add the actual route configuration here next)

    this.app
      .route(`/availability`)

      .post((req: express.Request, res: express.Response) => {
        const availability = new Availability(req.body, res);
        availability.add();
      });
    this.app
      .route(`/getavailability`)
      .post((req: express.Request, res: express.Response) => {
        const retrieveAvailability = new RetrieveAvailability(req.body, res);
        retrieveAvailability.retrieve();
      });
    return this.app;
  }
}

import { CommonRoutesConfig } from "../common/common.routes.config";
import * as express from "express";
import { Availability } from "../src/api/Availability";
export class UsersRoutes extends CommonRoutesConfig {
  constructor(app: express.Application) {
    super(app, "UsersRoutes");
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
      .route(`/getavailability/:userId`)
      .get((req: express.Request, res: express.Response) => {
        //const availability=new Availability(req);

        res.status(200).send(`GET requested for id ${req.params.userId}`);
      });
    return this.app;
  }
}

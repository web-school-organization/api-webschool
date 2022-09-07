import { Router } from "express";

import { schoolCreateController } from "../controllers/schools/schoolCreate.controller";

const routes = Router();

const schoolRoutes = () => {
  routes.post("/", schoolCreateController);

  return routes;
};

export default schoolRoutes;

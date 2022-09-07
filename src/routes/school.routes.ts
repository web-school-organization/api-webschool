import { Router } from "express";

import { schoolCreateController } from "../controllers/schools/schoolCreate.controller";
import { schoolListController } from "../controllers/schools/schoolList.controller";
import { schoolListOneController } from "../controllers/schools/schoolListOne.controller";

const routes = Router();

const schoolRoutes = () => {
  routes.post("/", schoolCreateController);
  routes.get("/", schoolListController);
  routes.get("/:id", schoolListOneController);

  return routes;
};

export default schoolRoutes;

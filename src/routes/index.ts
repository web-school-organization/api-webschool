import { Express } from "express";
import schoolRoutes from "./school.routes";

const AppRoutes = (app: Express) => {
  app.use("/schools", schoolRoutes());
};

export default AppRoutes;

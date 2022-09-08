import { Express } from "express";
import schoolRoutes from "./school.routes";
import sessionRoutes from "./session.routes";

const AppRoutes = (app: Express) => {
  app.use("/schools", schoolRoutes());
  app.use("/login", sessionRoutes());
};

export default AppRoutes;

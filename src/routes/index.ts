import { Express } from "express";
import sessionRoutes from "./session.routes";

const AppRoutes = (app: Express) => {
  app.use("/login", sessionRoutes());
};

export default AppRoutes;

import { Express } from "express";
import sessionRoutes from "./session.routes";
import teamsRoutes from "./team.routes";

const AppRoutes = (app: Express) => {
  app.use("/login", sessionRoutes());
  app.use("/teams", teamsRoutes());
};

export default AppRoutes;

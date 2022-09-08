import { Express } from "express";
import feedbackRoutes from "./feedback.routes";
import schoolRoutes from "./school.routes";
import sessionRoutes from "./session.routes";

const AppRoutes = (app:Express) => {
  app.use("/schools", schoolRoutes());
  app.use("/login", sessionRoutes());
  app.use("/feedback",feedbackRoutes())

};

export default AppRoutes;

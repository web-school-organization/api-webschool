import { Express } from "express";
import sessionRoutes from "./session.routes";
import teacherRoutes from "./teachers.routes";

const AppRoutes = (app: Express) => {
  app.use("/login", sessionRoutes());
  app.use("/teachers", teacherRoutes());
};

export default AppRoutes;

import { Express } from "express";
import schoolRoutes from "./school.routes";
import sessionRoutes from "./session.routes";
import studentRoutes from './students.routes'
const AppRoutes = (app:Express) => {
  app.use("/schools", schoolRoutes());
  app.use("/login", sessionRoutes());
  app.use('/students',studentRoutes())
};

export default AppRoutes;

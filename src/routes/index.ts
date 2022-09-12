import { Express } from "express";
import feedbackRoutes from "./feedback.routes";
import schoolRoutes from "./school.routes";
import sessionRoutes from "./session.routes";
import teamsRoutes from "./team.routes";
import teacherRoutes from "./teachers.routes";
import studentRoutes from "./students.routes";

const AppRoutes = (app: Express) => {
  app.use("/schools", schoolRoutes());
  app.use("/login", sessionRoutes());
  app.use("/feedback", feedbackRoutes());
  app.use("/teams", teamsRoutes());
  app.use("/teachers", teacherRoutes());
  app.use("/students", studentRoutes());
};

export default AppRoutes;

import {Router} from 'express'
import studentCreateController from '../controllers/students/studentCreate.controller';


const router = Router();

const studentRoutes = () => {
    router.post('',studentCreateController)
    return router;
  };
  
  export default studentRoutes;
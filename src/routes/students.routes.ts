import {Router} from 'express'
import studentCreateController from '../controllers/students/studentCreate.controller';
import authenticationMiddleware from '../middlewares/authentication.middleware' ;

const router = Router();

const studentRoutes = () => {
    router.post('',authenticationMiddleware,studentCreateController)
    return router;
  };
  
  export default studentRoutes;
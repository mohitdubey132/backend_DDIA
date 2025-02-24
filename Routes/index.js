import {Router} from 'express';
import UserRoutes from "./userRoutes.js";
const routes = Router();

routes.use('/api/user',UserRoutes)
export default routes;
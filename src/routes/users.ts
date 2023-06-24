import { Router } from "express";
import UsersView from '@/views/users/index.twig'

const usersRouter: Router = Router()

/* GET home page. */
usersRouter.get('/', function(req: any, res: any) {
    res.render(UsersView);
});

export default usersRouter
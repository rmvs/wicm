import { Router } from "express";
import UsersView from '@/views/users/index.twig'

const usersRouter: Router = Router()

/* GET home page. */
usersRouter.get('/', function(req: any, res: any) {
    Promise.all([fetch('https://jsonplaceholder.typicode.com/todos/1')
    .then(async(_) => {
        const json = res.json()
        res.send({userId: json.userId})
    })])
});

export default usersRouter
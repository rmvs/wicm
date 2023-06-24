import { Router,Request, Response } from "express";
import ContainersView from '@/views/containers/index.twig'

const containersRoute: Router = Router()

containersRoute.get('/',(req: Request,res: Response) => {
    return res.render(ContainersView)
})

export default containersRoute


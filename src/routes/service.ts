import { Request, Response, Router } from "express";
import ServiceView from '@/views/service/index.twig'

const serviceRouter = Router()

serviceRouter.get('/:str',(req: Request, res: Response) => {
    res.render(ServiceView)
})

export default serviceRouter
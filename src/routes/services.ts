import { Request, Response, Router } from "express";
import ServicesView from '@/views/services/index.twig'

const servicesRouter = Router()

servicesRouter.get('/',(req: Request, res: Response) => {
    res.render(ServicesView)
})

export default servicesRouter
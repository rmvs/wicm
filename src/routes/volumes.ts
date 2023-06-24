import { Router, Request, Response } from "express";
import VolumesView from '@/views/volumes/index.twig'
import appDbContext from "@/prisma";

const volumesRoute: Router = Router()

volumesRoute.get('/',(req: Request,res: Response) => {
    res.render(VolumesView)
})

volumesRoute.get('/details',async(req: Request, res: Response) => {
    const volumes = await appDbContext.volume.findMany({
        include: {
            service: true
        }
    })
    res.status(200).send({ volumes })
})

export default volumesRoute
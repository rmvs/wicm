import { Request, Response, Router } from "express";

const navBarRouter = Router()

navBarRouter.get('/',(req: Request, res: Response) => {

    res.status(200).send()
})

export default navBarRouter
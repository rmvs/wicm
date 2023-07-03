import { Request, Response, Router } from "express";
import ErrorView from '@/views/error.twig'
const logoutRouter = Router()

logoutRouter.get('/',async(req: Request, res: Response) => {
    const { error = undefined }: any = await new Promise((resolve: any, reject: any) => {
        req.session.destroy((err: any) => {
            if(err){
                reject({err})
            }else{
                res.clearCookie('accessToken')
                resolve({})
            }
        })
    })
    if(!error){
        res.redirect('/login')
        res.end()
    }else{
        res.render(ErrorView,{ error })
    }
})

export default logoutRouter
import { Request, Response, Router } from "express"
import LoginView from '@/views/login/index.twig'
import { usersMock } from "@/lib/mock"
import { hashMD5 } from "@/lib/utils"
import appDbContext from "@/prisma"

const loginRouter = Router()

loginRouter.get('/',(req: Request, res: Response) => {
    if((req.session as any).user){
        res.redirect('/')
    }else{
        res.render(LoginView)
    }    
})

loginRouter.post('/',async (req: Request,res: Response) => {
    const { username, password } = req.body
    const hashedPassword = hashMD5(password)
    let user = await appDbContext.user.findFirst({
        where: {
            login: username
        }
    })
    if(user){
        if(user.password === hashedPassword){
            (req.session as any).user = user
            res.redirect('/')
            return
        }      
    }
    res.render(LoginView,{error: 'Credenciais inválidas'})
})

export default loginRouter
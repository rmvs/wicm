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
    const buf = Buffer.from(`${username}:${password}`);
    const response = await fetch(process.env.API_URL + '/auth',{
        method: 'POST',
        headers: {
            'Authorization': `Basic ${buf.toString("base64")}`
        }
    });
    if(response.status === 200){
        const { accessToken = {} } = await response.json()
        if(accessToken){
            return res.cookie('accessToken',accessToken,{
                httpOnly: false
            }).redirect('/')
        }
    }   
    
    res.render(LoginView,{error: 'Credenciais inválidas'})
})

export default loginRouter
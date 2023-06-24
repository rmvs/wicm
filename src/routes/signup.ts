import { Request, Response, Router } from "express";
import SignUpView from '@/views/signup/index.twig'
import appDbContext from "@/prisma";
import { UserRole } from "@/lib/business/user";
import multer from "multer";
import { hashMD5 } from "@/lib/utils";
import path from 'path'

const signUpRouter = Router()

signUpRouter.get('/',(req: Request, res: Response) => {
    res.render(SignUpView)
})
// dest: 'public/uploads/'
signUpRouter.post('/',multer({ storage: multer.diskStorage({
    destination: (req: any,file: any,cb: any) => {
        cb(null,'public/uploads')
    },filename: (req: any, file: any, cb: any) => {
        cb(null, Date.now() + path.extname(file.originalname))
    }
}) }).single('archive'),async(req: Request, res: Response) => {
    if(Object.keys(req.body).length === 0){
        res.status(500).send({ error: 'Formulário não pode estar vazio' })
        return
    }
    const { username: login, password, email, givenName, familyName } = req.body
    let user = await appDbContext.user.findFirst({
        where: {
            login
        }
    })
    if(!user){
        user = await appDbContext.user.create({
            data: {
                login,
                password: hashMD5(password),
                userRole: {
                    connect: {
                        roleName: UserRole.ADMIN
                    }
                }
            }
        })
        res.status(200).send({ user })
    }else{
        res.status(400).send({ error: 'Já existe uma conta com este login!' })
    }    
    
})

export default signUpRouter
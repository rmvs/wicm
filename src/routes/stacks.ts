import { Request, Response, Router } from "express";
import StacksView from '@/views/stacks/index.twig'
import multer from "multer";
import appDbContext from "@/prisma";
import { generateUUID } from "@/lib/utils";
import fs from 'fs'
import os from 'path'

const stacksRouter = Router()

const upload = multer()

interface StackPayload {
    stackname: string,
    editor: string
    file: any
}


stacksRouter.get('/',(req: Request, res: Response) => {

    const stackTemplate = fs.readFileSync(os.join(__dirname,'public/templates/docker-compose.yml')).toString('utf-8')
    
    res.render(StacksView,{ stackTemplate })
})

stacksRouter.post('/',upload.any(),async(req: Request, res: Response) => {
    const { stackname, editor, file }: StackPayload = req.body
    let error = undefined,stack = undefined, uploadedFile = undefined
    const createdServices: any[] = []
    try{        
        if((req.files as any[])?.length > 0){
            uploadedFile = (req.files as any).shift()
            stack = JSON.parse(String(uploadedFile.buffer))
        }else{
            stack = JSON.parse(editor)
        }

        let createdStack = await appDbContext.stack.findFirst({
            where: {
                name: stackname
            }
        })

        if(createdStack){
            throw "Já existe uma stack com o mesmo nome!"
        }

        let environment = await appDbContext.environment.findFirst({
            where: {
                name: stack.environment
            }
        })

        if(!environment){
            environment = await appDbContext.environment.create({
                data: {
                    name: stack.environment
                }
            })
        }

        const network = await appDbContext.network.create({
            data: {
                name: generateUUID()
            }
        })
                 
        
        createdStack = await appDbContext.stack.create({
            data: {
                name: stackname,
                network: {
                    connect: {
                        id: network.id
                    }
                }                
            }
        })


        const services: any[] = stack.services
        for(let i = 0;i < services.length; i++){
            let im = await appDbContext.image.findFirst({
                where: {
                    name: services[i].image
                }
            })
            if(!im){
                im = await appDbContext.image.create({
                    data: {
                        name: services[i].image
                    }
                })
            }
            
            const volume = await appDbContext.volume.create({
                data: {
                    name: generateUUID()
                }
            })

            const _service = await appDbContext.service.create({
                data: {
                    name: services[i].name,
                    environment: {
                        connect: {
                            id: environment.id
                        }
                    },
                    serviceImage: {
                        connect: {
                            id: im.id
                        }
                    },
                    stack: {
                        connect: {
                            id: createdStack.id
                        }
                    },
                    volume: {
                        connect: {
                            id: volume.id
                        }
                    },
                }
            })
            createdServices.push(_service)
        }

    }catch(ex){
        error = String(ex)        
    }
    res.render(StacksView,{ msg: !error && `A stack foi criada, com ${createdServices.length} serviços!`, error })
})

export default stacksRouter
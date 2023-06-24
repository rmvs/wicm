import { Request, Response, Router } from "express";
import SettingsView from '@/views/settings/index.twig'

const settingsRouter = Router()

settingsRouter.get('/',(req: Request, res: Response) => {
    res.render(SettingsView)
})

export default settingsRouter
import { Router, Request, Response } from "express";
import DashboardView from '../views/dashboard/index.twig'
import { DASHBOARD_ITEMS } from "@/constants";
import appDbContext from "@/prisma";
import { Request as JWTRequest } from "express-jwt";

const dashboardRoute: Router = Router()

/* GET home page. */
dashboardRoute.get('/', async(req: JWTRequest, res: Response) => {    
    res.render(DashboardView);
});

export default dashboardRoute
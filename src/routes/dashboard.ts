import { Router, Request, Response } from "express";
import DashboardView from '../views/dashboard/index.twig'
import { DASHBOARD_ITEMS } from "@/constants";
import appDbContext from "@/prisma";

const dashboardRoute: Router = Router()

/* GET home page. */
dashboardRoute.get('/', async(req: Request, res: Response) => {
    const [stacks, volumes, services] = await Promise.all([
        appDbContext.stack.findMany({
            select: {
                network: true,
                services: true,
                name: true,
            }
        }),
        appDbContext.volume.findMany(),
        appDbContext.service.findMany({
            include: {
                serviceImage: true,
                environment: true,
                stack: true,
                volume: true
            }
        })
     ])
    const dashboardItems = {
        ...DASHBOARD_ITEMS,
        volumes: {
            ...DASHBOARD_ITEMS["volumes"],
            count: volumes.length
        },
        services: {
            ...DASHBOARD_ITEMS["services"],
            count: services.length
        },
        stacks: {
            ...DASHBOARD_ITEMS["stacks"],
            count: stacks.length           
        }
    }
    
    res.render(DashboardView,{
        dashboardItems,
        stacks,
        volumes,
        services
    });
});

export default dashboardRoute
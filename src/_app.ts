import createError  from 'http-errors'
import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import  {ExpressView} from "twigjs-loader";
import dashboardRoute from '@/routes/dashboard'
import volumesRoute from '@/routes/volumes'
import containersRoute from '@/routes/containers'
import navBar from '@/routes/navbar'
import servicesRouter from '@/routes/services'
import settingsRouter from '@/routes/settings'
import loginRouter from '@/routes/login'
import session from 'express-session'
import ErrorView from '@/views/error.twig'
import logoutRouter from '@/routes/logout'
import signUpRouter from '@/routes/signup'
import appDbContext from '@/prisma'
import stacksRouter from '@/routes/stacks'
import cors from 'cors'


// import indexRouter from './src/routes'
// import usersRouter from './src/routes/users'

// const ejs = require("ejs").__express;

const app = express();

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view', ExpressView)
// app.set('view engine', 'ejs');
app.set('view engine', 'twig')
// app.set('view options',{ layout: false })
// app.engine('ejs',ejs)


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
const sessionOptions: any = {
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
  cookie: {
    maxAge: 30 * 60 * 1000,
  }
}

if(process.env.NODE_ENV === 'production'){
  sessionOptions.cookie.secure = true
}


app.use(cors())

app.use(session(sessionOptions))

// const _config = webPackConfig()
// const compiler = webpack(_config as any)
// app.use(webpackDevMiddleware(compiler,{
//   publicPath: _config.output.path
// }))
// app.use(webpackHotMiddleware(compiler,{
//   path: '/__webpack_hmr'
// }))

// {
//   publicPath: _config.output.path,
//   serverSideRender: true,
// }

// {
//   log: console.log,
//   path: '/__webpack_hmr',
//   heartbeat: 10 * 1000,
// }

app.use(async(req: Request,res: Response,next: NextFunction) => {  
  res.locals = {
    baseUrl: req.url || '/',
    req: req
  }
  // if(process.env.NODE_ENV === 'development' && !(req.session as any).user){
  //   (req.session as any).user = await appDbContext.user.findFirst({
  //     where: {
  //       login: 'admin'
  //     },
  //     include: {
  //       userRole: true
  //     }
  //   })
  // }else{
  //   if(!(<any>req.session).user && !['/login','/error'].includes(req.url)){
  //     res.redirect('/login')
  //     return
  //   }
  // } 
  if(!(<any>req.session).user && !['/login','/error','/signup'].includes(req.url)){
    res.redirect('/login')
    return
  }
  next()
})


app.use('/', dashboardRoute)
app.use('/containers',containersRoute)
app.use('/volumes',volumesRoute)
app.use('/settings',settingsRouter)
app.use('/services',servicesRouter)
app.use('/login',loginRouter)
app.use('/logout',logoutRouter)
app.use('/signup',signUpRouter)
app.use('/stacks',stacksRouter)
app.use('/navbar',navBar)
app.use('*',(req,res) => res.status(404).send({erro: 'Página não encontrada'}))
// app.use('/users',usersRouter)
// app.use('/configs',configRouter)

// app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err: any, req: Request, res: Response, next: any) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render(ErrorView)
});


export default app
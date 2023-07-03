import createError  from 'http-errors'
import express, { NextFunction, Request, Response } from 'express'
import path from 'path'
import cookieParser from 'cookie-parser'
import logger from 'morgan'
import  {ExpressView} from "twigjs-loader";
import dashboardRoute from '@/routes/dashboard'
import volumesRoute from '@/routes/volumes'
import containersRoute from '@/routes/containers'
import usersRouter from './routes/users'
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
import { expressjwt } from 'express-jwt';
import serviceRouter from './routes/service'


// import indexRouter from './src/routes'
// import usersRouter from './src/routes/users'

// const ejs = require("ejs").__express;

const app = express();

app.use(cors({
  credentials: true,
  preflightContinue: true
}))

// view engine setup
// app.set('views', path.join(__dirname, 'views'));
app.set('view', ExpressView)
// app.set('view engine', 'ejs');
app.set('view engine', 'twig')
app.set('twig options',{allowAsync: true, strict_variables: false})
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

const jwt = expressjwt({
  secret: process.env.SECRET,
  algorithms: ['HS256'],
  getToken: (req) => req.cookies.accessToken
}).unless({ path: ['/login','/error','/signup'] });

const jwtVerification = (err: any, req: Request,res: Response,next: NextFunction) => {
  if(err.name === 'UnauthorizedError'){
    res.status(401).redirect('/login')
    return;
  }else{
    next()
  }
};

const middleware = async(req: Request,res: Response,next: NextFunction) => {
  res.locals = {
    baseUrl: req.url || '/',
    req: req
  }
  
  if(req.cookies.accessToken && (new Set(['/login']).has(req.url))){
    res.redirect('/')
  }
  next()
};

app.use([jwt,jwtVerification,middleware])

// app.use(
//   expressjwt({
//     secret: process.env.SECRET,
//     algorithms: ['HS256'],
//     getToken: (req) => req.cookies.accessToken
//   }).unless({ path: ['/login','/error','/signup'] }),
//   (err: any, req: Request,res: Response,next: NextFunction) => {
//     if(err.name === 'UnauthorizedError'){
//       res.status(401).redirect('/login')
//       return;
//     }
//   });

// app.use(async(req: Request,res: Response,next: NextFunction) => {
//   res.locals = {
//     baseUrl: req.url || '/',
//     req: req
//   }
  
//   if(req.cookies.accessToken && (new Set(['/login']).has(req.url))){
//     return res.redirect('/')
//   }
//   next()
// });


app.use('/', dashboardRoute)
app.use('/containers',containersRoute)
app.use('/users',usersRouter)
app.use('/volumes',volumesRoute)
app.use('/settings',settingsRouter)
// app.use('/services',servicesRouter)
app.use('/login',loginRouter)
app.use('/logout',logoutRouter)
app.use('/signup',signUpRouter)
app.use('/stacks',stacksRouter)
app.use('/service',serviceRouter)
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
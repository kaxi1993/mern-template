process.env.NODE_ENV = process.env.NODE_ENV || 'development';

import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import passport from 'passport';
import webpack from 'webpack';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import morgan from 'morgan';

import { ApiRoutes } from './routes.js';


// load environment variables
if (process.env.NODE_ENV !== 'production') {
  dotenv.config({
    path: path.resolve(new URL(`../config/.env.${process.env.NODE_ENV}`, import.meta.url).pathname)
  });
}

import { jwtLogin, localLogin } from './auth/auth.middlewares.js';
import devConfig from '../webpack.dev.js';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});

app.use(helmet());
app.use(limiter);
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false
  })
);
app.use(cookieParser());

// Apply passport middleware
passport.use(jwtLogin);
passport.use(localLogin);

// Apply API Routes
ApiRoutes(app);

if (process.env.NODE_ENV === 'development') {
  const compiler = webpack(devConfig);

  app.use(
    webpackDevMiddleware(compiler, {
      publicPath: '/',
      contentBase: path.resolve(new URL('../client', import.meta.url).pathname),
      hot: true,
      quiet: false,
      noInfo: false,
      lazy: false,
      stats: 'normal'
    })
  );

  app.use(
    webpackHotMiddleware(compiler, {
      path: '/__webpack_hmr',
      heartbeat: 2000
    })
  );

  app.use(express.static(path.resolve(new URL('../public', import.meta.url).pathname)));

  app.use((req, res, next) => {
    const filename = path.join(compiler.outputPath, 'index.html');

    compiler.outputFileSystem.readFile(filename, (err, result) => {
      if (err) {
        return next(err);
      }
      res.set('content-type', 'text/html');
      res.send(result);

      return res.end();
    });
  });
} else {
  app.use(express.static(path.resolve(new URL('../public', import.meta.url).pathname)));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(new URL('../index.html', import.meta.url).pathname));
  });
}

export default app;

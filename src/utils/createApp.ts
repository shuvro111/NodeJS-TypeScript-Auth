import cors from 'cors';
import dotenv from 'dotenv';
import express, { Express } from 'express';
import session from 'express-session';
import passport from 'passport';
import routes from '../routes';
import enableGoogleStrategy from './strategies/google';

dotenv.config();
export const createApp = (): Express => {
  //Enable Environment Variables
  const app = express();

  //Enable Middleware Parsing For Requests
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  //Enable CORS
  app.use(
    cors({
      origin: ['http://localhost:3000'],
      credentials: true,
    })
  );

  //Initialize Session
  app.use(
    session({
      secret: process.env.EXPRESS_SESSION_SECRET as string,
      resave: false,
      saveUninitialized: false,
      cookie: { maxAge: 60000 * 60 * 24 * 7 },
    })
  );

  // Enable Passport
  app.use(passport.initialize());
  app.use(passport.session());

  //Enable Strtegies
  enableGoogleStrategy();

  //Pre Configure Path To /api
  app.use('/api', routes);
  return app;
};

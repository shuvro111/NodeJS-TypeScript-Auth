import { Express } from 'express';
import sayHelloHandler from './hello.controllers';

const routes = (app: Express) => {
  app.get('/hello', sayHelloHandler);
};

export default routes;

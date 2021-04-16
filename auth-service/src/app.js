import express from 'express';
import routes from './routes';

const app = express();

routes.forEach(route => {
  if (route.type == "GET") {
    app.get(route.name, route.controller);
  }
  if (route.type == "POST") {
    app.post(route.name, route.controller);
  }
});

export default app;
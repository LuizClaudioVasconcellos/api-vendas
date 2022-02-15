import { response, Router } from 'express';

const routes = Router();

routes.get('/', (request, reponse) => {
  response.json({ message: 'Hello Dev!' });
});

export default routes;

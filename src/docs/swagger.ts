import { Express, Request, Response } from 'express';
import swaggerJSDoc from 'swagger-jsdoc';
import SwaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Rest API Docs',
      version: '1.0.0',
    },
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['src/modules/*/routes/*.ts', 'src/modules/*/services/*.ts'],
};

const swaggerSpec = swaggerJSDoc(options);

export default function swagger(app: Express) {
  app.use('/api-docs', SwaggerUi.serve, SwaggerUi.setup(swaggerSpec));

  app.use('/docs.json', (request: Request, response: Response) => {
    response.setHeader('Content-Type', 'application/json');
    response.send(swaggerSpec);
  });
}

import { env } from './env.config';

export const swaggerOptions = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'StudentPilot AI — Enterprise API Documentation',
      version: '1.0.0',
      description: 'Production-grade API documentation for StudentPilot AI Microservices & Core Platform.',
    },
    servers: [
      {
        url: `http://localhost:${env.PORT}`,
        description: 'Development Server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
    },
  },
  apis: ['./src/routes/**/*.ts'],
};

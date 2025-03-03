const express = require('express');
const bodyParser = require('body-parser');
const loginRoutes = require('./src/route/loginRoute');
const feedbackRoute = require('./src/route/feedbackRoute');
const connectDB = require('./src/config/db');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');
const env = require('dotenv');
const cors = require('cors'); 
env.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.options('*', cors());
connectDB;
const doc = {
  info: {
    title: 'Node.js API',
    description: 'API documentation for the Node.js application',
    version: '1.0.0',
  },
  host: 'localhost:3000',
  basePath: '/api',
};

const outputFile = './swagger-output.json';
const endpointsFiles = ['./src/route/loginRoute.js', './src/route/feedbackRoute.js'];

swaggerAutogen(outputFile, endpointsFiles, doc).then(() => {
  const swaggerSpec = require('./swagger-output.json');
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', loginRoutes);
  app.use('/api', feedbackRoute);
  app.get('/', (req, res) => {
    res.send('API is running. Visit /api-docs for Swagger documentation.');
  });

  app.listen(process.env.PORT || 3000, () => {
    console.log(`Server is running on port ${process.env.PORT || 3000}`);
    console.log(`API documentation is available at http://localhost:${process.env.PORT || 3000}/api-docs`);
  });
}).catch((err) => {
  console.error('Error generating Swagger docs:', err);
});

const express = require('express');
const bodyParser = require('body-parser');
const loginRoutes = require('./src/route/loginRoute');
const feedbackRoute = require('./src/route/feedbackRoute');
const connectDB = require('./src/config/db');
const swaggerAutogen = require('swagger-autogen')();
const swaggerUi = require('swagger-ui-express');

const app = express();
app.use(bodyParser.json());

connectDB 
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
  app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  app.use('/api', loginRoutes);
  app.use('/api', feedbackRoute);
  app.get('/', (req, res) => {
    res.send('API is running. Visit /api-docs for Swagger documentation.');
  });

  const PORT = 3000;
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`API documentation is available at http://localhost:${PORT}/api-docs`);
  });
}).catch((err) => {
  console.error('Error generating Swagger docs:', err);
});

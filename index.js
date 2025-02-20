const express = require('express');
const bodyParser = require('body-parser');
const loginRoutes = require('./src/route/loginRoute');
const connectDB = require('./src/config/db');
const feedbackRoute = require('./src/route/feedbackRoute')
const app = express();
app.use(bodyParser.json());  
connectDB

app.use('/api', loginRoutes);  
app.use('/api', feedbackRoute);  
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
const express = require('express');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const engineerRoutes = require('./routes/engineerRoutes');
const projectRoutes = require('./routes/projectRoutes');
const assignmentRoutes = require('./routes/assignmentRoutes');
const authMiddleware = require('./middlewares/authMiddleWare');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/auth', authRoutes);

app.get('/',(req,res)=>{
  res.status(200).json("Welcome to the App");
});

app.use('/api/v1/engineers', authMiddleware, engineerRoutes);
app.use('/api/v1/projects', authMiddleware, projectRoutes);
app.use('/api/v1/assignments', authMiddleware, assignmentRoutes);

module.exports = app;


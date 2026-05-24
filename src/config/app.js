import express from'express'
import cors  from 'cors'
import { authRouter } from '../modules/auth/auth.routes.js';
import { employRouter } from '../modules/employ/employ.routes.js';
import { taskRouter } from '../modules/tasks/tasks.route.js';
import { dashboardRouter } from '../modules/dashboardOverView/dashboard.route.js';
import { notificationRouter } from '../modules/notification/notification.route.js';

const app = express();
// { origin: 'http://localhost:5173' }
app.use(express.json());
app.use(cors());

app.use('/api/auth',authRouter)
app.use('/api/employ',employRouter)
app.use('/api/task',taskRouter)
app.use('/api/dash/overView', dashboardRouter);
app.use('/api/notification', notificationRouter);

app.get('/', (req, res) => {
  res.send('Hello World!');
});



export default app;
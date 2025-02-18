import express from 'express';
import morgan from 'morgan'

import appRoutes from './routes.js';


const app = express();

app.use(express.json());
app.use(morgan('dev'));

app.use(appRoutes);


export default app;
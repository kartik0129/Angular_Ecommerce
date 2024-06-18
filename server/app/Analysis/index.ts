import express from 'express'
import { perfromAnalysis } from './analysisController';

const routes = express.Router();

routes.post('/performAnalysis', perfromAnalysis);

export default routes;
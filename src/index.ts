import './pre-start'; // Must be the first import
import logger from 'jet-logger';
import { connect } from 'mongoose';

import EnvVars from './constants/EnvVars';
import server from './server';

// **** Run **** //

const SERVER_START_MSG =
  'Express server started on port: ' + EnvVars.Port.toString();

connect(process.env.MONGODB_URI!, {dbName:'Projet'}).then(() =>
  server.listen(EnvVars.Port, () => logger.info(SERVER_START_MSG))
);

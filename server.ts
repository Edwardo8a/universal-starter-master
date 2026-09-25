import 'zone.js/dist/zone-node';
import { enableProdMode } from '@angular/core';

// Express Engine
import { ngExpressEngine } from '@nguniversal/express-engine';
// Import module map for lazy loading
import { provideModuleMap } from '@nguniversal/module-map-ngfactory-loader';

import * as express from 'express';
import { join } from 'path';
import * as admin from 'firebase-admin';

// Faster server renders w/ Prod mode (dev mode never needed)
enableProdMode();

const serviceAccount = require(join(process.cwd(), 'app-progresivas-firebase-adminsdk-fbsvc-8bd67e532f.json'));

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: 'https://app-progresivas.firebaseio.com'
  });
}

// Express server
const app = express();

const PORT = process.env.PORT || 4000;
const DIST_FOLDER = join(process.cwd(), 'dist');

// * NOTE :: leave this as require() since this file is built Dynamically from webpack
const { AppServerModuleNgFactory, LAZY_MODULE_MAP } = require('./server/main');

// Our Universal express-engine (found @ https://github.com/angular/universal/tree/master/modules/express-engine)
app.engine('html', ngExpressEngine({
  bootstrap: AppServerModuleNgFactory,
  providers: [
    provideModuleMap(LAZY_MODULE_MAP)
  ]
}));

app.set('view engine', 'html');
app.set('views', join(DIST_FOLDER, 'browser'));

app.get('/api/firebase-status', async (req, res) => {
  try {
    const snapshot = await admin.database().ref('/').once('value');
    res.json({
      projectId: serviceAccount.project_id,
      status: 'ok',
      data: snapshot.val()
    });
  } catch (error) {
    res.status(500).json({
      projectId: serviceAccount.project_id,
      status: 'error',
      message: error.message
    });
  }
});

// Example Express Rest API endpoints
// app.get('/api/**', (req, res) => { });

// Server static files from /browser
app.get('*.*', express.static(join(DIST_FOLDER, 'browser'), {
  maxAge: '1y'
}));

// All regular routes use the Universal engine
app.get('*', (req, res) => {
  res.render('index', { req });
});

// Start up the Node server
app.listen(PORT, () => {
  console.log(`Node Express server listening on http://localhost:${PORT}`);
});

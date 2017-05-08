/**
 * Created by denis on 5/8/17.
 */
import WebpackDevServer from 'webpack-dev-server';
import webpack from 'webpack';

const devPort = 4000;

import express from 'express';
import path from 'path';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import session from 'express-session';
import api from './routes';


/* mongodb connection */
const db = mongoose.connection;
db.on('error', console.error);
db.once('open', () => {
    console.log('Conneted to mongodb server');
    mongoose.connect('mongodb://localhost/codelab');
});

const app = express();
const port = 3000;

app.use(morgan('dev'));
app.use(bodyParser.json());

app.use(session({
    secret: 'CodeLab1$1$234',
    resave: false,
    saveUninitialized: true
}));

app.use(function (err, req, res, next) {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});

app.use('/', express.static(path.join(__dirname, './../public')));

app.use('/api', api);

app.get('/hello', (req, res) => {
    return res.send('Hello CodeLab');
});

app.listen(port, () => {
    console.log('Express is listening on port', port);
});

if (process.env.NODE_ENV == 'development') {
    console.log('Server is running on development mode.');
    const config = require('../webpack.dev.config');
    const compiler = webpack(config);
    const devServer = new WebpackDevServer(compiler, config.devServer);
    devServer.listen(
        devPort, () => {
            console.log('webpack-dev-server is listenging on port', devPort);
        }
    );
}
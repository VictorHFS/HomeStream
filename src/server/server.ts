import express from 'express';
import ServerController from './server-controller';

const server = express();
const serverController = new ServerController();

server.get('/', serverController.get);

server.get('/movie/:name', serverController.findMovie);


export default server;


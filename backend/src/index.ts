import express from 'express';
import cors from 'cors';
import getAllFiles from './utils/handler/getAllFile';
import path from 'path';
import { Route } from './types';
import connectToDB from './utils/handler/connectToDB';
import dotenv from 'dotenv';
import WebSocket from 'ws';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:4200'
	})
);

app.listen(5000, async () => {
	console.log('Backend start on port 5000');

	await connectToDB();

	const routes = await getAllFiles(path.join(__dirname, 'api/'));

	for (const index in routes) {
		const { name, directory, ...content } = routes[index];

		const { method, path, handler } = content as Route;

		const route = app.route(`/${path}`);

		switch (method) {
			case 'GET':
				route.get((req, res) => handler(req, res));
				break;
			case 'POST':
				route.post((req, res) => handler(req, res));
				break;
		}
	}
});

const wss = new WebSocket.Server({ port: 3000 });

const gameRooms: Record<string, string[]> = {};

wss.on('connection', function connection(ws) {
	// console.log('[Backend] Nuova connessione al WebSocket!');
	// ws.send('benvenuto!');
	// ws.on('message', function incoming(message) {
	// 	console.log('[Backend] Messaggio ricevuto:', message.toString());
	// });
	// let i = 1;
	// setInterval(() => {
	// 	ws.send(`Messaggio ${i}`);
	// 	i++;
	// }, 1000);
	// ws.on('close', x => {
	// 	console.log('[Backend] Connessione chiusa', x);
	// });
});

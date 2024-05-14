import express from 'express';
import cors from 'cors';
import WebSocket from 'ws';
import getAllFiles from './utils/getAllFile';
import path from 'path';
import { Route } from './types';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:4200'
	})
);

app.listen(5000, async () => {
	console.log('Backend start on port 5000');

	const routes = await getAllFiles(path.join(__dirname, 'api/'));

	for (const index in routes) {
		const { name, directory, ...content } = routes[index];

		const { method, handler } = content as Route;

		const route = app.route(`/${name}`);

		switch (method) {
			case 'GET':
				route.get(handler);
				break;
			case 'POST':
				route.post((req, res) => handler(req, res));
				break;
		}
	}
});

// app.post('create-game', (req, res) => res.send('Ciao1'));

// app.route('/create-game').post((req, res) => res.send('ciuao'));

// const wss = new WebSocket.Server({ port: 8080 });

// wss.on('connection', function connection(ws) {
// 	console.log('[Backend] Nuova connessione al WebSocket!');

// 	ws.on('message', function incoming(message) {
// 		console.log('[Backend] Messaggio ricevuto:', message.toString());

// 		ws.send('Messaggio dal BACKEND');
// 	});
// });

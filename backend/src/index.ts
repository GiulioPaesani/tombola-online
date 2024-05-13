import express from 'express';
import cors from 'cors';
import WebSocket from 'ws';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: 'http://localhost:4200'
	})
);

app.listen(5000, () => {
	console.log('Backend start on port 5000');
});

app.post('/test', (req, res) => {
	res.send(`Funziona! Questa è la risposta del backend`);
});

const wss = new WebSocket.Server({ port: 8080 });

wss.on('connection', function connection(ws) {
	console.log('[Backend] Nuova connessione al WebSocket!');

	ws.on('message', function incoming(message) {
		console.log('[Backend] Messaggio ricevuto:', message.toString());

		ws.send('Messaggio dal BACKEND');
	});
});

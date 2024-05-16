import express from 'express';
import cors from 'cors';
import getAllFiles from './utils/handler/getAllFile';
import path from 'path';
import { Route } from './types';
import connectToDB from './utils/handler/connectToDB';
import dotenv from 'dotenv';
import initWebSocket from './utils/handler/initWebSocket';

dotenv.config();

export const FRONT_END_URL = process.env.ENVIRONMENT === 'production' ? 'http://localhost:4000' : 'http://localhost:4200';

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: FRONT_END_URL
	})
);

app.listen(5000, async () => {
	console.log('Backend start on port 5000');

	await connectToDB();
	initWebSocket();

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

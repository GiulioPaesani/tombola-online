import express from 'express';
import cors from 'cors';
import connectToDB from './utils/handler/connectToDB';
import dotenv from 'dotenv';
import initWebSocket from './utils/handler/initWebSocket';
import addPlayerToGame from './api/add-player-to-game';
import cards from './api/cards';
import createGame from './api/create-game';
import extractNumber from './api/extract-number';
import isGameCodeCorrect from './api/is-game-code-correct';
import kickPlayer from './api/kick-player';
import selectNumCards from './api/selectNumCards';
import players from './api/players';
import returnToLobby from './api/return-to-lobby';
import startGame from './api/start-game';
import generateCards from './api/generate-cards';

dotenv.config();

const app = express();

app.use(express.json());
app.use(
	cors({
		origin: ['http://localhost:4200', 'https://tombola-online.it', 'https://www.tombola-online.it'],
		methods: 'GET,HEAD,PUT,PATCH,POST,DELETE'
	})
);

app.use('/', addPlayerToGame);
app.use('/', cards);
app.use('/', createGame);
app.use('/', extractNumber);
app.use('/', isGameCodeCorrect);
app.use('/', kickPlayer);
app.use('/', selectNumCards);
app.use('/', players);
app.use('/', returnToLobby);
app.use('/', startGame);
app.use('/', generateCards);

app.listen(5000, async () => {
	console.log('Backend start on port 5000');

	await connectToDB();
	initWebSocket();
});

import { Router } from 'express';
import games from '../schemas/games';
import { EventType, Wins } from '../types';
import { checkAmbo, checkCinquina, checkDecina, checkQuaterna, checkTerno, checkTombola } from '../utils/checkWin';
import { io } from '../utils/handler/initWebSocket';

const extractNumber = Router();

extractNumber.post('/extract-number', async (req, res) => {
	const gameId = req.body.gameId;

	const game = await games.findOne({ gameId });

	if (!game) return res.sendStatus(404);

	const { extractedNumbers, socketIds, winCases, casesAlreadyWon } = game;

	const notExtractedNumbers = new Array(90)
		.fill(0)
		.map((x, index) => index + 1)
		.filter(number => !extractedNumbers.includes(number));

	if (!notExtractedNumbers.length) res.send(null);

	const randomNumber = notExtractedNumbers[Math.floor(Math.random() * notExtractedNumbers.length)];

	const nextWinCase = Object.keys(winCases)
		.filter(x => !casesAlreadyWon.includes(x))
		.find(winCase => winCases[winCase as keyof typeof winCases]);
	if (!nextWinCase) return;

	const wins: Wins = {
		type: nextWinCase,
		winners: []
	};

	const querys: Record<string, boolean> = {};

	for (const index in socketIds) {
		const player = socketIds[index];
		const { cards, formattedCards } = player;

		for (const index2 in formattedCards) {
			const card = cards[index2];

			if (!(randomNumber in card)) continue;

			card[randomNumber] = true;
			querys[`socketIds.${index}.cards.${index2}.${randomNumber}`] = true;

			const formattedCard = formattedCards[index2];

			switch (nextWinCase) {
				case 'ambo':
					wins.winners.push(...checkAmbo(card, formattedCard, player));
					break;
				case 'terno':
					wins.winners.push(...checkTerno(card, formattedCard, player));
					break;
				case 'quaterna':
					wins.winners.push(...checkQuaterna(card, formattedCard, player));
					break;
				case 'cinquina':
					wins.winners.push(...checkCinquina(card, formattedCard, player));
					break;
				case 'decina':
					wins.winners.push(...checkDecina(card, formattedCard, player));
					break;
				case 'tombola':
					wins.winners.push(...checkTombola(card, formattedCard, player));
					break;
			}
		}
	}

	if (wins.winners.length) {
		await games.updateOne({ gameId }, { $push: { casesAlreadyWon: wins.type } });

		io.to(gameId).emit(EventType.Wins, wins);
	}

	await games.updateOne({ gameId }, { $push: { extractedNumbers: randomNumber }, $set: querys });

	io.to(gameId).emit(EventType.ExtractedNumber, randomNumber);

	game.extractedNumbers.push(randomNumber);

	res.send({
		randomNumber
	});
});

export default extractNumber;

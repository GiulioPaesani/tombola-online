import { EventType } from '../../../types';
import games from '../schemas/games';
import { Route } from '../types';
import { io } from '../utils/handler/initWebSocket';

const route: Route = {
	method: 'POST',
	path: 'extract-number',
	handler: async (req, res) => {
		const gameId = req.body.gameId;

		const game = await games.findOne({ gameId });

		if (!game) return res.sendStatus(404);

		const notExtractedNumbers = new Array(100)
			.fill(0)
			.map((x, index) => index + 1)
			.filter(number => !game.extractedNumbers.includes(number));

		const randomNumber = notExtractedNumbers[Math.floor(Math.random() * notExtractedNumbers.length)];

		io.to(gameId).emit(EventType.ExtractedNumber, randomNumber);

		res.send(randomNumber.toString());
	}
};

export default route;

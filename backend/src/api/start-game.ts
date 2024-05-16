import games from '../schemas/games';
import { Route, EventType } from '../types';
import formatCard from '../utils/formatCard';
import generateCard from '../utils/generateCard';
import { io } from '../utils/handler/initWebSocket';

const route: Route = {
	method: 'POST',
	path: 'start-game',
	handler: async (req, res) => {
		const gameId = req.body.gameId;

		const game = await games.findOne({ gameId });
		if (!game) return res.sendStatus(404);

		const { socketIds } = game;

		for (let index = 1; index < socketIds.length; index++) {
			socketIds[index].cards = [];

			for (let i = 0; i < (socketIds[index].numCards ?? 1); i++) {
				socketIds[index].cards.push(generateCard());
			}

			socketIds[index].formattedCards = [];
			for (let i = 0; i < socketIds[index].cards.length; i++) {
				socketIds[index].formattedCards.push(formatCard(socketIds[index].cards[i]));
			}
		}

		await games.updateOne({ gameId }, { state: 'game', socketIds });

		io.to(gameId).emit(EventType.StartGame);
	}
};

export default route;

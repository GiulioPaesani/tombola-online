import { EventType } from '../../../types';
import games from '../schemas/games';
import { Route } from '../types';
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

		for (const index in socketIds) {
			socketIds[index].cards = [];

			for (let i = 0; i < (socketIds[index].numCards ?? 1); i++) {
				socketIds[index].cards.push(generateCard());
			}
		}

		await games.updateOne({ gameId }, { state: 'game', socketIds });

		io.to(gameId).emit(EventType.StartGame);
	}
};

export default route;

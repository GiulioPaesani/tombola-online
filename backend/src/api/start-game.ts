import { EventType } from '../../../types';
import games from '../schemas/games';
import { Route } from '../types';
import { io, sockets } from '../utils/handler/initWebSocket';

const route: Route = {
	method: 'POST',
	path: 'start-game',
	handler: async (req, res) => {
		const gameId = req.body.gameId;

		const game = await games.findOneAndUpdate({ gameId }, { state: 'game' }, { new: true });

		if (!game) return res.sendStatus(404);

		io.to(gameId).emit(EventType.StartGame);
	}
};

export default route;

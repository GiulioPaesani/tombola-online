import games from '../schemas/games';
import { Route, EventType } from '../types';
import { io } from '../utils/handler/initWebSocket';

const route: Route = {
	method: 'POST',
	path: 'return-to-lobby',
	handler: async (req, res) => {
		const gameId = req.body.gameId;

		let game = await games.findOneAndUpdate(
			{ gameId },
			{ state: 'lobby', extractedNumbers: [], casesAlreadyWon: [], 'socketIds.$[].cards': [], 'socketIds.$[].formattedCards': [] }
		);
		if (!game) return res.sendStatus(404);

		io.to(gameId).emit(EventType.ReturnToLobby);

		res.sendStatus(200);
	}
};

export default route;

import { Server, Socket } from 'socket.io';
import games from '../../schemas/games';

export let io: Server;
export const sockets: Socket[] = [];

const initWebSocket = () => {
	io = new Server(3000, {
		cors: {
			origin: 'http://localhost:4200'
		}
	});

	io.on('connection', socket => {
		sockets.push(socket);

		// socket.on('playerJoin', async playerInfo => {
		// 	const socketId = playerInfo.playerId;

		// const game = await games.findOne({ socketIds: socketId });

		// if (game) {
		// 	io.to(game.gameId).emit('playerJoin', playerInfo);
		// }
		// });
	});
};

export default initWebSocket;

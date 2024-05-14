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

		socket.on('disconnect', async () => {
			const game = await games.findOneAndUpdate({ 'socketIds.socketId': socket.id }, { $pull: { socketIds: { socketId: socket.id } } });

			if (game) {
				if (game.socketIds[0]?.socketId !== socket.id) {
					socket.leave(game.gameId);

					io.to(game.gameId).emit('playerLeave', {
						socketId: socket.id
					});
				} else {
					io.to(game.gameId).emit('hostDisconnect');

					io.in(game.gameId).disconnectSockets();

					await games.deleteOne({ gameId: game.gameId });
				}
			}
		});
	});
};

export default initWebSocket;

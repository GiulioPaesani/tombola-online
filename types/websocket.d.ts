export type WebSocketEvent = PlayerJoinEvent | PlayerLeaveEvent;

type PlayerJoinEvent = {
	event: 'playerJoin';
	playerId: string;
	playerUsername: string;
	playerAvatarUrl: string;
};

type PlayerLeaveEvent = {
	event: 'playerLeave';
	playerId: string;
};

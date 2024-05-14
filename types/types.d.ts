export type Event = PlayerJoinEvent & PlayerLeaveEvent;

export type GameOptions = {
	gameId: string;
};

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

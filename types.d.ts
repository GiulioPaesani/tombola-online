export const enum EventType {
	Connect = 'connect',
	HostDisconnected = 'HostDisconnected',
	PlayersUpdate = 'playersUpdate',
	StartGame = 'startGame'
}

export type GameOptions = {
	winCases: {
		ambo: boolean;
		terno: boolean;
		cinquina: boolean;
		decina: boolean;
		tombola: boolean;
	};
	maxPlayers: number;
	minCards: number;
	maxCards: number;
};

type Card = Record<number, boolean>;

export type Player = {
	socketId: string;
	username: string;
	avatarUrl: string;
	numCards: number | null;
	cards: Card[];
};

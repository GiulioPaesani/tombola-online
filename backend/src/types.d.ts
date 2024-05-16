import { Request, Response } from 'express';

type Route = {
	method: 'GET' | 'POST';
	path: string;
	handler: (req: Request, res: Response) => void;
};

export const enum EventType {
	Connect = 'connect',
	HostDisconnected = 'HostDisconnected',
	PlayersUpdate = 'playersUpdate',
	StartGame = 'startGame',
	ExtractedNumber = 'extractedNumber',
	Wins = 'wins',
	ReturnToLobby = 'returnToLobby'
}

export type GameOptions = {
	winCases: {
		ambo: boolean;
		terno: boolean;
		quaterna: boolean;
		cinquina: boolean;
		decina: boolean;
		tombola: boolean;
	};
	maxPlayers: number;
	minCards: number;
	maxCards: number;
};

export type Wins = {
	type: string;
	winners: Player[];
};

export type Player = {
	socketId: string;
	username: string;
	avatarUrl: string;
	numCards: number | null;
	cards: Card[];
	formattedCards: FormattedCard[];
};

export type Card = Record<number, boolean>;

export type FormattedCard = number[][];

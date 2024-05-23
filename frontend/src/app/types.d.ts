export type Toast = {
  toastId: string;
  type: 'success' | 'warning' | 'error' | 'party';
  text: string;
};

export const enum EventType {
  Connect = 'connect',
  HostDisconnected = 'HostDisconnected',
  PlayersUpdate = 'playersUpdate',
  StartGame = 'startGame',
  ExtractedNumber = 'extractedNumber',
  Wins = 'wins',
  ReturnToLobby = 'returnToLobby',
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

export type Card = Record<number, boolean>;

export type FormattedCard = number[][];

export type Player = {
  socketId: string;
  username: string;
  avatarNum: number;
  numCards: number | null;
  cards: Card[];
  formattedCards: FormattedCard[];
};

export type Wins = {
  type: string;
  winners: Player[];
};

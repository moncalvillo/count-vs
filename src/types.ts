export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
  Room: {
    roomCode?: string;
    roomName?: string;
    roomDescription?: string;
    roomCapacity?: number;
  };
};

export type AuthStackParamList = {
  Auth: undefined;
};

export type Participant = {
  id: string;
  name: string;
  score: number;
  isCurrent: boolean;
};

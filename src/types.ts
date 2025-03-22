export type RootStackParamList = {
  Home: undefined;
  CreateRoom: undefined;
  Room: {
    code: string;
    name?: string;
    description?: string;
    capacity?: number;
  };
  JoinRoom: undefined;
};

export type AuthStackParamList = {
  Auth: undefined;
};

export type Participant = {
  id: string;
  username: string;
  score: number;
};

export type RoomData = {
  code: string;
  name: string;
  description: string;
  capacity: number;
  createdAt: any;
  participants: Participant[];
};

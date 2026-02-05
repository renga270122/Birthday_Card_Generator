export interface Song {
  id: number;
  songNumber: number;
  title: string;
  titleTamil: string;
  place: string;
  placeTamil: string;
  problem: string[];
  lyrics: string;
}

export type RootStackParamList = {
  Home: undefined;
  SongDetail: { song: Song };
};

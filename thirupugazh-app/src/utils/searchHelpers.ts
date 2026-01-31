import { Song } from '../types';

export const searchSongs = (songs: Song[], query: string): Song[] => {
  if (!query.trim()) {
    return songs;
  }

  const lowerQuery = query.toLowerCase().trim();

  return songs.filter(song => {
    // Search by song number (exact or partial)
    const songNumberMatch = song.songNumber.toString().includes(lowerQuery);
    
    // Search by title (English or Tamil)
    const titleMatch = song.title.toLowerCase().includes(lowerQuery) ||
                      song.titleTamil.includes(query);
    
    // Search by place (English or Tamil)
    const placeMatch = song.place.toLowerCase().includes(lowerQuery) ||
                      song.placeTamil.includes(query);
    
    // Search by problem/topic
    const problemMatch = song.problem.some(p => 
      p.toLowerCase().includes(lowerQuery)
    );

    return songNumberMatch || titleMatch || placeMatch || problemMatch;
  });
};

export const highlightText = (text: string, query: string): string => {
  if (!query.trim()) return text;
  
  const regex = new RegExp(`(${query})`, 'gi');
  return text.replace(regex, '**$1**');
};

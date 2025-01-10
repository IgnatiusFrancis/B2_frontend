"use client";
import ArtistSong from "./ArtistSong";

export default function ArtistSongs({ tracks }) {
  
  return (
    <div className="flex flex-col gap-2">
      {tracks?.map((track) => (
        <ArtistSong
          key={track.id} 
          id={track.id} 
          title={track.title} 
          url={track.url} 
          artist={track.artist} 
          createdAt={track.createdAt} 
          audioUrl={track.audioUrl} 
          duration={track.duration} 
          publicId={track.publicId}
        />
      ))}
    </div>
  );
}

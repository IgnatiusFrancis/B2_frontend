"use client";
import ArtistSong from "./ArtistSong";
import NoContentAvailable from "./NoAvailableContent";

export default function ArtistSongs({ tracks }) {

  if (!tracks || tracks.length === 0) {
    return (
      <NoContentAvailable
        title="No Songs Found For Artists"
        message="It seems there are no songs available at the moment. Please check back later."
      />
    );
  }
  
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

import { fetchVideo, fetchVideoByArtist } from "@/lib/api";
import SingleVideo from "@/components/SingleVideo";

async function VideoId({ params }) {
  try {
    const video = await fetchVideo(params.videoid);

    const artistVideos = await fetchVideoByArtist(video?.artist?.id, 3);

    return (
      <>  
        <SingleVideo video={video} artistVideos={artistVideos} />
      </>
    );
  } catch (error) {
    console.error("Error loading video or artist videos:", error);
    return (
      <div>
        <p>Error loading data. Please try again later.</p>
      </div>
    );
  }
}

export default VideoId;

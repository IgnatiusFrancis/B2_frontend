import RecentPost from "./RecentPost";
import TrendingVideos from "./TrendingVideo";

async function HomePost({ videos }) {
  if (!videos || videos?.length === 0) {
    return (
      <div>
        <p className="text-gray-500 font-bold">No Posts Available</p>
      </div>
    );
  }

  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 py-4 w-full">
        {videos?.slice(0, 4)?.map((video) => (
          <TrendingVideos
            key={video?.id}
            id={video?.id}
            title={video?.title}
            url={video?.url}
            artist={video?.artist}
            date={video?.updatedAt}
          />
        ))}
      </div>
    </>
  );
}

export default HomePost;

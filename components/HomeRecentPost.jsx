"use client";
import RecentPost from "./RecentPost";

function HomeRecentPost({posts}) {
  if (!posts || posts.length === 0) {
    return (
      <div>
        <p className="text-gray-500 font-bold">No Posts Available</p>
      </div>
    );
  }

  return (
    <>
      <div className=" flex flex-col gap-1 pt-4 ">
        {posts &&
          posts
            ?.slice(0, 5)
            .map((post) => <RecentPost 
            key={post.id}
          id={post.id}
          title={post.title}
          url={post.url}
          updatedAt={post.updatedAt}
          date={post.date}
            />)}
      </div>
    </>
  );
}

export default HomeRecentPost;

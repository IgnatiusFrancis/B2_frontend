"use client";
import RecentPost from "./RecentPost";


async function HomePost({posts}) { 
    if (!posts || posts.length === 0) {
      return (
        <div>
          <p className="text-gray-500 font-bold">No Posts Available</p>
        </div>
      );
    }


  return (
    <>
      <div className="grid md:grid-cols-2 gap-4 py-4 w-full">
        {posts.slice(0, 6).map((post) => (
          <RecentPost  
          key={post.id}
          id={post.id}
          title={post.title}
          image={post.image}
          location={post.location}
          date={post.date}
        />
        ))}
      </div>
    </>
  );
}

export default HomePost;

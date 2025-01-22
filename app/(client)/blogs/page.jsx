import SectionHeader from "@/components/SectionHeader";
import { getPosts, getTopArtists } from "@/lib/api";
import SearchClient from "@/hooks/useSearch";
import AllBlogPosts from "@/components/AllBlogPosts";

async function Blogs() {
  const [posts, topArtists] = await Promise.all([getPosts(), getTopArtists()]);

  return (
    <>
      <SectionHeader
        title={"Trending Stories"}
        desc={
          "Dive into stories, tips, and ideas that spark curiosity and fuel creativity!"
        }
        bgWallpaper="/blogWallpaper.jpeg"
      />

      <SearchClient
        data={posts}
        ContentContainer={AllBlogPosts}
        searchFields={["title", "author"]}
        topArtists={topArtists}
      />
    </>
  );
}

export default Blogs;

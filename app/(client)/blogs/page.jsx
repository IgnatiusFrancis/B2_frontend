import SectionHeader from "@/components/SectionHeader";
import { getPosts } from "@/lib/api";
import SearchClient from "@/hooks/useSearch";
import AllBlogPosts from "@/components/AllBlogPosts";

async function Blogs() {
  const posts = await getPosts();

  return (
    <>
      <SectionHeader
        title={"Trending Stories"}
        desc={
          "Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis ad quae dolores? Unde similique beatae aspernatur dolore corporis tempore exercitationem."
        }
      />

      <SearchClient
        data={posts}
        ContentContainer={AllBlogPosts}
        searchFields={["title", "author"]}
      />
    </>
  );
}

export default Blogs;

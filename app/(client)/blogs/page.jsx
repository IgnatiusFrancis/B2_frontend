
import SectionHeader from "@/components/SectionHeader";

import { getPosts } from "@/lib/api";
import SearchClient from "@/hooks/useSearch";

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

      <SearchClient posts={posts} />
    </>
  );
}

export default Blogs;


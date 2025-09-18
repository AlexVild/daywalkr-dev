import { useEffect, useState } from "react";
import { getMostRecentPost, type BlogPost } from "../utils/postUtils";
import PostRenderer from "../components/PostRenderer";

export default function HomePage() {
  const [mostRecentPost, setMostRecentPost] = useState<BlogPost | null>(null);

  const fetchMostRecentPost = async () => {
    const post = await getMostRecentPost();
    setMostRecentPost(post);
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchMostRecentPost();
    };
    fetchData();
  }, []);

  return (
    <>
      <PostRenderer postId={mostRecentPost ? mostRecentPost.id : ""} />
    </>
  );
}

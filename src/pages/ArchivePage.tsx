import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getAllPosts, type BlogPost } from "../utils/postUtils";

const ArchivePage = () => {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoading(true);
      const allPosts = await getAllPosts();
      // Sort posts by date (newest first)
      const sortedPosts = allPosts.sort((a, b) => b.id.localeCompare(a.id));
      setPosts(sortedPosts);
      setLoading(false);
    };

    fetchPosts();
  }, []);

  return (
    <>
      <section id="posts">
        {loading ? null : (
          <div className="post-list">
            {posts.map((post) => (
              <div
                className="flex flex-row gap-4 mb-4 items-center"
                key={post.id}
              >
                <div className="post-date">{post.id}</div>
                <div>
                  <Link to={`/${post.id}`}>{post.title}</Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </>
  );
};

export default ArchivePage;

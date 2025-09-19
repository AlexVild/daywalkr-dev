import { useState, useEffect } from "react";
import { type BlogPost, loadPost } from "../utils/postUtils";
import ReactMarkdown from "react-markdown";

export default function PostRenderer({ postId }: { postId: string }) {
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      if (!postId) return;

      setLoading(true);
      setError(null);

      const loadedPost = await loadPost(postId);
      if (loadedPost) {
        setPost(loadedPost);
      } else {
        setError(`Post "${postId}" not found`);
      }
      setLoading(false);
    };

    fetchPost();
  }, [postId]);

  const markdownComponents = {
    h2: ({ node, ...props }: any) => <h2 className="text-center" {...props} />,
    img: ({ src, alt }: any) => (
      <div className="flex flex-col items-center text-center img-container mt-5 mb-7">
        <a href={src} target="_blank" rel="noopener">
          <img
            src={src}
            alt={alt}
            className="max-h-[20rem] rounded-md shadow-lg mb-3 object-cover"
          />
        </a>
        <span className="img-caption">{alt}</span>
      </div>
    ),
  };

  if (loading) {
    return null;
  }
  if (error) {
    return (
      <main>
        <div>Error: {error}</div>
      </main>
    );
  }
  if (!post) {
    return null;
  }

  return (
    <div className="max-w-[640px] mx-auto px-6 md:px-0 pb-10">
      <article>
        <ReactMarkdown components={markdownComponents}>
          {post.content}
        </ReactMarkdown>
      </article>
    </div>
  );
}

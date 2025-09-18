export interface BlogPost {
  id: string;
  content: string;
  title?: string;
}

export const AVAILABLE_POSTS = ["9.18.2025"];

export const loadPost = async (postId: string): Promise<BlogPost | null> => {
  try {
    const response = await fetch(`/posts/${postId}/post.md`);
    if (!response.ok) {
      return null;
    }
    const content = await response.text();

    // Extract title from first heading in markdown
    const titleMatch = content.match(/^##?\s+(.+)$/m);
    const title = titleMatch ? titleMatch[1] : postId;

    return {
      id: postId,
      content,
      title,
    };
  } catch (error) {
    console.error(`Failed to load post ${postId}:`, error);
    return null;
  }
};

export const getAllPosts = async (): Promise<BlogPost[]> => {
  const posts = await Promise.all(
    AVAILABLE_POSTS.map((postId) => loadPost(postId))
  );
  return posts.filter((post) => post !== null) as BlogPost[];
};

export const getMostRecentPost = async (): Promise<BlogPost | null> => {
  const posts = await getAllPosts();
  if (posts.length === 0) return null;
  posts.sort((a, b) => b.id.localeCompare(a.id));
  return posts[0];
};

export interface BlogPost {
  id: string;
  content: string;
  title?: string;
}

// Fallback list in case GitHub API fails
const FALLBACK_POSTS = ["9.18.2024", "9.18.2025", "9.19.2025"];

// Auto-discover posts from GitHub repository
const discoverPostsFromGitHub = async (): Promise<string[]> => {
  try {
    const response = await fetch(
      "https://api.github.com/repos/AlexVild/daywalkr-dev/contents/public/posts",
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
      }
    );

    if (!response.ok) {
      throw new Error(`GitHub API request failed: ${response.status}`);
    }

    const items = await response.json();

    if (!Array.isArray(items)) {
      throw new Error("Unexpected GitHub API response format");
    }

    const postIds = items
      .filter((item) => item.type === "dir") // Only directories
      .map((item) => item.name)
      .filter((name) => {
        // Basic validation - looks like a date pattern
        return /^\d+\.\d+\.\d+$/.test(name) || /^\d+\/\d+\/\d+$/.test(name);
      })
      .sort()
      .reverse(); // Newest first

    console.log(`📝 Discovered ${postIds.length} posts from GitHub:`, postIds);
    return postIds.length > 0 ? postIds : FALLBACK_POSTS;
  } catch (error) {
    console.warn("Failed to discover posts from GitHub API:", error);
    return FALLBACK_POSTS;
  }
};

// Cache the discovered posts to avoid repeated API calls
let cachedPosts: string[] | null = null;

export const getAvailablePosts = async (): Promise<string[]> => {
  if (cachedPosts) {
    return cachedPosts;
  }

  cachedPosts = await discoverPostsFromGitHub();
  return cachedPosts;
};

// Utility to refresh the posts cache (useful for development)
export const refreshPostsCache = async (): Promise<string[]> => {
  cachedPosts = null;
  return await getAvailablePosts();
};

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
  const availablePostIds = await getAvailablePosts();
  const posts = await Promise.all(
    availablePostIds.map((postId: string) => loadPost(postId))
  );
  return posts.filter((post: BlogPost | null) => post !== null) as BlogPost[];
};

export const getMostRecentPost = async (): Promise<BlogPost | null> => {
  const posts = await getAllPosts();
  if (posts.length === 0) return null;
  posts.sort((a, b) => b.id.localeCompare(a.id));
  return posts[0];
};

import { useParams } from "react-router-dom";
import PostRenderer from "../components/PostRenderer";

const PostView = () => {
  const { postId } = useParams<{ postId: string }>();

  return <PostRenderer postId={postId ?? ""} />;
};

export default PostView;

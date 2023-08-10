import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getPost } from '../api';
import EditableTextField from '../editableTextField';
const Post = () => {
  const { title } = useParams();
  const [post, setPost] = useState(null);
  const [postId, setPostId] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const postData = await getPost('title', title);
        const postId = Object.keys(postData)[0]; // Get the dynamic key
        const postInfo = postData[postId]; // Access the nested object
        setPostId(postId);
        setPost(postInfo);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching post:', error);
        setLoading(false);
      }
    };

    fetchPostData();
  }, []);
  return (
    <div>
      {post ? (
        <div>
          <div>
            <EditableTextField initialTitle={post.title} initialContent={post.content} postId = {postId}/>
          </div>
        </div>
      ) : (
        <p>Loading post data...</p>
      )}
    </div>
  );
};

export default Post;

import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import ReactMarkdown from "react-markdown";
import { Button } from "@mantine/core";

interface Comment {
  id: number;
  post_id: number;
  user_name: string;
  comment_content: string;
  created_at: string;
}

interface Post {
  id: number;
  date: string;
  title: string;
  body: string;
  comments: Comment[];
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [addingComment, showCommentBox] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      let { data: blog_posts, error } = await supabase
        .from("blog_posts")
        .select(
          " id, created_at, title, body, comments ( id, post_id, user_name, comment_content, created_at )"
        )
        .order("created_at", { ascending: false });
      console.log(blog_posts);
      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(blog_posts || []);
      }
    };
    fetchPosts();
  }, []);

  const handleAddComment = async (postId: number) => {
    // TODO: Change all alerts in this function to Mantine Notifications?
    if (!userName || !newComment) {
      alert("Please enter your name and a comment.");
      return;
    }

    if (newComment.length > 200) {
      alert("Comment cannot exceed 200 characters.");
      return;
    }

    const { data, error } = await supabase.from("comments").insert([
      {
        post_id: postId,
        user_name: userName,
        comment_content: newComment,
      },
    ]);

    if (error) {
      console.error("Error adding comment:", error);
    } else {
      // TODO: Make the page update automatically rather than forcing the user to refresh to see their comment.
      alert("Comment added successfully!");
      setNewComment("");
      setUserName("");

      // Refresh comments for the post
      const updatedPosts = posts.map((post) => {
        if (post.id === postId) {
          return {
            ...post,
            comments: [...post.comments, data[0]],
          };
        }
        return post;
      });
      setPosts(updatedPosts);
    }
  };

  return (
    <div className="max-w-1/2 flex flex-col content-center">
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post.id} className="flex flex-col content-center">
            <h2 className="text-3xl">{post.title}</h2>
            <article className="prose">
              <ReactMarkdown
                components={{
                  img: ({ node, ...props }) => (
                    <img
                      {...props}
                      className="max-w-1/2 h-auto"
                      alt={props.alt || ""}
                    />
                  ),
                }}
              >
                {post.body}
              </ReactMarkdown>
            </article>
            <h3 className="text-2xl mt-4">Comments:</h3>
            {post.comments.length === 0 ? (
              <p>No comments available</p>
            ) : (
              post.comments.map((comment) => (
                <div key={comment.id} className="mt-2">
                  <div>
                    <p className="font-bold">{comment.user_name}:</p>{" "}
                    {comment.comment_content}
                  </div>
                  <small className="text-gray-500">
                    {new Date(comment.created_at).toLocaleString()}
                  </small>
                </div>
              ))
            )}
            {addingComment ? (
              <form className="mt-4">
                <h4 className="text-xl">Add a Comment:</h4>
                <input
                  type="text"
                  placeholder="Your Name"
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  className="border p-2 w-full mt-2"
                />
                <textarea
                  placeholder="Your Comment (max 200 characters)"
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="border p-2 w-full mt-2"
                  maxLength={200}
                />
                <Button
                  color="#34342F"
                  onClick={() => handleAddComment(post.id)}
                >
                  Submit
                </Button>
              </form>
            ) : (
              <Button onClick={() => showCommentBox(true)}>Comment</Button>
            )}

            <br />
            <hr />
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;

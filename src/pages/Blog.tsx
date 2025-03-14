import { useState, useEffect } from "react";
import { supabase } from "../supabase/supabaseClient";
import ReactMarkdown from "react-markdown";

interface Post {
  id: number;
  date: string;
  title: string;
  body: string;
}

const Blog = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      let { data: blog_posts, error } = await supabase
        .from("blog_posts")
        .select("*");
      console.log(blog_posts);
      if (error) {
        console.error("Error fetching posts:", error);
      } else {
        setPosts(blog_posts || []);
      }
    };

    fetchPosts();
  }, []);

  return (
    <div>
      {posts.length === 0 ? (
        <p>No posts available</p>
      ) : (
        posts.map((post) => (
          <div key={post.id}>
            <h2>{post.title}</h2>
            <p>{post.body}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Blog;

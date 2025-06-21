import { Link, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";

const PostDetailPage = () => {
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const resPost = await fetch(`https://jsonplaceholder.typicode.com/posts/${id}`);
        if (!resPost.ok) throw new Error("Post tidak ditemukan");
        const postData = await resPost.json();
        setPost(postData);

        const resComments = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${id}`);
        if (!resComments.ok) throw new Error("Komentar tidak ditemukan");
        const commentsData = await resComments.json();
        setComments(commentsData);
      } catch (err) {
        setError(err.message);
      }
    };

    fetchPostAndComments();
  }, [id]);
  if (error) {
    return <p className="text-red-500">{error}</p>;
  }

  if (!post) {
    return <p>Loading...</p>;
  }

  return (
    <DashboardLayout title="News Management/Detail News">
      <Link to={"/dashboard/news"} className="bg-black rounded-md text-white font-bold px-4 py-2">
        Back
      </Link>
      <div className="w-full mx-auto mt-6 p-6 bg-white rounded shadow">
        <h2 className="text-2xl font-bold mb-2">{post.title.toUpperCase()}</h2>
        <p className="text-gray-700">{post.body}</p>

        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-4">Komentar</h3>

          {error ? (
            <p className="text-red-500">{error}</p>
          ) : comments.length === 0 ? (
            <p className="text-gray-500 italic">Belum ada komentar.</p>
          ) : (
            <ul className="space-y-4">
              {comments.map((comment) => (
                <li key={comment.id} className="border border-gray-200 p-4 rounded shadow-sm">
                  <p className="font-semibold text-purple-700">{comment.name.toUpperCase()}</p>
                  <p className="text-sm text-gray-500 mb-2">{comment.email}</p>
                  <p className="text-gray-700">{comment.body}</p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default PostDetailPage;

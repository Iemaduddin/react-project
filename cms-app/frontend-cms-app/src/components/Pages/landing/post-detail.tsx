import CommentsSection from "@/components/Fragments/CommentSection";
import BreadcrumbLanding from "@/components/Layouts/BreadcumbLanding";
import FooterLanding from "@/components/Layouts/FooterLanding";
import NavbarLanding from "@/components/Layouts/NavbarLanding";
import { baseUrl } from "@/main";
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  status: string;
  author: {
    id: number;
    name: string;
  };
  category: {
    id: number;
    name: string;
  };
  createdAt: string;
};

export default function PostDetail() {
  const { slug } = useParams<{ slug: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [recentPosts, setRecentPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [comment, setComment] = useState("");
  const [submittedComments, setSubmittedComments] = useState<string[]>([]);
  const urlBase = baseUrl;

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`${urlBase}/posts/${slug}`);
        if (!res.ok) throw new Error("Gagal mengambil data post");
        console.log("Slug di frontend:", slug);
        const data = await res.json();
        setPost(data.data);
        setLoading(false);
      } catch (err: any) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPost();
  }, [slug]);

  useEffect(() => {
    fetch(`${urlBase}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        setRecentPosts(data.data);
      })
      .catch(() => {});
  }, []);

  if (loading) return <p className="text-center mt-10">Memuat data...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;
  if (!post) return <p className="text-center text-gray-500 mt-10">Post tidak ditemukan.</p>;

  const filteredRecent = recentPosts.filter((p) => p.slug !== slug).slice(0, 5);
  const sameCategoryPosts = recentPosts.filter((p) => p.category?.id === post.category?.id && p.slug !== slug).slice(0, 5);
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  const handleSubmitComment = () => {
    if (comment.trim() !== "") {
      setSubmittedComments([...submittedComments, comment]);
      setComment("");
    }
  };

  return (
    <>
      <NavbarLanding />
      <div className="container mx-auto px-4 py-10">
        <BreadcrumbLanding items={[{ label: "Home", href: "/" }, { label: "Posts", href: "/#posts" }, { label: post.title }]} />

        <div className="flex flex-col lg:flex-row gap-10">
          {/* Konten utama */}
          <div className="lg:w-2/3">
            <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

            <div className="flex flex-wrap text-sm text-gray-500 mb-6 space-x-4">
              <span>Diposting pada {new Date(post.createdAt).toLocaleDateString()}</span>
              <span>
                Kategori: <span className="text-blue-600">{post.category?.name}</span>
              </span>
              <span>
                Oleh: <span className="text-gray-800 font-medium">{post.author?.name}</span>
              </span>
            </div>

            {post.thumbnail && <img src={`${urlBase}${post.thumbnail}`} alt={post.title} className="w-full max-h-130 object-cover rounded-lg shadow mb-6" />}

            <div className="prose max-w-none prose-p:leading-relaxed prose-headings:mt-6 prose-img:rounded-lg" dangerouslySetInnerHTML={{ __html: post.content }} />

            {/* Related Tags */}
            <div className="mt-8">
              <h4 className="font-semibold text-lg mb-2">Tags:</h4>
              <div className="flex flex-wrap gap-2 text-sm text-blue-600">
                <span className="bg-blue-50 px-2 py-1 rounded">#{post.category?.name}</span>
                <span className="bg-blue-50 px-2 py-1 rounded">#{post.author?.name}</span>
              </div>
            </div>

            {/* Comment Form */}
            <CommentsSection postId={post.id} currentUser={user} />
          </div>

          {/* Sidebar */}
          <aside className="lg:w-1/3 mt-10 lg:mt-0">
            <h3 className="text-xl font-semibold mb-4 border-b pb-2">📚 Artikel Serupa</h3>
            <ul className="space-y-4 mb-10">
              {sameCategoryPosts.map((item) => (
                <li key={item.id} className="flex items-start gap-3">
                  {item.thumbnail && <img src={`${urlBase}${item.thumbnail}`} alt={item.title} className="w-16 h-16 object-cover rounded" />}
                  <div className="flex-1">
                    <Link to={`/posts/${item.slug}`} className="font-medium text-blue-700 hover:underline line-clamp-2">
                      {item.title}
                    </Link>
                    <p className="text-xs text-gray-500">{new Date(item.createdAt).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>

            <h3 className="text-xl font-semibold mb-4 border-b pb-2">📰 Artikel Terbaru</h3>
            <ul className="space-y-4">
              {filteredRecent.map((recent) => (
                <li key={recent.id} className="flex items-start gap-3">
                  {recent.thumbnail && <img src={`${urlBase}${recent.thumbnail}`} alt={recent.title} className="w-16 h-16 object-cover rounded" />}
                  <div className="flex-1">
                    <Link to={`/posts/${recent.slug}`} className="font-medium text-blue-700 hover:underline line-clamp-2">
                      {recent.title}
                    </Link>
                    <p className="text-xs text-gray-500">{new Date(recent.createdAt).toLocaleDateString()}</p>
                  </div>
                </li>
              ))}
            </ul>
          </aside>
        </div>
      </div>
      <FooterLanding />
    </>
  );
}

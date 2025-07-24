import ScrollToTopButton from "@/components/Elements/ScrollToTopButton";
import FooterLanding from "@/components/Layouts/FooterLanding";
import NavbarLanding from "@/components/Layouts/NavbarLanding";
import { baseUrl } from "@/main";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: string;
  status: string;
  authorId: number;
  categoryId: number;
  createdAt: string;
  updatedAt: string;
  category: {
    id: number;
    name: string;
  };
};

type Category = {
  id: number;
  name: string;
};

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  const [search, setSearch] = useState("");
  const [debouncedSearch] = useDebounce(search, 800);
  const [selectedCategory, setSelectedCategory] = useState<number | "all">("all");

  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;
  const urlBase = baseUrl;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [postRes, catRes] = await Promise.all([
          fetch(`${urlBase}/posts`, {
            method: "GET",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
            },
          }),
          fetch(`${urlBase}/categories`),
        ]);

        if (!postRes.ok || !catRes.ok) throw new Error("Gagal mengambil data");

        const postData = await postRes.json();
        const catData = await catRes.json();

        setPosts(postData.data);
        setCategories(catData.data);
        setPending(false);
      } catch (error: any) {
        setError(error.message);
        setPending(false);
      }
    };

    fetchData();
  }, []);

  const filteredPosts = posts.filter((post) => post.title.toLowerCase().includes(debouncedSearch.toLowerCase())).filter((post) => selectedCategory === "all" || post.categoryId === selectedCategory);

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = filteredPosts.slice(indexOfFirstPost, indexOfLastPost);

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage);

  return (
    <div className="flex flex-col min-h-screen font-sans text-gray-800">
      <ScrollToTopButton />

      {/* Navbar */}
      <NavbarLanding />

      {/* Hero */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-400 text-white text-center py-20 px-4">
        <div className="max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight mb-4">Selamat Datang di CMS Post Management</h2>
          <p className="text-lg md:text-xl mb-6">Kelola, tampilkan, dan bagikan informasi terbaikmu di sini. Platform manajemen konten yang powerful dan fleksibel.</p>
          <a href="#posts" className="inline-block bg-white text-blue-600 font-semibold px-6 py-3 rounded shadow hover:bg-gray-100 transition">
            Lihat Postingan
          </a>
        </div>
      </section>

      {/* Search & Filter */}
      <div className="container mx-auto px-6 mt-10 flex flex-col md:flex-row gap-4 items-center justify-between">
        <input
          type="text"
          placeholder="Cari postingan..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setCurrentPage(1);
          }}
          className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-lg shadow-sm"
        />
        <select
          value={selectedCategory}
          onChange={(e) => {
            const val = e.target.value;
            setSelectedCategory(val === "all" ? "all" : parseInt(val));
            setCurrentPage(1);
          }}
          className="border border-gray-300 px-4 py-2 rounded-lg shadow-sm"
        >
          <option value="all">Semua Kategori</option>
          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Posts Section */}
      <main id="posts" className="container mx-auto px-6 py-10">
        <h3 className="text-3xl font-bold mb-10 text-center">📢 Postingan Terbaru</h3>

        {pending ? (
          <p className="text-center text-lg">Memuat data...</p>
        ) : error ? (
          <p className="text-center text-red-500">{error}</p>
        ) : filteredPosts.length === 0 ? (
          <p className="text-center text-gray-500">Tidak ada postingan ditemukan.</p>
        ) : (
          <>
            <p className="text-end mb-4">
              Menampilkan {currentPosts.length} dari {filteredPosts.length} konten
            </p>
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {currentPosts.map((post) => (
                <a key={post.id} href={`/posts/${post.slug}`} className="bg-white border rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                  {post.thumbnail && <img src={`${urlBase}${post.thumbnail}`} alt={post.title} className="w-full h-72 object-cover" />}
                  <div className="p-5">
                    <h4 className="text-xl font-semibold mb-1">{post.title}</h4>
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-[10px] uppercase font-medium mb-2 inline-block">{post.category?.name || "Tidak Berkategori"}</span>
                    <p className="text-sm text-gray-600 mb-3">{post.content.slice(0, 100)}...</p>
                    <p className="text-xs text-gray-400">Diposting pada {new Date(post.createdAt).toLocaleDateString()}</p>
                    <span className="text-sm text-blue-600 font-medium hover:underline inline-block mt-2">Baca Selengkapnya →</span>
                  </div>
                </a>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-10 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((num) => (
                <button key={num} onClick={() => setCurrentPage(num)} className={`px-4 py-2 rounded border ${num === currentPage ? "bg-blue-600 text-white" : "bg-white text-gray-700 hover:bg-blue-50"}`}>
                  {num}
                </button>
              ))}
            </div>
          </>
        )}
      </main>

      {/* About */}
      <section id="about" className="bg-gray-100 py-16 px-6 text-center">
        <h3 className="text-3xl font-bold mb-4">Tentang CMS</h3>
        <p className="max-w-2xl mx-auto text-gray-700">
          CMS ini memungkinkan Anda mengelola konten dengan mudah, menyusun artikel, dan mempublikasikan berita tanpa hambatan teknis. Sangat cocok untuk organisasi, blog pribadi, hingga portal berita.
        </p>
      </section>

      {/* Footer */}
      <FooterLanding />
    </div>
  );
}

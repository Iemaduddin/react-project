type Post = {
  id: number;
  title: string;
  slug: string;
};

type Props = {
  latestPosts: Post[];
  relatedPosts: Post[];
};

export default function SidebarLanding({ latestPosts, relatedPosts }: Props) {
  return (
    <aside className="space-y-8">
      <div>
        <h4 className="text-lg font-semibold mb-2">📌 Artikel Terbaru</h4>
        <ul className="text-sm space-y-1 text-blue-600">
          {latestPosts.map((post) => (
            <li key={post.id}>
              <a href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
      <div>
        <h4 className="text-lg font-semibold mb-2">🔗 Artikel Terkait</h4>
        <ul className="text-sm space-y-1 text-blue-600">
          {relatedPosts.map((post) => (
            <li key={post.id}>
              <a href={`/posts/${post.slug}`} className="hover:underline">
                {post.title}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}

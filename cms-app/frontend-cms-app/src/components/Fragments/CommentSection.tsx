import { baseUrl } from "@/main";
import { Icon } from "@iconify/react";
import { useEffect, useState } from "react";
export type CommentType = {
  createdAt: string | number | Date;
  id: number;
  postId: number;
  userId: number;
  content: string;
  user: {
    name: string;
  };
  replies?: CommentType[];
};

type CommentsSectionProps = {
  postId: number;
  currentUser: {
    id: number;
    name: string;
    role: {
      name: string;
    };
  };
};

export default function CommentsSection({ postId, currentUser }: CommentsSectionProps) {
  const [comments, setComments] = useState<CommentType[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [replyTo, setReplyTo] = useState<number | null>(null);
  const urlBase = baseUrl;

  const fetchComments = async () => {
    try {
      const res = await fetch(`${urlBase}/comments/${postId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setComments(data.data);
    } catch (error) {
      console.error("Gagal mengambil komentar:", error);
    }
  };

  useEffect(() => {
    fetchComments();
  }, []);

  const handleSubmit = async () => {
    if (!commentInput) return;

    try {
      const token = localStorage.getItem("token");

      await fetch(`${urlBase}/comments/store`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: commentInput,
          postId,
          parentId: replyTo,
        }),
      });

      setCommentInput("");
      setReplyTo(null);
      fetchComments();
    } catch (error) {
      console.error("Gagal mengirim komentar:", error);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`${urlBase}/comments/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      fetchComments();
    } catch (error) {
      console.error("Gagal menghapus komentar:", error);
    }
  };

  const [visibleRepliesIds, setVisibleRepliesIds] = useState<number[]>([]);

  const toggleRepliesVisibility = (commentId: number) => {
    setVisibleRepliesIds((prev) => (prev.includes(commentId) ? prev.filter((id) => id !== commentId) : [...prev, commentId]));
  };
  function timeAgo(dateString: string) {
    const date = new Date(dateString);
    const now = new Date();
    const diff = (now.getTime() - date.getTime()) / 1000; // dalam detik

    const rtf = new Intl.RelativeTimeFormat("id", { numeric: "auto" });

    const units: [Intl.RelativeTimeFormatUnit, number][] = [
      ["year", diff / (60 * 60 * 24 * 365)],
      ["month", diff / (60 * 60 * 24 * 30)],
      ["week", diff / (60 * 60 * 24 * 7)],
      ["day", diff / (60 * 60 * 24)],
      ["hour", diff / (60 * 60)],
      ["minute", diff / 60],
      ["second", diff],
    ];

    for (const [unit, value] of units) {
      const rounded = Math.floor(value);
      if (rounded >= 1) return rtf.format(-rounded, unit);
    }

    return "Baru saja";
  }

  const renderComments = (commentsList: CommentType[]) => {
    const isLoggedIn = !!localStorage.getItem("token");
    return commentsList.map((c) => (
      <div key={c.id} className="mb-4 border p-3 rounded bg-gray-50">
        <div className="flex justify-between">
          <div>
            <p className="font-semibold">{c.user.name}</p>
            <p className="text-xs text-gray-500">{timeAgo(c.createdAt.toString())}</p>
          </div>
          {isLoggedIn && (c.userId === currentUser.id || ["admin", "superadmin"].includes(currentUser.role.name)) && (
            <button onClick={() => handleDelete(c.id)} className="text-red-500 text-xs">
              Hapus
            </button>
          )}
        </div>
        <p className="text-sm ms-2 mt-5">{c.content}</p>

        <div className="mt-2 flex gap-3">
          <button
            onClick={() => {
              setReplyTo(c.id);
              setCommentInput(`@${c.user.name} `);
            }}
            className="text-blue-500 text-xs"
          >
            Balas
          </button>

          {c.replies && c.replies.length > 0 && (
            <button onClick={() => toggleRepliesVisibility(c.id)} className="text-gray-600 text-xs">
              <div className="flex gap-1 items-center">
                <Icon icon="mdi:chat-outline" width={16} />
                {visibleRepliesIds.includes(c.id) ? `Sembunyikan ${c.replies.length} balasan` : `Lihat ${c.replies.length} balasan`}
              </div>
            </button>
          )}
        </div>

        {/* Nested Replies */}
        {c.replies && c.replies.length > 0 && visibleRepliesIds.includes(c.id) && <div className="ml-6 mt-3 border-l pl-4">{renderComments(c.replies)}</div>}
      </div>
    ));
  };

  return (
    <div className="mt-10">
      <h4 className="text-lg font-semibold mb-2">Tinggalkan Komentar</h4>
      <textarea rows={3} className="w-full border border-gray-300 rounded p-2 mb-2" placeholder="Tulis komentar..." value={commentInput} onChange={(e) => setCommentInput(e.target.value)} />
      <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">
        Kirim
      </button>

      {/* Komentar */}
      <div className="mt-8">
        <h5 className="font-semibold mb-2">Komentar:</h5>
        {Array.isArray(comments) && comments.length > 0 ? <div>{renderComments(comments)}</div> : <p className="text-sm text-gray-500">Belum ada komentar</p>}
      </div>
    </div>
  );
}

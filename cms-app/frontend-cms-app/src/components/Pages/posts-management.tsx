import { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import DataTable, { type TableColumn } from "react-data-table-component";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { DialogAddPost } from "../Fragments/DialogAddPost";
import { DialogEditPost } from "../Fragments/DialogEditPost";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { baseUrl } from "@/main";

type Post = {
  id: number;
  title: string;
  slug: string;
  content: string;
  thumbnail: File | string;
  status: string;
  categoryId: number;
  category: {
    id: number;
    name: string;
  };
  author: {
    id: number;
    name: string;
    role: {
      name: string;
    };
  };
};

const formSchema = z.object({
  id: z.number().optional(),
  title: z.string().min(1, "Judul wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
  content: z.string().min(1, "Konten wajib diisi"),
  thumbnail: z
    .any()
    .refine((file) => file instanceof File || typeof file === "string", { message: "Thumbnail wajib diunggah" })
    .refine((file) => typeof file === "string" || ["image/jpeg", "image/jpg", "image/png"].includes(file.type), { message: "Format thumbnail harus JPG atau JPEG atau PNG" }),
  status: z.string().min(1, "Status wajib diisi"),
  categoryId: z.number().min(1, "Pilih kategori yang valid"),
});

export type FormPostSchemaType = z.infer<typeof formSchema>;
const PostsManagementPage = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedPost, setSelectedPost] = useState<FormPostSchemaType | null>(null);
  const [filteredPosts, setFilteredPosts] = useState<Post[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const urlBase = baseUrl;

  const formEdit = useForm<FormPostSchemaType>({
    resolver: zodResolver(
      formSchema.extend({
        title: z.string().min(1, "Judul wajib diisi"),
        slug: z.string().min(1, "Slug wajib diisi"),
        content: z.string().min(1, "Konten wajib diisi"),
        thumbnail: z.union([z.string(), z.instanceof(File)]),
        status: z.string().min(1, "Status wajib diisi"),
        categoryId: z.number().min(1, "Pilih kategori yang valid"),
      })
    ),
    defaultValues: {
      id: undefined,
      title: "",
      slug: "",
      content: "",
      thumbnail: undefined,
      status: "",
      categoryId: 0,
    },
  });

  const handleEdit = (post: Post) => {
    const formDataEdit: FormPostSchemaType = {
      id: post.id,
      title: post.title,
      slug: post.slug,
      content: post.content,
      thumbnail: post.thumbnail,
      status: post.status,
      categoryId: post.categoryId,
    };

    formEdit.reset(formDataEdit);
    setPreviewUrl(typeof post.thumbnail === "string" ? post.thumbnail : null);
    setSelectedPost(formDataEdit);
    setOpenEdit(true);
  };

  useEffect(() => {
    fetch(`${urlBase}/posts`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal Mengambil Data");
        }
        return res.json();
      })
      .then((data) => {
        setFilteredPosts(data.data);
        setPosts(data.data);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);

  const onSubmitUpdate = async (values: FormPostSchemaType) => {
    setPending(true);
    const formData = new FormData();
    formData.append("title", values.title);
    formData.append("slug", values.slug);
    formData.append("content", values.content);
    formData.append("status", values.status);
    formData.append("categoryId", String(values.categoryId));

    if (values.thumbnail instanceof File) {
      formData.append("thumbnail", values.thumbnail);
    }

    try {
      const token = localStorage.getItem("token");

      const res = await fetch(`${urlBase}/posts/update/${values.id}`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Gagal Memperbarui Post");
      }

      const updatedPosts = posts.map((post) => (post.id === data.post.id ? data.post : post));
      setPosts(updatedPosts);

      formEdit.reset();
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);

      toast.success("Berhasil Memperbarui Post");
      setOpenEdit(false);
    } catch (error) {
      toast.error("Gagal Memperbarui Post");
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = posts.filter(
        (post) =>
          post.title.toLowerCase().includes(search.toLowerCase()) ||
          post.slug.toLowerCase().includes(search.toLowerCase()) ||
          post.content.toLowerCase().includes(search.toLowerCase()) ||
          (typeof post.thumbnail === "string" && post.thumbnail.toLowerCase().includes(search.toLowerCase())) ||
          post.status.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredPosts(filtered);
    }, 300);

    return () => clearTimeout(timeout);
  }, [search, posts]);

  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${urlBase}/posts/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus post");
      setPosts((prev) => prev.filter((post) => post.id !== id));
      toast.success("Post berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus post");
    }
  };

  const userData = localStorage.getItem("user");

  let userRole = null;

  if (userData) {
    try {
      const user = JSON.parse(userData);
      userRole = user.role;
    } catch (error) {
      console.error("Failed to parse user data from localStorage", error);
    }
  }

  const columns: TableColumn<Post>[] = [
    {
      name: "No",
      cell: (_row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      width: "70px",
    },
    {
      name: "Judul",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
    },
    {
      name: "Kategori",
      cell: (row) => <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-[10px] uppercase font-medium mb-2 inline-block">{row.category?.name || "Tidak Berkategori"}</span>,
      sortable: true,
    },
    {
      name: "Konten",
      selector: (row) => {
        const words = row.content.split(" ");
        return words.length > 20 ? words.slice(0, 20).join(" ") + "..." : row.content;
      },
      sortable: true,
      wrap: true,
    },
    {
      name: "Thumbnail",
      cell: (row) => (
        <div className="flex items-center gap-2 my-2">
          <img src={`${urlBase}${row.thumbnail}`} alt={row.title} className="w-36 h-24 object-cover rounded-xl" />
        </div>
      ),
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <span
          className={`px-2 py-1 rounded-full text-[10px]  font-medium mb-2 inline-block uppercase ${
            row.status === "publish" ? "bg-green-100 text-green-600" : row.status === "draft" ? "bg-yellow-100 text-yellow-600" : "bg-red-100 text-red-600"
          }`}
        >
          {row.status}
        </span>
      ),
      sortable: true,
    },
    ...(["superadmin", "admin", "editor"].includes(userRole)
      ? [
          {
            name: "Penulis",
            cell: (row: { author: { name: any } }) => <span className=" bg-green-100 text-green-600 px-2 py-1 rounded-full text-[10px]  font-medium mb-2 inline-block">{row.author.name}</span>,
            sortable: true,
          },
        ]
      : []),
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex gap-2">
          <Button onClick={() => handleEdit(row)}>
            <Icon icon="mdi:pencil" />
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">
                <Icon icon="mdi:trash-can" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Apakah Anda yakin akan menghapus post ini?</AlertDialogTitle>
                <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus akun Anda secara permanen dan menghapus data Anda dari server.</AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <AlertDialogAction onClick={() => handleDelete(row.id)}>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      ),
    },
  ];

  const form = useForm<FormPostSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      slug: "",
      content: "",
      thumbnail: "" as string | File,
      status: "",
      categoryId: 0,
    },
  });

  const onSubmitStore = async (data: FormPostSchemaType) => {
    if (!data.title || !data.slug || !data.content || !data.thumbnail || !data.status) {
      toast.error("Semua field wajib diisi");
      return;
    }

    setPending(true);
    try {
      const formData = new FormData();
      formData.append("title", data.title);
      formData.append("slug", data.slug);
      formData.append("content", data.content);
      formData.append("status", data.status);
      formData.append("categoryId", String(data.categoryId));
      formData.append("thumbnail", data.thumbnail);
      const token = localStorage.getItem("token");
      const res = await fetch(`${urlBase}/posts/store`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) {
        throw new Error("Gagal Menambahkan Post");
      }

      const result = await res.json();
      setPosts([...posts, result.post]);

      form.reset();
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
      setPreviewUrl(null);
      toast.success("Berhasil Menambahkan Post");
      setOpenAdd(false);
    } catch (error) {
      console.error(error);
      toast.error("Gagal Menambahkan Post");
    } finally {
      setPending(false);
    }
  };

  return (
    <DashboardLayout title="Posts Management">
      <div className="p-6">
        {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-4">Daftar Posts</h2>
          <DialogAddPost open={openAdd} setOpen={setOpenAdd} onSubmit={onSubmitStore} form={form} pending={pending} />
        </div>
        {pending ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-auto rounded-md p-4 bg-white shadow-md">
            <DataTable
              columns={columns}
              data={filteredPosts}
              progressPending={pending}
              pagination
              paginationPerPage={10}
              paginationRowsPerPageOptions={[5, 10, 15, 20, 50]}
              paginationComponentOptions={{
                rowsPerPageText: "Data per halaman",
                rangeSeparatorText: "dari",
                selectAllRowsItem: true,
                selectAllRowsItemText: "Semua",
              }}
              onChangePage={(page) => setCurrentPage(page)}
              onChangeRowsPerPage={(newPerPage, page) => {
                setRowsPerPage(newPerPage);
                setCurrentPage(page);
              }}
              highlightOnHover
              striped
              responsive
              pointerOnHover
              noDataComponent="Tidak ada data"
              subHeader
              subHeaderComponent={
                <div className="flex gap-2">
                  <Input placeholder="Cari..." className="max-w-sm" value={search} onChange={(e) => setSearch(e.target.value)} />
                </div>
              }
            />

            <DialogEditPost open={openEdit} setOpenEdit={setOpenEdit} formEdit={formEdit} onSubmitEdit={onSubmitUpdate} pending={pending} post={selectedPost} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default PostsManagementPage;

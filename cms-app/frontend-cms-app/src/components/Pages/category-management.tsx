import { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import DataTable, { type TableColumn } from "react-data-table-component";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";

import { DialogAddCategory } from "../Fragments/DialogAddCategory";
import { DialogEditCategory } from "../Fragments/DialogEditCategory";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";
import { baseUrl } from "@/main";

type Category = {
  id: number;
  name: string;
  slug: string;
};

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nama wajib diisi"),
  slug: z.string().min(1, "Slug wajib diisi"),
});

export type FormCategorySchemaType = z.infer<typeof formSchema>;
const CategoryManagementPage = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<FormCategorySchemaType | null>(null);
  const [filteredCategories, setFilteredCategories] = useState<Category[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const formEdit = useForm<FormCategorySchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      name: "",
      slug: "",
    },
  });

  const handleEdit = (category: Category) => {
    const formDataEdit: FormCategorySchemaType = {
      id: category.id,
      name: category.name,
      slug: category.slug,
    };

    formEdit.reset(formDataEdit);
    setSelectedCategory(formDataEdit);
    setOpenEdit(true);
  };
  const urlBase = baseUrl;
  useEffect(() => {
    fetch(`${urlBase}/categories`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal Mengambil Data");
        }
        return res.json();
      })
      .then((data) => {
        setFilteredCategories(data.data);
        setCategories(data.data);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);
  const onSubmitUpdate = async (data: FormCategorySchemaType) => {
    setPending(true);
    try {
      const res = await fetch(`${urlBase}/categories/update/${data.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Gagal Menambahkan Category");
      }
      const result = await res.json();
      // Update state categories
      const updatedCategories = categories.map((category) => (category.id === result.category.id ? result.category : category));
      setCategories(updatedCategories);

      formEdit.reset();
      toast.success("Berhasil Memperbarui Category");
      setOpenEdit(false);
    } catch (error) {
      console.log(error);
      toast.error("Gagal Memperbarui Category");
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = categories.filter((category) => category.name.toLowerCase().includes(search.toLowerCase()) || category.slug.toLowerCase().includes(search.toLowerCase()));
      setFilteredCategories(filtered);
    }, 300); // delay 300ms

    return () => clearTimeout(timeout);
  }, [search, categories]);
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`${urlBase}/categories/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus category");
      setCategories((prev) => prev.filter((category) => category.id !== id));
      toast.success("Category berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus category");
    }
  };
  const columns: TableColumn<Category>[] = [
    {
      name: "No",
      cell: (_row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      width: "70px",
    },
    {
      name: "Nama",
      selector: (row) => row.name,
      sortable: true,
    },
    {
      name: "Slug",
      selector: (row) => row.slug,
      sortable: true,
    },
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
                <AlertDialogTitle>Apakah Anda yakin akan menghapus category ini?</AlertDialogTitle>
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

  const form = useForm<FormCategorySchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      slug: "",
    },
  });

  const onSubmitStore = async (data: FormCategorySchemaType) => {
    setPending(true);
    try {
      const res = await fetch(`${urlBase}/categories/store`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Gagal Menambahkan Category");
      }
      const result = await res.json();

      const newCategories = [...categories, result.category];
      setCategories(newCategories);

      form.reset();
      toast.success("Berhasil Menambahkan Category");
      setOpenAdd(false);
    } catch (error) {
      console.log(error);
      toast.error("Gagal Menambahkan Category");
    } finally {
      setPending(false);
    }
  };
  return (
    <DashboardLayout title="Categories Management">
      <div className="p-6">
        {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-4">Daftar Categories</h2>
          <DialogAddCategory open={openAdd} setOpen={setOpenAdd} onSubmit={onSubmitStore} form={form} pending={pending} />
        </div>
        {pending ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-auto rounded-md p-4 bg-white shadow-md">
            <DataTable
              columns={columns}
              data={filteredCategories}
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

            <DialogEditCategory open={openEdit} setOpenEdit={setOpenEdit} formEdit={formEdit} onSubmitEdit={onSubmitUpdate} pending={pending} category={selectedCategory} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default CategoryManagementPage;

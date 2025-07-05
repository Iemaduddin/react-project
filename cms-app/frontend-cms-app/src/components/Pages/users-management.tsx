import { useEffect, useMemo, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import DataTable, { type TableColumn } from "react-data-table-component";

import * as z from "zod";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { toast } from "sonner";
import { Badge } from "../ui/badge";
import { DialogAddUser } from "../Fragments/DialogAddUser";
import { DialogEditUser } from "../Fragments/DialogEditUser";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Input } from "../ui/input";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "@/components/ui/alert-dialog";

type User = {
  id: number;
  name: string;
  email: string;
  role: {
    id: number;
    name: string;
  };
};

const formSchema = z.object({
  id: z.number().optional(),
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  password: z.string().min(6, "Password minimal 6 karakter").optional().or(z.literal("")),
  roleId: z.number({ required_error: "Pilih peran" }).min(1, "Pilih peran yang valid"),
});

export type FormSchemaType = z.infer<typeof formSchema>;
const UsersManagementPage = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");
  const [openAdd, setOpenAdd] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [selectedUser, setSelectedUser] = useState<FormSchemaType | null>(null);
  const [isExistSuperAdmin, setIsExistSuperAdmin] = useState(false);
  const [filteredUsers, setFilteredUsers] = useState<User[]>([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const formEdit = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: undefined,
      name: "",
      email: "",
      password: "",
      roleId: 5,
    },
  });

  const handleEdit = (user: User) => {
    const formDataEdit: FormSchemaType = {
      id: user.id,
      name: user.name,
      email: user.email,
      password: "",
      roleId: user.role.id,
    };

    formEdit.reset(formDataEdit);
    setSelectedUser(formDataEdit);
    setOpenEdit(true);
  };

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal Mengambil Data");
        }
        return res.json();
      })
      .then((data) => {
        setFilteredUsers(data.data);
        const hasSuperAdmin = data.data.some((user: User) => user.role?.id === 1);
        setIsExistSuperAdmin(hasSuperAdmin);
        setUsers(data.data);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);
  const onSubmitUpdate = async (data: FormSchemaType) => {
    setPending(true);
    try {
      const res = await fetch(`http://localhost:5000/users/update/${data.id}`, {
        method: "put",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Gagal Menambahkan User");
      }
      const result = await res.json();
      // Update state users
      const updatedUsers = users.map((user) => (user.id === result.user.id ? result.user : user));
      setUsers(updatedUsers);

      const hasSuperAdmin = updatedUsers.some((user) => user.role?.id === 1);
      setIsExistSuperAdmin(hasSuperAdmin);
      formEdit.reset();
      toast.success("Berhasil Memperbarui User");
      setOpenEdit(false);
    } catch (error) {
      console.log(error);
      toast.error("Gagal Memperbarui User");
    } finally {
      setPending(false);
    }
  };

  useEffect(() => {
    const timeout = setTimeout(() => {
      const filtered = users.filter((user) => user.name.toLowerCase().includes(search.toLowerCase()) || user.email.toLowerCase().includes(search.toLowerCase()) || user.role.name.toLowerCase().includes(search.toLowerCase()));
      setFilteredUsers(filtered);
    }, 300); // delay 300ms

    return () => clearTimeout(timeout);
  }, [search, users]);
  const handleDelete = async (id: number) => {
    try {
      const res = await fetch(`http://localhost:5000/users/delete/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) throw new Error("Gagal menghapus user");
      setUsers((prev) => prev.filter((user) => user.id !== id));
      toast.success("User berhasil dihapus");
    } catch (err) {
      toast.error("Gagal menghapus user");
    }
  };
  const columns: TableColumn<User>[] = [
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
      name: "Email",
      selector: (row) => row.email,
    },
    {
      name: "Peran",
      cell: (row) => {
        const roleColorMap: Record<string, "secondary" | "blue" | "green" | "red" | "gray"> = {
          superadmin: "secondary",
          admin: "blue",
          editor: "green",
          author: "gray",
          member: "red",
        };

        const roleName = row.role?.name ?? "unknown";
        const variant = roleColorMap[roleName] ?? "gray";
        const capitalize = (str?: string) => {
          if (!str) return "-";
          return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
        };

        return (
          <Badge variant={variant} className="w-1/4">
            {capitalize(row.role?.name)}
          </Badge>
        );
      },
    },
    {
      name: "Aksi",
      cell: (row) => (
        <div className="flex gap-2">
          {row.role.id !== 1 && (
            <>
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
                    <AlertDialogTitle>Apakah Anda yakin akan menghapus user ini?</AlertDialogTitle>
                    <AlertDialogDescription>Tindakan ini tidak dapat dibatalkan. Tindakan ini akan menghapus akun Anda secara permanen dan menghapus data Anda dari server.</AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={() => handleDelete(row.id)}>Continue</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      ),
    },
  ];

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      roleId: 5,
    },
  });

  const onSubmitStore = async (data: FormSchemaType) => {
    setPending(true);
    try {
      const res = await fetch("http://localhost:5000/users/store", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!res.ok) {
        throw new Error("Gagal Menambahkan User");
      }
      const result = await res.json();

      const newUsers = [...users, result.user];
      setUsers(newUsers);

      const hasSuperAdmin = newUsers.some((user) => user.role?.id === 1);
      setIsExistSuperAdmin(hasSuperAdmin);
      form.reset();
      toast.success("Berhasil Menambahkan User");
      setOpenAdd(false);
    } catch (error) {
      console.log(error);
      toast.error("Gagal Menambahkan User");
    } finally {
      setPending(false);
    }
  };
  return (
    <DashboardLayout title="Users Management">
      <div className="p-6">
        {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold mb-4">Daftar Users</h2>
          <DialogAddUser open={openAdd} setOpen={setOpenAdd} onSubmit={onSubmitStore} form={form} pending={pending} isExistSuperAdmin={isExistSuperAdmin} />
        </div>
        {pending ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-auto rounded-md p-4 bg-white shadow-md">
            <DataTable
              columns={columns}
              data={filteredUsers}
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

            <DialogEditUser open={openEdit} setOpenEdit={setOpenEdit} formEdit={formEdit} onSubmitEdit={onSubmitUpdate} pending={pending} user={selectedUser} isExistSuperAdmin={isExistSuperAdmin} />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsersManagementPage;

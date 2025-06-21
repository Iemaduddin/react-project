import { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import DataTable from "react-data-table-component";

const UsersManagementPage = () => {
  const [users, setUsers] = useState(true);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal Mengambil Data");
        }
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);
  const columns = [
    {
      name: "No",
      selector: (row) => row.id,
      width: "70px",
      sortable: true,
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
      name: "Phone",
      selector: (row) => row.phone,
    },
    {
      name: "Company",
      selector: (row) => row.company.name,
    },
  ];
  return (
    <DashboardLayout title="Users Management">
      <div className="p-6">
        {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
        <h2 className="text-xl font-bold mb-4">Daftar Users</h2>
        {pending ? (
          <p>Loading...</p>
        ) : (
          <div className="overflow-auto rounded-md">
            <DataTable
              columns={columns}
              data={users}
              progressPending={pending}
              pagination
              paginationPerPage={5}
              paginationRowsPerPageOptions={[5, 10, 15, 20, 50]}
              paginationComponentOptions={{
                rowsPerPageText: "Data per halaman",
                rangeSeparatorText: "dari",
                selectAllRowsItem: true,
                selectAllRowsItemText: "Semua",
              }}
              highlightOnHover
              striped
              responsive
            />
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

export default UsersManagementPage;

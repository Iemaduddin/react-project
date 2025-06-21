import { useEffect, useState } from "react";
import DashboardLayout from "../../Layouts/DashboardLayout";
import DataTable from "react-data-table-component";
import { Link } from "react-router-dom";

const NewsManagement = () => {
  const [users, setUsers] = useState(true);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/posts")
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
      sortable: true,
      width: "70px",
    },
    {
      name: "Judul",
      selector: (row) => row.title,
      sortable: true,
      wrap: true,
    },
    {
      name: "Deskripsi",
      selector: (row) => row.body,
      wrap: true,
    },
    {
      name: "Aksi",
      cell: (row) => (
        <Link to={`/dashboard/news/${row.id}`} className="flex items-center gap-1 px-2 py-1 rounded-lg  bg-blue-500 hover:bg-blue-600 text-white  text-sm">
          <span>Detail</span>
        </Link>
      ),
    },
  ];
  return (
    <DashboardLayout title="News Management">
      <div className="p-6">
        {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
        <h2 className="text-xl font-bold mb-4">Daftar News</h2>
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

export default NewsManagement;

import { useEffect, useState } from "react";
import DashboardLayout from "../Layouts/DashboardLayout";
import DataTable from "react-data-table-component";

const ToDoListsPage = () => {
  const [todo, setTodo] = useState([]);
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal Mengambil Data");
        }
        return res.json();
      })
      .then((data) => {
        setTodo(data);
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
      name: "Judul",
      selector: (row) => row.title,
      sortable: true,
    },
    {
      name: "Status",
      cell: (row) => (
        <div className={`flex items-center gap-1 px-2 py-1 rounded-lg  ${row.completed ? "bg-green-500" : "bg-red-500"} text-white  text-sm`}>
          <span>{row.completed ? "Selesai" : "Belum"}</span>
        </div>
      ),
    },
  ];
  return (
    <DashboardLayout title="Users Management">
      <div className="p-6">
        {error && <p className="text-white text-sm mb-2 border-2 p-2 bg-red-500 rounded-md">{error}</p>}
        <h2 className="text-xl font-bold mb-4">Daftar Todolist</h2>
        {pending ? <p>Loading...</p> : <div className="overflow-auto rounded-md"></div>}
        <DataTable
          columns={columns}
          data={todo}
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
    </DashboardLayout>
  );
};

export default ToDoListsPage;

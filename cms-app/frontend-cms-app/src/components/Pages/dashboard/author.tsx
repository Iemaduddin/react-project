import { useEffect, useState } from "react";
import ReactApexChart from "react-apexcharts";
import DashboardLayout from "../../Layouts/DashboardLayout";
import { baseUrl } from "@/main";
import DataTable, { type TableColumn } from "react-data-table-component";
import { Link } from "react-router-dom";

const AuthorDashboardPage = () => {
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
    createdAt: Date;
  };
  const user = JSON.parse(localStorage.getItem("user") || "null") as { name?: string } | null;
  const authName = user?.name || "Guest";
  const [pending, setPending] = useState(true);
  const [error, setError] = useState("");

  const urlBase = baseUrl;

  // Mengambil data postingan terbaru
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    fetch(`${urlBase}/dashboard/getLatestPostsByOwner`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal Mengambil Data");
        }
        return res.json();
      })
      .then((data) => {
        setPosts(data.data);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);

  const columns: TableColumn<Post>[] = [
    {
      name: "No",
      cell: (_row, index) => index + 1,
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
      name: "Diposting Pada",
      selector: (row) => new Date(row.createdAt).toLocaleDateString("id-ID", { year: "numeric", month: "long", day: "numeric", hour: "2-digit", minute: "2-digit" }),
    },
  ];
  // Total posts by owner
  const [totalPostByOwner, setTotalPostByOwner] = useState(0);

  useEffect(() => {
    fetch(`${urlBase}/dashboard/getTotalPostsByOwner`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Gagal Mengambil Data");
        }
        return res.json();
      })
      .then((data) => {
        setTotalPostByOwner(data.data);
        setPending(false);
      })
      .catch((error) => {
        setError(error.message);
        setPending(false);
      });
  }, []);

  // Grafik Jumlah post per bulan by status by owner
  const [year, setYear] = useState<number>(2025);
  const [chartData, setChartData] = useState<any>({ series: [], categories: [] });
  const currentYear = new Date().getFullYear();

  const fetchData = async (selectedYear: number) => {
    try {
      const response = await fetch(`${baseUrl}/dashboard/postByStatusByMonth?year=${selectedYear}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token") || ""}`,
        },
      });
      const result = await response.json();
      const rawData = result.data;

      const statuses = [...new Set(rawData.map((item: any) => item.status))];
      const months = Array.from({ length: 12 }, (_, i) => i + 1);
      const monthNames = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

      const series = statuses.map((status) => {
        const data = months.map((month) => {
          const found = rawData.find((item: any) => item.status === status && Number(item.month) === month);
          return found ? Number(found.total) : 0;
        });

        return { name: status, data };
      });

      setChartData({
        series,
        categories: monthNames,
      });
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    fetchData(year);
  }, [year]);

  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedYear = parseInt(e.target.value);
    setYear(selectedYear);
  };

  return (
    <DashboardLayout title="Dashboard">
      <h2 className="text-2xl font-bold mb-4">Selamat Datang, {authName}!</h2>
      {pending ? (
        <p>Loading...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : (
        <div>
          <div className="grid grid-cols-3 gap-2">
            <div className="p-4 rounded shadow bg-white">
              <div className="flex justify-between">
                <h3 className="text-lg font-semibold mb-2">Total My Posts</h3>
              </div>

              <h3 className="text-lg font-bold text-blue-500 mt-4">{totalPostByOwner} Posts</h3>
            </div>
          </div>
          <div className="bg-white p-6 rounded shadow mt-4">
            <Link to="/dashboard/posts" className="hover:text-blue-500 mb-4 inline-block">
              <h3 className="text-lg font-semibold mb-4">Postingan Terbaru</h3>
            </Link>
            <DataTable
              columns={columns}
              data={posts}
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
              highlightOnHover
              striped
              responsive
              pointerOnHover
              noDataComponent="Tidak ada data"
            />
          </div>
          <div className="bg-white p-6 rounded shadow mt-4">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold mb-4">Jumlah Post per Status per Bulan</h3>

              <div className="mb-6">
                <label className="mr-2 font-medium text-sm">Pilih Tahun:</label>
                <select value={year} onChange={handleYearChange} className="border rounded p-2">
                  {[...Array(5)].map((_, i) => {
                    const y = currentYear - i;
                    return (
                      <option key={y} value={y}>
                        {y}
                      </option>
                    );
                  })}
                </select>
              </div>
            </div>

            <ReactApexChart
              options={{
                chart: {
                  type: "bar",
                  stacked: true,
                },
                xaxis: {
                  categories: chartData.categories,
                },
                yaxis: {
                  title: {
                    text: "Jumlah Post",
                  },
                },
                legend: {
                  position: "top",
                },
                plotOptions: {
                  bar: {
                    horizontal: false,
                  },
                },
              }}
              series={chartData.series}
              type="bar"
              height={400}
            />
          </div>
        </div>
      )}
    </DashboardLayout>
  );
};

export default AuthorDashboardPage;

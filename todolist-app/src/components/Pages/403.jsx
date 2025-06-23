import { useRouteError } from "react-router-dom";

const ErrorPage = () => {
  const error = useRouteError();
  const users = [
    {
      name: "Didin",
      email: "didin@gmail.com",
    },
    {
      name: "Dudin",
      email: "dudin@gmail.com",
    },
    {
      name: "Iemaduddin",
      email: "iemaduddin@gmail.com",
    },
    {
      name: "Nabila",
      email: "nabila@gmail.com",
    },
  ];
  return (
    <div className="flex flex-col justify-center items-center min-h-screen gap-3 p-4 bg-gray-100">
      <h2 className="text-2xl font-bold text-red-500">Not Found!</h2>

      <table className="table-auto border-collapse border border-gray-400">
        <thead>
          <tr className="bg-gray-200">
            <th className="border border-gray-400 px-4 py-2">No.</th>
            <th className="border border-gray-400 px-4 py-2">Nama</th>
            <th className="border border-gray-400 px-4 py-2">Email</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id || index}>
              <td className="border border-gray-400 px-4 py-2">{index + 1}</td>
              <td className="border border-gray-400 px-4 py-2">{user.name}</td>
              <td className="border border-gray-400 px-4 py-2">{user.email}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <p className="text-gray-700">Oops, halaman tidak ditemukan</p>
      <p className="text-sm text-gray-500 italic">{error.statusText || error.message}</p>
    </div>
  );
};

export default ErrorPage;

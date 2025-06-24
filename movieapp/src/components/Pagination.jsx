export default function Pagination({ page, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center mt-4 gap-2">
      <button onClick={() => onPageChange(page - 1)} disabled={page <= 1} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Prev
      </button>
      <span className="px-3 py-1">
        Page {page} of {totalPages}
      </span>
      <button onClick={() => onPageChange(page + 1)} disabled={page >= totalPages} className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50">
        Next
      </button>
    </div>
  );
}

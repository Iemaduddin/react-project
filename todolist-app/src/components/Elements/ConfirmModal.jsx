export default function ConfirmModal({ isOpen, onClose, onConfirm }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0  bg-opacity-50 z-40 flex items-center justify-center" onClick={onClose}>
      <div
        className="bg-red-100 p-6 rounded-2xl shadow-lg max-w-sm w-full text-center"
        onClick={(e) => e.stopPropagation()} // agar klik dalam modal tidak menutup
      >
        <h2 className="text-lg font-semibold mb-4">Yakin ingin menghapus task ini?</h2>
        <div className="flex gap-2 justify-center">
          <button onClick={onClose} className="px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300">
            Batal
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
          >
            Hapus
          </button>
        </div>
      </div>
    </div>
  );
}

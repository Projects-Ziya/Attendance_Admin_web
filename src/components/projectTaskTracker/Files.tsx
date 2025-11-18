import { useState, useEffect } from "react";
import api from "../../Api/api";
import toast from "react-hot-toast";

const Files = ({ id }) => {
  const [showModal, setShowModal] = useState(false);
  const [file, setFile] = useState(null);
  const [filesList, setFilesList] = useState([]);

  // ✅ Fetch files for the given project ID
  const fetchFiles = async () => {
    if (!id) return; // avoid undefined id calls
    try {
      const response = await api.get(`/api/project-filesview/${id.id}`);
      setFilesList(response.data.data || []); // adjust based on API response structure
    } catch (error) {
      console.error("Error fetching files:", error);
    }
  };

  useEffect(() => {
    fetchFiles();
  }, [id]); // refetch when project ID changes

  // ✅ Upload file
  const handleUpload = async () => {
    if (!file) {
      toast("Please select a file before uploading");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);
    formData.append("project", id.id); // link file to project

    try {
      await api.post("/api/projectfile/", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("File uploaded successfully!");
      setShowModal(false);
      setFile(null);
      fetchFiles();
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Failed to upload file");
    }
  };

  // ✅ Delete file
  const handleDelete = async (fileId) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await api.delete(`/api/projectfiledelete/${fileId}/`);
      toast.success("File deleted successfully!");
      fetchFiles();
    } catch (error) {
      console.error("Error deleting file:", error);
      toast.error("Failed to delete file");
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-[37.865vw] h-[31.667vh] relative">
      {/* Header */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-gray-700 text-2xl font-semibold">Files</h2>
        <button
          onClick={() => setShowModal(true)}
          className="bg-sky-500 text-white px-4 py-2 rounded flex items-center"
        >
          <img
            src="/src/assets/icons/add.svg"
            alt="Add New"
            className="w-5 h-5 mr-2"
          />
          Add New
        </button>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-sky-500 mb-4"></div>

      {/* Files List */}
      <div className="flex gap-4 overflow-x-auto">
        {filesList.length > 0 ? (
          filesList.map((item) => (
            <div
              key={item.id}
              className="bg-white border border-gray-200 p-4 rounded-xl shadow-sm flex-1 text-center hover:shadow-md transition min-w-[150px]"
            >
              {/* ✅ File Preview (if image) */}
              <div className="w-16 h-16 mx-auto mb-2 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {item.file &&
                (item.file.endsWith(".png") ||
                  item.file.endsWith(".jpg") ||
                  item.file.endsWith(".jpeg")) ? (
                  <img
                    src={item.file}
                    alt="File Preview"
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <svg
                    className="w-8 h-8 text-sky-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                )}
              </div>

              {/* ✅ File Info */}
              <p className="text-gray-700 font-semibold truncate">
                {item.project_name}
              </p>
              <p className="text-gray-500 text-sm">
                {new Date(item.uploaded_at).toLocaleDateString()}
              </p>

              {/* ✅ Actions */}
              <div className="flex justify-center gap-3 mt-3">
                {/* Download */}
                <a
                  href={item.file}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:scale-110 transition p-1"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
                    ></path>
                  </svg>
                </a>

                {/* Delete */}
                <button
                  onClick={() => handleDelete(item.id)}
                  className="hover:scale-110 transition p-1"
                >
                  <svg
                    className="w-5 h-5 text-gray-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm">No files available</p>
        )}
      </div>

      {/* ✅ Modal */}
      {showModal && (
        <div className="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center z-10">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg relative">
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-3 right-3 text-gray-600 hover:text-gray-900 text-xl"
            >
              &times;
            </button>
            <h3 className="text-xl font-semibold text-gray-800 mb-4">
              Upload File
            </h3>
            <input
              type="file"
              onChange={(e) => setFile(e.target.files[0])}
              className="w-full border border-gray-300 rounded-md cursor-pointer text-gray-700 focus:outline-none p-2"
            />
            <div className="flex justify-end mt-5 gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-300 text-gray-800 px-4 py-2 rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                className="bg-sky-500 text-white px-4 py-2 rounded hover:bg-sky-600"
              >
                Upload
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Files;

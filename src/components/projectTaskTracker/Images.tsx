import  { useEffect, useState } from "react";
import { Eye, Trash2 } from "lucide-react"; // 👈 install via: npm install lucide-react
import { BASE_URL } from "../../constants/urls";

const Images = ({ ApiProject }) => {
  const [data, setData] = useState(ApiProject);

  useEffect(() => {
    setData(ApiProject);
  }, [ApiProject]);

  const baseURL = BASE_URL || "";
  const images =
    data?.data?.project_images?.length > 0
      ? data.data.project_images
      : [
          { id: "logo", file: data?.data?.project_logo },
          { id: "attachment", file: data?.data?.attachment },
        ].filter((img) => img.file);

  const handleView = (img) => {
    window.open(`${baseURL}${img.file}`, "_blank");
  };

  const handleDelete = (img) => {
  
    // TODO: API call to delete the image
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-[37.865vw] h-[31.667vh]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-gray-700 text-2xl font-semibold">Images</h2>
        <button className="bg-sky-500 text-white px-4 py-2 rounded flex items-center">
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

      {/* Images Grid */}
      <div className="grid grid-cols-3 gap-4">
        {images?.length > 0 ? (
          images.map((img, index) => (
            <div
              key={img.id || index}
              className="relative group bg-white h-[105px] border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition"
            >
              <img
                src={`${baseURL}${img.file}`}
                alt={`Project Image ${index + 1}`}
                className="w-full h-full object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://via.placeholder.com/150?text=No+Image")
                }
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex justify-end items-end p-2 gap-2">
                <button
                  onClick={() => handleView(img)}
                  className="bg-white/80 hover:bg-white text-gray-700 rounded-full p-1 shadow-md transition"
                >
                  <Eye size={18} />
                </button>
                <button
                  onClick={() => handleDelete(img)}
                  className="bg-white/80 hover:bg-white text-red-600 rounded-full p-1 shadow-md transition"
                >
                  <Trash2 size={18} />
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-3 text-center text-gray-500">
            No images available.
          </p>
        )}
      </div>
    </div>
  );
};

export default Images;

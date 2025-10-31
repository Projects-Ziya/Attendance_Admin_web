import React from "react";

const Images = () => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow-md w-[37.865vw] h-[31.667vh]">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-gray-700 text-2xl font-semibold">Images</h2>
        <button className="bg-sky-500 text-white px-4 py-2 rounded flex items-center">
          <img src="/src/assets/icons/add.svg" alt="Add New" className="w-5 h-5 mr-2" />
          Add New
        </button>
      </div>

      {/* Divider */}
      <div className="border-t-2 border-sky-500 mb-4"></div>

      {/* Images Grid */}
      <div className="grid grid-cols-3 gap-4">
        {/* Image 1 */}
        <div className="bg-white h-[105px] border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
          <img
            src="https://images.unsplash.com/photo-1502979932800-33d311b7ce56?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
            alt="Book"
            className="w-full h-[105px] object-cover"
          />
        </div>

        {/* Image 2 */}
        <div className="bg-white h-[105px] border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
          <img
            src="https://media.istockphoto.com/id/532170271/photo/contract-series-stock-image.jpg?s=612x612&w=0&k=20&c=-K96z1eIccRfyRbtJMD7_SvpgtM9ZBDKS4A97NL58Rg="
            alt="Paper"
            className="w-full h-[105px] object-cover"
          />
        </div>

        {/* Image 3 */}
        <div className="bg-white h-[105px] border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
          <img
            src="https://www.ezcalendars.com/media/medialibrary/2015/07/calendar-4.jpg"
            alt="Calendar"
            className="w-full h-[105px] object-cover"
          />
        </div>

        {/* Image 4 */}
        <div className="bg-white h-[105px] border border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
          <img
            src="https://64.media.tumblr.com/e51e4f3d6585227f0ae3979e82a9898d/tumblr_oxtql4sjoC1w8cnaso1_1280.jpg"
            alt="Notes"
            className="w-full h-[105px] object-cover"
          />
        </div>

        {/* Image 5 */}
        <div className="bg-white  border h-[105px] border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
          <img
            src="https://img.freepik.com/premium-photo/blurred-city-skyline-background-financial-graph-with-candlestick-chart-stock-market-black-color_147586-214.jpg"
            alt="Chart"
            className="w-full  h-[105px] object-cover"
          />
        </div>

        {/* Image 6 */}
        <div className="bg-white  border h-[105px] border-gray-200 rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTQc3D_5pnlKGLm-B_1tmG-zvAgiOa50I-l1EAcay6HwxkklkBvKf7bIIECwD8Wu9Lvb6o&usqp=CAU"
            alt="Megaphone"
            className="w-full h-[105px] object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default Images;
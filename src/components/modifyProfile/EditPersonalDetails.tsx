
function EditPersonalDetails() {
  return (
    <div className='flex flex-col mt-[20px] gap-6'>

        <div>
            <label className="block text-[18px] font-medium text-[#4D4D4D]">
                Full Address
            </label>
            <input type="text" className="mt-1 block w-full h-[146px] border-[1px] border-[#D9D9D9] rounded-md p-4" />
        </div>


{/* phone NUmber  */}
         <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px]">
      <div >
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Phone Number</label>
        <input
          type="tel"
          placeholder='+91'
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-4"
        />
      </div>

    
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Emergency Phone Number</label>
        <input
          type="tel"
          placeholder='+91'
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-4"
        />
      </div>
      </div>

  {/* Gender  */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px]">
        <div> 
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Gender</label>
       <select name="" className='"mt-1 block w-full h-[60px]  border-[1px] border-[#D9D9D9] rounded-md p-4'>
        <option value="">Select</option>
        <option value="">Male</option>
        <option value="">Female</option>
       </select>
        </div>
     

      {/* Date Of Birth */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Date Of Birth</label>
        <input type="date" 
       className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-4"
       />
      </div>

      {/* Nationality */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Nationality</label>
        <input type="text" 
       className='"mt-1 block w-full h-[60px]  border-[1px] border-[#D9D9D9] rounded-md p-3'
       />
      </div>

      {/* Blood Group*/}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Blood Group</label>
       <input type="text" 
       className='"mt-1 block w-full h-[60px]  border-[1px] border-[#D9D9D9] rounded-md p-3'
       />
      </div>
      </div>


      
    </div>
  )
}

export default EditPersonalDetails

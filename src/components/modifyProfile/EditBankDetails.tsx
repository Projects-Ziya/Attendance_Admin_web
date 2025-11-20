import pinicon from "../../assets/icons/pinicon.svg"


function EditBankDetails() {
  return (
 <div className='flex flex-col mt-[20px] gap-6'>

 {/* Account Number  */}
  <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]"> Account Number</label>
        <input
          type="text"
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Confirm Account Number  */}
  <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Confirm Account Number</label>
        <input
          type="text"
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* Bank Name  */}
  <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Bank Name</label>
        <input
          type="text"
          className="mt-1 block w-full h-[80px] border-[1px] border-[#D9D9D9] rounded-md p-3"
        />
      </div>

      {/* IFSC code  */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-[15px]">
        <div> 
        <label className="block text-[18px] font-medium text-[#4D4D4D]">IFSC code</label>
       <select name="" className='"mt-1 block w-full h-[60px]  border-[1px] border-[#D9D9D9] rounded-md p-4'>
        <option value="">Select</option>
        <option value="">Male</option>
        <option value="">Female</option>
       </select>
        </div>
     

      {/* Branch Name */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Branch Name </label>
        <input type="date" 
        placeholder='auto-fill'
       className="mt-1 block w-full h-[60px] border-[1px] border-[#D9D9D9] rounded-md p-4"
       />
      </div>

      {/* Account Holder Name */}
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Account Holder Name </label>
        <input type="text" 
       className='"mt-1 block w-full h-[60px]  border-[1px] border-[#D9D9D9] rounded-md p-3'
       />
      </div>
      </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-[15px]">
      <div >
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Attach All Valid Documents</label>
        <input
          type="text"
          placeholder='Aadhar*'
          className="mt-1 block w-full h-[80px] placeholder:text-[#FF4343] border-[1px] border-[#D9D9D9] rounded-md p-4"
       style={{
      backgroundImage: `url(${pinicon})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "10px center",
      backgroundSize: "20px 20px",
    }}
        />
      </div>

    
      <div>
        <label className="block text-[18px] font-medium text-[#4D4D4D]">Passbook or Cheque </label>
        <input
    type="text"
    placeholder="Passbook or Cheque*"
    className="mt-1 block w-full h-[80px] border-[1px] placeholder:text-[#FF4343] border-[#D9D9D9] rounded-md p-4 pl-12"
    style={{
      backgroundImage: `url(${pinicon})`,
      backgroundRepeat: "no-repeat",
      backgroundPosition: "10px center",
      backgroundSize: "20px 20px",
    }}
  />
      </div>
      </div>



    </div>
  )
}

export default EditBankDetails

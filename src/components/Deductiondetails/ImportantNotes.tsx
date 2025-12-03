import React from "react";
import type { ImportantNote } from "../../models/deduction"

type Props = {
  notes: ImportantNote[];
};

const ImportantNotes: React.FC<Props> = ({ notes }) => {
  return (
    <div className="w-[1469px] h-auto bg-[#FFFFFF] rounded-[10px]  shadow-[0px_0px_2px_0px_#00000040] px-[43px] py-[45px] flex flex-col gap-[24px]">
      <h2 className="text-[24px] font-[500] tracking-[0.08em] text-[#4D4D4D]">Important Notes</h2>
      {notes.map((note, index) => (
        <div key={index} className="flex  tracking-[0.08em] items-start gap-[12px]">
          <div className="w-[16px] h-[16px] rounded-full mt-[6px] " style={{ backgroundColor: note.dotColor }}></div>
          <div className="flex items-center gap-2">
            <h3 className="text-[20px] font-[600] text-[#000000]">{note.title}:</h3>
            <p className="text-[20px] font-[400] text-[#000000]">{note.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
 
export default ImportantNotes;

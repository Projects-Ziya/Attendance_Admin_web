import React, {useState} from "react";
import Search from "../../assets/images/icons/search.svg";
import Button from "../../components/common/ui/Button";

interface SearchBarProps {
  value: string;
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onSearch }) => {

  const [inputValue, setInputValue] = useState(value);

  const handleSearchClick = () => {
    onSearch(inputValue.trim());
  };

  return (
    <div className="flex flex-row items-center w-[290px] h-[34px] shadow-[0px_0px_1px_#0000003f] rounded-[5px] bg-global-25 pl-2 pr-[2px] border border-[#b6b5b5]">
      <div className="flex flex-row gap-2 items-center w-full">
        <img src={Search} className="w-[18px] h-[18px]" alt="Search Icon" />
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Search here"
          className="w-full bg-transparent outline-none text-[12px] sm:text-[13px] lg:text-[14px] text-global-4 placeholder:text-global-4 font-['Poppins']"
        />
      </div>
      <Button
        onClick={handleSearchClick}
        variant="subprimary"
        size="small"
        className="!w-[66px] !h-[28px] !text-[11px] !leading-[14px] !p-0 !rounded-[5px] !min-w-[0] !min-h-[0]"
      >
        Search
      </Button>
    </div>
  );
};

export default SearchBar;

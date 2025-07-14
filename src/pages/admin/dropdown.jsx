import React from "react";
import { MdLogout } from "react-icons/md";
import { IoMdSettings } from "react-icons/io";

const dropdown = ({handleLogout}) => {
  return (
    <div className="py-5 absolute right-0 top-12 flex md:hidden ">
      <button
        onClick={handleLogout}
        className="text-2xl flex w-[50px] h-[50px] ml-auto font-bold flex-col items-center justify-center rounded-full hover:bg-cyan-400"
      >
        <MdLogout />
      </button>
      <button className="text-2xl flex w-[50px] h-[50px] font-bold flex-col items-center justify-center rounded-full hover:bg-cyan-400">
        <IoMdSettings />
      </button>
    </div>
  );
};

export default dropdown;

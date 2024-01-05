import React from "react";
import Image from "next/image";

function BottomNav() {
  return (
    <div className="sticky bottom-2  p-5 px-6 m-2 z-10 flex items-center justify-between   bg-gray-900 shadow-3xl text-gray-400 rounded-2xl cursor-pointer">
      <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 w-full mr-4">
        History
      </div>
      <div className="flex flex-col items-center  hover:text-blue-400 ">
        <div className="absolute bottom-5 shadow-2xl text-center flex items-center justify-center rounded-full border-4 text-3xl border-gray-50 hover:border-blue-500 bg-blue-500 w-20 h-20 p-2 text-white transition ease-in duration-200 ">
          <Image src="./call.svg" width="35" height="35" alt="Dialer" />
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full border-4 opacity-50"></span>
        </div>
      </div>
      <div className="flex flex-col items-center transition ease-in duration-200 hover:text-blue-400 w-full ml-4">
        Contacts
      </div>
    </div>
  );
}

export default BottomNav;

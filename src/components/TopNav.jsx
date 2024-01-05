import React from "react";

function TopNav() {
  return (
    <div
      className="realtive sticky top-0  h-36 w-full rounded-b-3xl bg-center cursor-pointer object-cover z-10 shadow-lg"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1622180203374-9524a54b734d?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&amp;ixlib=rb-1.2.1&amp;auto=format&amp;fit=crop&amp;w=1950&amp;q=80')",
      }}
    >
      <div
        x-data="{ filters: ['All', 'Free', 'Premium'], selected: 'All' }"
        className="inline-flex rounded-lg my-3 bg-gray-100 bg-opacity-30 mx-auto"
      >
        <template x-for="(filter, index) in filters">
          <button
            className="py-[10px] sm:py-2 my-1 px-[12px] sm:px-6 inline-flex items-center justify-center font-medium border border-gray-50 text-center focus:bg-primary text-black text-sm sm:text-base capitalize bg-white"
            x-text="filter"
          ></button>
        </template>
      </div>
      {/* Top */}
      <div className="px-3 pt-12 rounded-lg  flex flex-col w-full">
        <h4 className="text-white text-xl font-semibold  leading-tight truncate">
          Aircall History
        </h4>
      </div>
    </div>
  );
}

export default TopNav;

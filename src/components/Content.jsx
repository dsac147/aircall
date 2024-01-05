import React from "react";
import Image from "next/image";

async function Content({ allCalls }) {
  const isDataEmpty =
    !Array.isArray(allCalls) || allCalls.length < 1 || !allCalls;

  return (
    <div className="max-h-[600px] p-3 space-y-4 z-0 overflow-scroll">
      <h4 className="text-black font-semibold">Recent Call History</h4>
      {!isDataEmpty ? (
        <div className="grid grid-cols-1">
          {allCalls.map((callEntry) => (
            <div key={callEntry.id} className="pb-4">
              <div className="flex  bg-white shadow-md  rounded-2xl p-2">
                <Image
                  src={
                    "https://images.unsplash.com/photo-1439130490301-25e322d88054?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1189&q=80"
                  }
                  alt=""
                  width={100}
                  height={50}
                  className="w-16  object-cover  h-16 rounded-xl"
                />
                <div className="flex flex-col justify-center w-full px-2 py-1">
                  <div className="flex justify-between items-center ">
                    <div className="flex flex-col">
                      <h2 className="text-black text-sm font-medium">
                        {callEntry.from}
                      </h2>
                    </div>
                  </div>
                  <div className="flex pt-2  text-sm text-gray-400">
                    <div className="flex items-center mr-auto">
                      <p className="font-normal">{callEntry.duration}</p>
                    </div>
                    <div className="flex items-center font-medium text-gray-900 ">
                      {callEntry.created_at}
                      <span className="text-gray-400 text-sm font-normal">
                        {" "}
                        /{callEntry.direction}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>No Call data</div>
      )}
    </div>
  );
}

export default Content;

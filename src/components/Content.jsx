"use client";

import React, { useState } from "react";

import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
  Button,
} from "@material-tailwind/react";

import CallDetailDialog from "@/components/CallDetailDialog";

import {
  getFormattedDate,
  formatDuration,
  getContactName,
  getCallIcon,
} from "@/utils/index";
import { contacts } from "@/utils/contacts";

function Content({ allCalls }) {
  const [callDetailId, setCallDetailId] = useState(null);
  const [openCallDetail, setOpenCallDetail] = useState(false);
  const handleOpenModal = (id) => {
    setCallDetailId(id);
    setOpenCallDetail(!openCallDetail);
  };

  const isDataEmpty =
    !Array.isArray(allCalls) || allCalls.length < 1 || !allCalls;

  const handleArchiveAll = (allCalls) => {
    const unArchivedIds = allCalls.filter(
      (callEntry) => !callEntry.is_archived
    );
    if (unArchivedIds) {
      Promise.all(
        unArchivedIds.map((call) => {
          fetch(
            `https://cerulean-marlin-wig.cyclic.app/activities/${call.id}`,
            {
              headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
              },
              method: "PATCH",
              body: JSON.stringify({
                is_archived: true,
              }),
            }
          )
            .then(function (response) {
              console.log(response);
            })
            .catch((error) => console.log(error));
        })
      );
    }
  };

  const handleUnArchiveAll = () => {
    fetch(`https://cerulean-marlin-wig.cyclic.app/reset`, {
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      method: "PATCH",

      body: JSON.stringify({
        is_archived: false,
      }),
    }).then(function (response) {
      return;
    });
  };

  return (
    <div className="h-[600px] p-3 space-y-4  overflow-scroll z-[9999]">
      <Tabs value="recent" className="w-full">
        <TabsHeader className="max-w-[150px] mx-auto text-xs">
          <Tab key={"recent"} value={"recent"}>
            Recent
          </Tab>
          <Tab key={"archived"} value={"archived"}>
            Archived
          </Tab>
        </TabsHeader>
        <TabsBody>
          {!isDataEmpty ? (
            <>
              <TabPanel key={"recent"} value={"recent"}>
                <div className="grid grid-cols-1 cursor-pointer">
                  <Button
                    variant="gradient"
                    color={"red"}
                    className="mb-4"
                    onClick={() => handleArchiveAll(allCalls)}
                  >
                    <span>Archive all</span>
                  </Button>
                  {allCalls
                    .filter((callEntry) => !callEntry.is_archived)
                    .map((callEntry) => {
                      const callDate = getFormattedDate(callEntry.created_at);
                      const duration = formatDuration(callEntry.duration);
                      const callerName = getContactName(
                        callEntry.direction,
                        callEntry.from,
                        callEntry.to,
                        contacts
                      );

                      return (
                        <div
                          key={callEntry.id}
                          className="mb-4"
                          onClick={() => handleOpenModal(callEntry.id)}
                        >
                          <div className="flex h-[75px] bg-white shadow-md  rounded-2xl p-2 items-center">
                            <div className="min-w-[48px] min-h-[48px] rounded-full inline-flex justify-center items-center bg-[#7B2CFE] text-white font-bold">
                              {callerName.toString().charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col justify-center w-full px-2 py-1">
                              <div className="flex justify-between items-center ">
                                <div className="flex flex-col ">
                                  <h2 className="text-black text-sm font-medium">
                                    {callerName}
                                  </h2>
                                </div>
                              </div>
                              <div className="flex text-sm text-gray-400">
                                <div className="flex items-center mr-auto">
                                  <p className="font-normal">{duration}</p>
                                </div>
                                <div className="flex items-center font-medium text-gray-900 ">
                                  {callDate}
                                  <span className="text-gray-400 text-sm font-normal pl-4">
                                    {getCallIcon(
                                      callEntry.direction,
                                      callEntry.call_type
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                </div>
              </TabPanel>
              <TabPanel key={"archived"} value={"archived"}>
                <div className="grid grid-cols-1 cursor-pointer">
                  <Button
                    variant="gradient"
                    color={"green"}
                    className="mb-4"
                    onClick={() => handleUnArchiveAll()}
                  >
                    <span>Unarchive all</span>
                  </Button>
                </div>

                {allCalls.filter((callEntry) => callEntry.is_archived).length >
                0 ? (
                  allCalls
                    .filter((callEntry) => callEntry.is_archived)
                    .map((callEntry) => {
                      const callDate = getFormattedDate(callEntry.created_at);
                      const duration = formatDuration(callEntry.duration);
                      const callerName = getContactName(
                        callEntry.direction,
                        callEntry.from,
                        callEntry.to,
                        contacts
                      );

                      return (
                        <div
                          key={callEntry.id}
                          className="mb-4"
                          onClick={() => handleOpenModal(callEntry.id)}
                        >
                          <div className="flex h-[75px] bg-white shadow-md  rounded-2xl p-2 items-center">
                            <div className="min-w-[48px] min-h-[48px] rounded-full inline-flex justify-center items-center bg-[#7B2CFE] text-white font-bold">
                              {callerName.toString().charAt(0).toUpperCase()}
                            </div>
                            <div className="flex flex-col justify-center w-full px-2 py-1">
                              <div className="flex justify-between items-center ">
                                <div className="flex flex-col ">
                                  <h2 className="text-black text-sm font-medium">
                                    {callerName}
                                  </h2>
                                </div>
                              </div>
                              <div className="flex text-sm text-gray-400">
                                <div className="flex items-center mr-auto">
                                  <p className="font-normal">{duration}</p>
                                </div>
                                <div className="flex items-center font-medium text-gray-900 ">
                                  {callDate}
                                  <span className="text-gray-400 text-sm font-normal pl-4">
                                    {getCallIcon(
                                      callEntry.direction,
                                      callEntry.call_type
                                    )}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })
                ) : (
                  <div>No Call data</div>
                )}
              </TabPanel>
            </>
          ) : (
            <div>No Call data</div>
          )}
        </TabsBody>
      </Tabs>
      <CallDetailDialog
        id={callDetailId}
        open={openCallDetail}
        setOpenCallDetail={setOpenCallDetail}
        handleOpenModal={handleOpenModal}
      />
    </div>
  );
}

export default Content;

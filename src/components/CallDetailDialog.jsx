import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";

import { contacts } from "@/utils/contacts";
import {
  getContactName,
  formatDuration,
  getFormattedDate,
  getCallIcon,
} from "@/utils/index";

function CallDetailDialog({ id, open, handleOpenModal, setOpenCallDetail }) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setData(data);
          setLoading(false);
          console.log(id, data);
        });
    }
  }, [id, open]);

  const handleArchive = (id) => {
    if (id) {
      fetch(`https://cerulean-marlin-wig.cyclic.app/activities/${id}`, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        method: "PATCH",

        body: JSON.stringify({
          is_archived: !data.is_archived,
        }),
      }).then(function (response) {
        setOpenCallDetail(false);
        return;
      });
    }
  };

  return (
    <Dialog
      open={open}
      handler={handleOpenModal}
      className="modal hadow-[25px_25px_50px_25px_rgba(0,0,0,0.3)] "
    >
      {isLoading && !data ? (
        <div className="flex justify-center items-center min-h-[160px]">
          <div>Loading...</div>
        </div>
      ) : (
        <>
          <DialogHeader className="text-l">Call Details</DialogHeader>
          <DialogBody className="pt-0">
            <div className="flex flex-row w-full">
              <div>
                <div className="my-1">
                  <label className="font-bold">From :</label>
                  <span>
                    {" "}
                    {getContactName(
                      data.direction,
                      data.from,
                      data.to,
                      contacts
                    )}{" "}
                    {`(${data.from})`}
                  </span>
                </div>
                <div className="my-1">
                  <label className="font-bold">To :</label>
                  <span>
                    {" "}
                    {getContactName(
                      data.direction,
                      data.to,
                      data.from,
                      contacts
                    )}{" "}
                    {`(${data.to})`}
                  </span>
                </div>
                <div className="my-1">
                  <label className="font-bold">Via :</label>
                  <span> {data.via}</span>
                </div>
                <div className="my-1">
                  <label className="font-bold">Duration :</label>
                  <span> {formatDuration(data.duration)}</span>
                </div>
                <div className="my-1">
                  <label className="font-bold">Time :</label>
                  <span> {getFormattedDate(data.created_at)}</span>
                </div>
              </div>
              <div className="flex pl-12 justify-center items-center">
                {getCallIcon(data.direction, data.call_type, "100")}
              </div>
            </div>
          </DialogBody>
          <div className="flex w-full justify-center">
            <Button
              variant="gradient"
              color={data.is_archived ? "green" : "red"}
              onClick={() => handleArchive(id)}
            >
              <span>{data.is_archived ? "Unarchive" : "Archive"}</span>
            </Button>
          </div>
        </>
      )}
    </Dialog>
  );
}

export default CallDetailDialog;
